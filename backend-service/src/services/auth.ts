import { Octokit } from '@octokit/core';
import axios from 'axios';
import { env } from '../common/config/env';

export class AuthService {
  async githubAuth(code: string) {
    console.log(
      'code',
      code,
      env.github.url,
      env.github.clientId,
      env.github.clientSecret
    );

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

    console.log('access_token', access_token);

    const octokit = new Octokit({ auth: access_token });

    const userInfo = await octokit.request('GET /user');

    console.log('userInfo', userInfo);

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
    };
  }

  async getSession(accessToken: string) {
    const octokit = new Octokit({ auth: accessToken });

    const userInfo = await octokit.request('GET /user');

    return {
      name: userInfo.data.name,
      username: userInfo.data.login,
      avatar: userInfo.data.avatar_url,
      profile: userInfo.data.html_url,
    };
  }
}
