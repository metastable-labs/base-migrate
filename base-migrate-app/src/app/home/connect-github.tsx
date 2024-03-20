import React, { useState } from 'react';
import { Button, Modal } from '@/components';
import { GithubIcon, Logo, SmallGithubIcon } from '../../../public/icons';
import Input from '@/components/input';
import Link from 'next/link';
import useSystemFunctions from '@/hooks/useSystemFunctions';

const ConnectGithub = () => {
  const { navigate } = useSystemFunctions();
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState('');
  return (
    <>
      <div className="w-[80%] md:w-[376px] p-6 rounded-xl border border-black-200 flex flex-col justify-center items-center gap-6">
        <GithubIcon />
        <div className="font-medium text-sm md:text-base text-black-250">Connect Github</div>
        <p className="text-black-300 text-sm md:text-base leading-5 lg:leading-7 text-center">
          The github account connected will be used to fork and create a pull request on the
          Superchain token list repo.
        </p>
        <Button
          variant="secondary"
          onClick={() => setOpen(true)}
          text="Connect github"
          icon={<SmallGithubIcon />}
        />
      </div>

      {open && (
        <Modal close={() => setOpen(false)}>
          <div className="flex flex-col items-center gap-6">
            <Logo />
            <div className="font-medium text-sm md:text-base text-black-250">Connect Github</div>
            <p className="text-black-300 text-sm md:text-base leading-5 lg:leading-7 text-center">
              The github account connected will be used to fork and create a pull request on the
              Superchain token list repo.
            </p>
          </div>
          <div>
            <Input
              name="github"
              label="Github access token"
              placeholder="Enter Access token"
              onChange={setToken}
            />
          </div>
          <div className="py-3 flex flex-col justify-center items-center">
            <Button
              onClick={() => navigate.push('/migrate')}
              variant="tertiary"
              text={'Continue'}
            />
            <Link
              href="https://docs.github.com/en/enterprise-server@3.9/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens"
              target="_blank"
              className="text-blue-50 underline justify-center pt-6">
              Don’t know how to get your Github access token?
            </Link>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ConnectGithub;
