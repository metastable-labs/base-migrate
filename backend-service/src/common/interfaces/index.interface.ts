export interface Token {
  name: string;
  symbol: string;
  decimals: number;
  description?: string;
  website?: string;
  twitter?: string;
  tokens: {
    ethereum?: {
      address: string;
    };
    optimism?: {
      address: string;
    };
    sepolia?: {
      address: string;
    };
    'optimism-sepolia'?: {
      address: string;
    };
    base?: {
      address: string;
    };
    'base-sepolia'?: {
      address: string;
    };
    mode?: {
      address: string;
    };
    pgn?: {
      address: string;
    };
  };
}
