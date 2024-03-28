/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, memo } from 'react';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useSearchParams } from 'next/navigation';

import { Button } from '@/components';
import { GithubIcon, SmallGithubIcon } from '../../../public/icons';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import { axiosInstance, setTokenHeader } from '@/utils/axios';

interface ResponseProp {
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
  refreshTokenExpiresIn: number;
  user: {
    name: string;
    username: string;
    avatar: string;
    profile: string;
  };
}

const ConnectGithub = () => {
  const { navigate } = useSystemFunctions();

  const searchParams = useSearchParams();

  const code = searchParams.get('code');
  const [cookies, setCookie] = useCookies(['authtoken', 'isAuthenticated']);
  const [loading, setLoading] = useState(false);

  const url = !cookies?.isAuthenticated
    ? 'https://github.com/apps/base-migrate/installations/new?redirect_uri=https://base-migrate.xyz/home'
    : 'https://github.com/login/oauth/authorize?client_id=Iv1.c178abebc418bb02&scope=repo&redirect_uri=https://base-migrate.xyz/home';

  const setup = async () => {
    try {
      if (!code || loading) return;

      setLoading(true);

      const response = await axiosInstance.get(`/auth/github?code=${code}`);

      const data: ResponseProp = response.data?.data;

      setCookie('authtoken', data?.accessToken, {
        expires: new Date(new Date().getTime() + data?.expiresIn * 1000),
      });

      if (!cookies?.isAuthenticated) {
        setCookie('isAuthenticated', true, {
          expires: new Date(new Date().getTime() + 10 * 365 * 24 * 60 * 60 * 1000),
        });
      }
      setTokenHeader(data?.accessToken);

      toast('Github connected sucessfully', {
        type: 'success',
      });
      return navigate.push('/migrate');
    } catch (error: any) {
      if (error?.response?.status !== 401) {
        toast('An error occured! Please try again later', {
          type: 'error',
        });
      }

      if (!cookies?.isAuthenticated) {
        setCookie('isAuthenticated', true, {
          expires: new Date(new Date().getTime() + 10 * 365 * 24 * 60 * 60 * 1000),
        });
      }
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  useEffect(() => {
    if (cookies.authtoken) {
      return navigate.push('/');
    }
    setup();
  }, []);

  return (
    <>
      <div className="w-[80%] md:w-[376px] p-6 rounded-xl border border-black-200 flex flex-col justify-center items-center gap-6">
        <GithubIcon />
        <div className="font-medium text-sm md:text-base text-black-250">Connect Github</div>
        <p className="text-black-300 text-sm md:text-base leading-5 lg:leading-7 text-center">
          Your <span className="font-bold">personal</span> github account connected will be used to
          fork and create a pull request on the Superchain token list repo. Connect to your{' '}
          <span className="font-bold">personal</span> github account, not individual repositories.
        </p>
        <a href={url}>
          <Button
            onClick={() => setLoading(true)}
            loading={loading}
            variant="secondary"
            text="Connect github"
            icon={<SmallGithubIcon />}
          />
        </a>
      </div>
    </>
  );
};

export default memo(ConnectGithub);
