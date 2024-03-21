import * as envVar from 'env-var';
import { config } from 'dotenv';

const envPath = `${process.cwd()}/.env${
  process.env.NODE_ENV ? '.' + process.env.NODE_ENV : ''
}`;

config({ path: envPath });

export const env = {
  app: {
    port: envVar.get('APP_PORT').required().asPortNumber(),
  },
  github: {
    url: envVar.get('GITHUB_URL').required().asString(),
    clientId: envVar.get('GITHUB_CLIENT_ID').required().asString(),
    clientSecret: envVar.get('GITHUB_CLIENT_SECRET').required().asString(),
  },
  chain: {
    username: envVar.get('CHAIN_GITHUB_USERNAME').required().asString(),
    repo: envVar.get('CHAIN_GITHUB_REPO').required().asString(),
  },
  etherscan: {
    apiKey: envVar.get('ETHERSCAN_API_KEY').required().asString(),
    apiUrl: envVar.get('ETHERSCAN_API_URL').required().asString(),
  },
};
