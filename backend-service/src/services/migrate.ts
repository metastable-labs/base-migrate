import { Octokit } from '@octokit/core';
import axios from 'axios';
import { ethers } from 'ethers';
import { MigrateTokenDto } from '../dtos/migrate';

import { env } from '../common/config/env';
import { Token } from '../common/interfaces/index.interface';
import { DB } from '../common/helpers/db';

interface GitHubFileContentResponse {
  sha: string;
  content: string;
}

export class MigrateService {
  private db: DB;
  constructor() {
    this.db = new DB();
  }

  async migrateToken(body: MigrateTokenDto, accessToken: string) {
    const octokit = new Octokit({ auth: accessToken });

    const fork = await this.forkRepository(octokit);

    const owner = fork.owner.login;
    const repo = fork.name;

    let logoUrl = body.logoUrl;
    await this.addToken(octokit, owner, repo, body.tokenData, logoUrl);

    const pullRequestUrl = `${env.github.url}/${env.chain.username}/${repo}/compare/master...${owner}:${repo}:master`;

    const address = this.getDatabaseKeyFromTokens(body.tokenData);

    body.tokenData = {
      ...body.tokenData,
      username: owner,
      pullRequestUrl,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await this.db.createOrUpdate(body.tokenData, address);

    return {
      pullRequestUrl,
    };
  }

  async getMigrations() {
    const dbData = await this.db.findAll();
    const dbDataArray = Object.keys(dbData).map((key) => dbData[key]);

    return dbDataArray;
  }

  getDatabaseKeyFromTokens(tokenData: Token): string | undefined {
    const tokenPriority = [
      'ethereum',
      'sepolia',
      'optimism',
      'optimism-sepolia',
      'base',
      'base-sepolia',
      'mode',
      'pgn',
    ];

    for (const key of tokenPriority) {
      const address = tokenData.tokens?.[key]?.address;
      if (address) {
        return address;
      }
    }

    return undefined;
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

    const response = await octokit.request(
      'PUT /repos/{owner}/{repo}/contents/{path}',
      {
        owner,
        repo,
        path,
        message: res ? `Updated ${message}` : `Added ${message}`,
        content,
        sha: res ? res.sha : undefined,
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
    await this.createOrUpdateFile(
      octokit,
      owner,
      repo,
      `data/${tokenData.symbol}/logo.svg`,
      logoContent,
      `${tokenData.name} logo.svg`
    );

    const dataPath = `data/${tokenData.symbol}/data.json`;

    const dataContent = await this.getMergedContentAndUpdate(
      octokit,
      owner,
      repo,
      dataPath,
      tokenData
    );

    await this.createOrUpdateFile(
      octokit,
      owner,
      repo,
      dataPath,
      dataContent,
      `${tokenData.name} data.json`
    );
  }

  async fetchAndEncodeImage(url: string) {
    const response = await axios.get(url, {
      responseType: 'arraybuffer',
    });
    const buffer = Buffer.from(response.data, 'binary');
    return buffer.toString('base64');
  }

  async getFileSHA(
    octokit: Octokit,
    owner: string,
    repo: string,
    path: string
  ): Promise<GitHubFileContentResponse | null> {
    try {
      const response = await octokit.request(
        'GET /repos/{owner}/{repo}/contents/{path}',
        {
          owner,
          repo,
          path,
        }
      );

      return response.data as GitHubFileContentResponse;
    } catch (error) {
      return null;
    }
  }

  async getMergedContentAndUpdate(
    octokit: Octokit,
    owner: string,
    repo: string,
    path: string,
    content: Token
  ) {
    const res = await this.getFileSHA(octokit, owner, repo, path);

    if (!res) {
      const dataContent = Buffer.from(
        JSON.stringify(content, null, 2)
      ).toString('base64');

      return dataContent;
    }

    let currentData: Token;

    if (res?.content) {
      const contentDecoded = Buffer.from(res.content, 'base64').toString(
        'utf8'
      );
      currentData = JSON.parse(contentDecoded);
    }

    const mergedContent: Token = {
      ...currentData,
      ...content,
      tokens: {
        ...currentData.tokens,
        ...content.tokens,
      },
    };

    const updatedContentBase64 = Buffer.from(
      JSON.stringify(mergedContent, null, 2)
    ).toString('base64');

    return updatedContentBase64;
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
