import path from 'path';
import fs from 'fs';

const contractFile = path.join(
  __dirname,
  `../../../contracts/BasedMigrateERC20.sol`
);

export const VERIFY_CONTRACT_PARAMS = {
  contractName: 'BasedMigrateERC20',
  sourceCode: fs.readFileSync(contractFile, 'utf8'),
  codeFormat: 'solidity-single-file',
  compilerVersion: 'v0.8.20+commit.a1b79de6',
  optimizationUsed: 0,
  runs: 200,
};
