/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, memo } from 'react';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useSearchParams } from 'next/navigation';

import { Button, ClickAnimation, Container } from '@/components';
import {
  CheckedIcon,
  GithubIcon,
  InformationLine,
  Instruction1,
  Instruction2,
  Instruction3,
  SmallGithubIcon,
} from '../../../public/icons';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import { axiosInstance, setTokenHeader } from '@/utils/axios';
import Image from 'next/image';

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
  const [checked, setChecked] = useState(false);

  const url = !cookies?.isAuthenticated
    ? 'https://github.com/apps/base-migrate/installations/new?redirect_uri=https://www.base-migrate.xyz/home'
    : 'https://github.com/login/oauth/authorize?client_id=Iv1.c178abebc418bb02&scope=repo&redirect_uri=https://www.base-migrate.xyz/home';

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
    <Container variant="dash" classes="w-full">
      <div className="flex justify-center gap-16 xl:gap-20 w-full">
        <div className="w-[35%] mt-[60px]">
          <div className="p-6 rounded-xl border border-black-200 flex flex-col justify-center items-center gap-6">
            <GithubIcon />
            <div className="font-medium text-sm md:text-base text-black-250">Connect Github</div>
            <p className="text-black-300 text-sm md:text-base leading-5 lg:leading-7 text-center mx-4">
              The github account connected will be used to fork and create a pr on the Superchain
              token list repo
            </p>
            <a href={checked ? url : '#'}>
              <Button
                onClick={() => setLoading(true)}
                loading={loading}
                variant="secondary"
                text="Connect Github"
                icon={<SmallGithubIcon />}
                disabled={!checked}
              />
            </a>

            <div className="flex items-center justify-center gap-4">
              <ClickAnimation onClick={() => setChecked(!checked)}>
                <div>
                  {checked && <CheckedIcon />}

                  {!checked && <div className="w-5 h-5 rounded-[6px] border border-grey-450" />}
                </div>
              </ClickAnimation>

              <div className="text-black-500">I have read all instructions</div>
            </div>
          </div>
        </div>

        <div className="w-[65%] max-h-[89vh] overflow-y-scroll pb-20">
          <div className="pt-[65px] px-5">
            <h1 className="text-black-500 font-medium text-3xl">Connecting Github</h1>

            <p className="mt-4 text-xl leading-[30px] text-grey-300">
              To connect your GitHub account to our platform and enable seamless integration, please
              follow these steps:
            </p>

            <div className="w-[80%]">
              {/* <div className="mt-16 flex gap-5">
                <div className="w-[48px]">
                  <Instruction1 />
                </div>
                <div>
                  <h4 className="font-medium text-xl text-black-500">
                    Click the "Connect with GitHub" Button:
                  </h4>
                  <p className="text-grey-300 mt-3 text-base">
                    On our platform, locate and click the "Connect with GitHub" button.
                  </p>
                </div>
              </div> */}

              <div className="mt-12 flex gap-5">
                <div className="w-[48px]">
                  <Instruction2 />
                </div>
                <div>
                  <h4 className="font-medium text-xl text-black-500">Authorize Access:</h4>
                  <p className="text-grey-300 mt-3 text-base">
                    You will be redirected to GitHub's authorization page. GitHub will ask for your
                    permission to grant Base Migrate access to your account. Select the option that
                    grants access to{' '}
                    <span className="font-bold">all repositories and future repositories.</span>
                  </p>

                  <Image
                    alt="github-image"
                    src="/github-image.svg"
                    width={400}
                    height={200}
                    className="w-full mt-5"
                  />
                </div>
              </div>

              {/* <div className="mt-16 flex gap-5">
                <div className="w-[48px]">
                  <Instruction3 />
                </div>
                <div>
                  <h4 className="font-medium text-xl text-black-500">Complete the Connection:</h4>
                  <p className="text-grey-300 mt-3 text-base">
                    Once you've authorized access, you will be redirected back to our platform. The
                    connection is now complete, and you can start using our platform's GitHub
                    integration features.
                  </p>
                </div>
              </div> */}
            </div>
          </div>

          <div className="w-full h-[90px] rounded-[10px] py-5 px-6 bg-grey-350 flex items-center gap-3 mt-12">
            <div className="w-6">
              <InformationLine />
            </div>

            <div className="leading-6 text-grey-400">
              Please remember to disconnect your GitHub account from our platform after the
              migration process is complete or if you no longer wish to use our services.
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default memo(ConnectGithub);
