import axios from 'axios';

import { env } from '../../config/env';
import { VERIFY_CONTRACT_PARAMS } from './constants';

export const isContractVerified = async (address: string) => {
  try {
    const response = await axios.get(
      `${env.etherscan.apiUrl}?module=contract&action=getsourcecode&address=${address}&apikey=${env.etherscan.apiKey}`
    );
    return response.data.result.length > 0;
  } catch (error) {
    return false;
  }
};

export const verifyContract = async (
  address: string,
  chainId: number,
  arguementEncoded: string
) => {
  try {
    const contractVerified = await isContractVerified(address);

    if (contractVerified) {
      return true;
    }

    const response = await axios.post(
      `${env.etherscan.apiUrl}?module=contract&action=verifysourcecode&apikey=${env.etherscan.apiKey}&chainId=${chainId}`,
      {
        chainId,
        contractaddress: address,
        constructorArguements: arguementEncoded,
        codeformat: VERIFY_CONTRACT_PARAMS.codeFormat,
        sourceCode: VERIFY_CONTRACT_PARAMS.sourceCode,
        contractname: VERIFY_CONTRACT_PARAMS.contractName,
        compilerversion: VERIFY_CONTRACT_PARAMS.compilerVersion,
        optimizationUsed: VERIFY_CONTRACT_PARAMS.optimizationUsed,
        runs: VERIFY_CONTRACT_PARAMS.runs,
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    return response.data.result;
  } catch (error) {
    return false;
  }
};
