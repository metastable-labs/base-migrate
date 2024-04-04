import { Octokit } from '@octokit/core';
import { App } from 'octokit';
import axios from 'axios';
import { env } from '../common/config/env';

export class AuthService {
  async githubAuth(code: string) {
    const response = await axios.post(
      `${env.github.url}/login/oauth/access_token`,
      {
        client_id: env.github.clientId,
        client_secret: env.github.clientSecret,
        code,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );

    const {
      access_token,
      expires_in,
      refresh_token,
      refresh_token_expires_in,
    } = response.data;

    const octokit = new Octokit({ auth: access_token });

    const userInfo = await octokit.request('GET /user');

    const findInstallation = await this.findInstallation(
      octokit,
      userInfo.data.login
    );

    return {
      accessToken: access_token,
      expiresIn: expires_in,
      refreshToken: refresh_token,
      refreshTokenExpiresIn: refresh_token_expires_in,
      user: {
        name: userInfo.data.name,
        username: userInfo.data.login,
        avatar: userInfo.data.avatar_url,
        profile: userInfo.data.html_url,
      },
      permissions: {
        validInstallation: !!findInstallation,
        ...findInstallation?.permissions,
      },
    };
  }

  async getPermissions(accessToken: string) {
    const octokit = new Octokit({ auth: accessToken });
    const userInfo = await octokit.request('GET /user');

    const findInstallation = await this.findInstallation(
      octokit,
      userInfo.data.login
    );

    return {
      validInstallation: !!findInstallation,
      ...findInstallation?.permissions,
    };
  }

  async getSession(accessToken: string) {
    const octokit = new Octokit({ auth: accessToken });

    const userInfo = await octokit.request('GET /user');

    const findInstallation = await this.findInstallation(
      octokit,
      userInfo.data.login
    );

    return {
      name: userInfo.data.name,
      username: userInfo.data.login,
      avatar: userInfo.data.avatar_url,
      profile: userInfo.data.html_url,
      permissions: {
        validInstallation: !!findInstallation,
        ...findInstallation?.permissions,
      },
    };
  }

  async disconnect(accessToken: string) {
    const octokitCore = new Octokit({ auth: accessToken });

    const userInfo = await octokitCore.request('GET /user');
    const findInstallation = await this.findInstallation(
      octokitCore,
      userInfo.data.login
    );

    if (!findInstallation) {
      throw {
        status: 404,
        message: 'Installation not found',
      };
    }

    const app = new App({
      appId: env.github.appId,
      privateKey: env.github.privateKey.replace(/\\n/g, '\n'),
    });

    const octokit = await app.getInstallationOctokit(findInstallation.id);

    await octokit.request('DELETE /applications/{client_id}/grant', {
      client_id: env.github.clientId,
      access_token: accessToken,
    });

    // await octokit.request('DELETE /app/installations/{installation_id}', {
    //   installation_id: findInstallation.id,
    // });
  }

  private async findInstallation(octokit: Octokit, username: string) {
    const installations = await octokit.request('GET /user/installations');

    const findInstallation = installations.data.installations.find(
      (installation) =>
        installation.app_id === env.github.appId &&
        (installation.account as { login: string }).login === username &&
        installation.target_type === 'User' &&
        installation.repository_selection === 'all'
    );

    return findInstallation;
  }
}
