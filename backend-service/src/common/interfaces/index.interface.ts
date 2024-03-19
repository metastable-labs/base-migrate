export interface Token {
  name: string;
  symbol: string;
  decimals: number;
  description?: string;
  website?: string;
  twitter?: string;
  tokens: {
    [key: string]: {
      address: string;
    };
  };
}
