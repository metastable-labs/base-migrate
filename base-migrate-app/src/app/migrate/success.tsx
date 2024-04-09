/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { memo } from 'react';
import { toast } from 'react-toastify';

import { ClickAnimation, Container } from '@/components';
import {
  ArrowRight,
  CopyIcon,
  InformationLine,
  Instruction4,
  Instruction5,
  PullBlue,
  PullGreen,
} from '../../../public/icons';

const Success = ({
  repo_url,
  token_address,
  hash,
}: {
  repo_url?: string;
  token_address?: string;
  hash?: string;
}) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(token_address!);
    toast('Copied to clipboard', {
      type: 'info',
      autoClose: 2500,
      position: 'top-left',
    });
  };
  return (
    <Container variant="dash" classes="w-full">
      <div className="flex justify-center gap-16 xl:gap-20 w-full">
        <div className="w-[35%] mt-[60px]">
          <div className="p-6 rounded-xl border border-black-200 flex flex-col gap-6">
            <PullGreen />
            <h1 className="text-black-500 font-medium text-2xl">You’re almost based! 🔵</h1>
            <p className="text-lg leading-[30px] text-grey-300">
              To complete the migration, submit a pull request to the Superchain token repo list.
            </p>

            <a
              href={repo_url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 border-b border-blue-150 w-[200px]">
              <PullBlue />
              <div className="text-lg text-blue-150">Raise a pull request</div>
            </a>

            <div className="flex flex-col gap-3">
              <div className="mt-10 font-medium text-grey-100">Token Details</div>
              <div className="flex items-center gap-2">
                <div className="font-medium text-lg text-black-500">
                  {token_address?.slice?.(0, 6)}...{token_address?.slice(-4)}
                </div>
                <ClickAnimation onClick={copyToClipboard}>
                  <CopyIcon />
                </ClickAnimation>
              </div>
              <a
                href={`https://basescan.org/tx/${hash}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2">
                <div className="text-lg text-blue-150 border-b border-blue-150">
                  View on basescan
                </div>
                <ArrowRight />
              </a>
            </div>
          </div>
        </div>

        <div className="w-[65%] max-h-[89vh] overflow-y-scroll pb-20">
          <div className="pt-[65px] px-5">
            <h1 className="text-black-500 font-medium text-3xl">Creating a Pull Request</h1>

            <p className="mt-4 text-xl leading-[30px] text-grey-300">
              By creating a pull request, your token will be added to the Superchain token repo
              list. Please ensure you do the following:
            </p>

            <div className="w-[80%]">
              <div className="mt-16 flex gap-5 items-center">
                <div className="w-[48px]">
                  <Instruction4 />
                </div>
                <div>
                  <h4 className="font-medium text-xl text-black-500 leading-[30px]">
                    Clear PR title - e.g: BITCOIN token on Base and PR Description
                  </h4>
                </div>
              </div>

              <div className="mt-10 flex gap-5 items-center">
                <div className="w-[48px]">
                  <Instruction5 />
                </div>
                <div>
                  <h4 className="font-medium text-xl text-black-500 leading-[30px]">
                    Please add <span className="border-b border-black-500">@cfluke-cb </span> as a
                    reviewer, and look out for comments and questions on the Pull Request{' '}
                  </h4>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-[90px] rounded-[10px] py-5 px-6 bg-grey-350 flex items-center gap-3 mt-12">
            <div className="w-6">
              <InformationLine />
            </div>

            <div className="leading-6 text-grey-400">
              After the automated checks pass and a reviewer approves the PR, then it will
              automatically be merged.
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default memo(Success);
