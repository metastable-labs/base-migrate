import { Octokit } from '@octokit/core';
import axios from 'axios';
import { env } from '../common/config/env';

export class AuthService {
  async githubCallback(code: string) {
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

    const { access_token } = response.data;

    const octokit = new Octokit({ auth: access_token });

    const userInfo = await octokit.request('GET /user');

    return {
      name: userInfo.data.name,
      username: userInfo.data.login,
      avatar: userInfo.data.avatar_url,
      profile: userInfo.data.html_url,
      accessToken: access_token,
    };
  }
}
