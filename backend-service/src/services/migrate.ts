import { Octokit } from '@octokit/core';
import axios from 'axios';
import { ethers } from 'ethers';
import { MigrateTokenDto } from '../dtos/migrate';

import { env } from '../common/config/env';
import { Token } from '../common/interfaces/index.interface';
import { CHAIN_ID } from '../common/enums';
import { L2_STANDARD_BRIDGE_ADDRESS } from '../common/constants';
import { verifyContract } from '../common/helpers/etherscan';

export class MigrateService {
  async migrateToken(body: MigrateTokenDto, accessToken: string) {
    const octokit = new Octokit({ auth: accessToken });

    const fork = await this.forkRepository(octokit);

    const owner = fork.owner.login;
    const repo = fork.name;

    let logoUrl = body.logoUrl;
    await this.addToken(octokit, owner, repo, body.tokenData, logoUrl);

    const pullRequestUrl = `${env.github.url}/${env.chain.username}/${repo}/compare/master...${owner}:${repo}:master`;

    return {
      pullRequestUrl,
    };
  }

  async forkRepository(octokit: Octokit) {
    const response = await octokit.request('POST /repos/{owner}/{repo}/forks', {
      owner: env.chain.username,
      repo: env.chain.repo,
    });

    return response.data;
  }

  async createNewBranchFromDefault(
    octokit: Octokit,
    newBranchName: string,
    owner: string
  ) {
    const {
      data: {
        commit: { sha },
      },
    } = await octokit.request('GET /repos/{owner}/{repo}/branches/{branch}', {
      owner: env.chain.username,
      repo: env.chain.repo,
      branch: 'master',
    });

    const response = await octokit.request(
      'POST /repos/{owner}/{repo}/git/refs',
      {
        owner,
        repo: env.chain.repo,
        ref: `refs/heads/${newBranchName}`,
        sha,
      }
    );

    return response.data;
  }

  async createPullRequest(
    octokit: Octokit,
    forkOwner: string,
    repo: string,
    base: string,
    head: string,
    title: string,
    body: string
  ) {
    const response = await octokit.request('POST /repos/{owner}/{repo}/pulls', {
      owner: forkOwner,
      repo,
      title,
      body,
      head,
      base,
    });

    return response.data;
  }

  async createOrUpdateFile(
    octokit: Octokit,
    owner: string,
    repo: string,
    path: string,
    content: string,
    message: string
  ) {
    const res = await this.getFileSHA(octokit, owner, repo, path);
    if (res) {
      return;
    }

    const response = await octokit.request(
      'PUT /repos/{owner}/{repo}/contents/{path}',
      {
        owner,
        repo,
        path,
        message,
        content,
      }
    );

    return response.data;
  }

  async addToken(
    octokit: Octokit,
    owner: string,
    repo: string,
    tokenData: Token,
    logoUrl: string
  ) {
    const logoContent = await this.fetchAndEncodeImage(logoUrl);
    const dataContent = Buffer.from(
      JSON.stringify(tokenData, null, 2)
    ).toString('base64');

    await this.createOrUpdateFile(
      octokit,
      owner,
      repo,
      `data/${tokenData.symbol}/logo.svg`,
      logoContent,
      'Added logo.svg'
    );

    await this.createOrUpdateFile(
      octokit,
      owner,
      repo,
      `data/${tokenData.symbol}/data.json`,
      dataContent,
      'Added data.json'
    );
  }

  async fetchAndEncodeImage(url: string) {
    try {
      const response = await axios.get(url, {
        responseType: 'arraybuffer',
      });
      const buffer = Buffer.from(response.data, 'binary');
      return buffer.toString('base64');
    } catch (error) {
      throw error;
    }
  }

  async getFileSHA(
    octokit: Octokit,
    owner: string,
    repo: string,
    path: string
  ) {
    try {
      const response = await octokit.request(
        'GET /repos/{owner}/{repo}/contents/{path}',
        {
          owner,
          repo,
          path,
        }
      );

      return response.data;
    } catch (error) {
      return null;
    }
  }

  async etherscanVerify(
    chainId: CHAIN_ID,
    baseTokenAddress: string,
    name: string,
    symbol: string
  ) {
    if (CHAIN_ID.BASE_SEPOLIA === chainId) {
      return;
    }

    const encodedParams = this.encodeContructParams(
      L2_STANDARD_BRIDGE_ADDRESS,
      baseTokenAddress,
      name,
      symbol
    );

    const response = await verifyContract(
      baseTokenAddress,
      chainId,
      encodedParams
    );

    return response;
  }

  encodeContructParams(
    bridgeAddress: string,
    tokenAddress: string,
    tokenName: string,
    tokenSymbol: string
  ) {
    const abi = new ethers.AbiCoder();
    const args = [bridgeAddress, tokenAddress, tokenName, tokenSymbol];

    return abi.encode(['address', 'address', 'string', 'string'], args);
  }
}
