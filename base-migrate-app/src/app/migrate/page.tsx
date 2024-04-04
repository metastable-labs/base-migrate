'use client';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useChainId } from 'wagmi';
import { supportedNetworks } from '@/config/rainbowkit';
import { useCookies } from 'react-cookie';
import { trim } from 'viem';
import { toast } from 'react-toastify';

import StepHeader from './step-header';
import { Logo } from '../../../public/icons';
import Input from '@/components/input';
import { Button, MobileView } from '@/components';
import MigrationProgress from './progress';
import useContract from '@/hooks/useContract';
import { axiosInstance } from '@/utils/axios';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import readTokenData from '../utils/read-contract';
import Success from './success';

interface ResponseProp {
  validInstallation: boolean;
}

function MigratePage() {
  const { deployToken, isPending, isConfirmed, getTransactionData, deployTokenWithDecimal, hash } =
    useContract();
  const chainId = useChainId();
  const { navigate } = useSystemFunctions();

  const [activeStep, setActiveStep] = useState(3);
  const [formData, setFormData] = useState({
    token_description: '',
    logo: '',
    website: '',
    twitter: '',
  });
  const [refresh, setRefresh] = useState(false);
  const [done, setDone] = useState(false);
  const [token_address, setTokenAddress] = useState<`0x${string}`>();
  const [tokenData, setTokenData] = useState({ decimal: '', name: '', symbol: '' });
  const [pullRequestUrl, setPullRequestUrl] = useState('');
  const [deployedToken, setDeployedToken] = useState('');
  const [userHasValidPermission, setUserHasValidPermission] = useState(false);
  const [cookies] = useCookies(['authtoken']);

  const navigateUserToAuth = () => {
    toast('Please reauthenticate to github.', {
      type: 'info',
    });
    return navigate.push('/home');
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData((prevFormData: any) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleAddressChange = (e: any) => {
    setTokenAddress(e.target.value);
  };

  const nextStep = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleSubmit = (e: any) => {
    try {
      e.preventDefault();

      if (!cookies?.authtoken || !userHasValidPermission) {
        return navigateUserToAuth();
      }
      nextStep();

      if (token_address) {
        if (tokenData.decimal === '18') {
          deployToken(token_address, tokenData.name, tokenData.symbol);
        } else if (tokenData.decimal !== '18' && chainId === 8453) {
          deployTokenWithDecimal(
            token_address,
            tokenData.name,
            tokenData.symbol,
            tokenData.decimal,
          );
        } else if (chainId === 84532) {
          deployToken(token_address, tokenData.name, tokenData.symbol);
        }
      }
    } catch (e) {
      //
    }
  };

  const fetchData = async () => {
    try {
      if (isPending || !isConfirmed) return;

      const data = await getTransactionData();

      if (data?.status == 'success') {
        const body: any = {
          chainId,
          logoUrl: formData.logo,
          tokenData: {
            name: tokenData?.name,
            symbol: tokenData?.symbol,
            decimals: Number(tokenData?.decimal),
            description: formData.token_description,
            website: formData.website,
            twitter: formData.twitter,
            tokens: {
              ethereum: {
                address: token_address,
              },
            },
          },
        };

        const alternativeToken: any = await supportedNetworks.find(
          (network) => network.chainId === chainId,
        );

        const logIndex = chainId === 84532 || tokenData.decimal !== '18' ? 1 : 0;
        const deployedToken = data?.logs?.[logIndex]?.topics?.[2];
        if (deployedToken) {
          body.tokenData.tokens[alternativeToken.id] = { address: trim(deployedToken) };
        }

        const response = await axiosInstance.post(`/migrate/token`, body);

        setPullRequestUrl(response?.data?.data?.pullRequestUrl);
        setDeployedToken(deployedToken!);
        setDone(true);
      }
    } catch (error) {
      toast('An error occured! Please try again later', {
        type: 'error',
      });

      setRefresh(true);

      setTimeout(() => {
        setRefresh(false);
      }, 2000);
    }
  };

  const fetchTokenData = async () => {
    // Check if the input is a valid Ethereum wallet address
    const isAddressMatch = token_address?.match(/^0x[a-fA-F0-9]{40}$/);
    if (isAddressMatch) {
      try {
        const res = await readTokenData(token_address!);
        setTokenData({
          name: res.name,
          symbol: res.symbol,
          decimal: res.decimal.toString(), // Convert number to string to match expected type
        });
      } catch (err) {
        toast(
          `Invalid address: Address must be a valid token contract on ${chainId === 8453 ? 'Ethereum(L1)' : 'Sepolia'}`,
          {
            type: 'error',
          },
        );
      }
    } else {
      setTokenData({
        name: '',
        symbol: '',
        decimal: '',
      }); // Clear data if address is invalid
    }
  };

  const checkAuthPermission = async () => {
    const response = await axiosInstance.get(`/auth/github/permissions`);
    const data: ResponseProp = response.data?.data;

    return setUserHasValidPermission(data.validInstallation);
  };

  useEffect(() => {
    fetchData();
  }, [isPending, isConfirmed]);

  useEffect(() => {
    if (token_address) {
      fetchTokenData();
    }
  }, [token_address]);

  useEffect(() => {
    checkAuthPermission();
  }, []);

  return (
    <>
      <MobileView />
      <div className="hidden lg:block">
        {activeStep < 2 && <StepHeader activeStep={activeStep} />}
        <div className="p-8 flex items-center justify-center">
          <div
            className={classNames(
              'flex-col border rounded-xl border-grey-200 bg-white-50 inline-flex w-full mx-2 md:mx-0 h-auto p-6',
              {
                'md:w-[552px]': activeStep !== 2,
                'md:w-[448px]': activeStep === 2,
                'md:w-full border-none -mt-5': activeStep === 3,
                'mt-20': activeStep > 1,
              },
            )}>
            <div
              className={classNames('flex justify-center pb-6', {
                hidden: activeStep === 3,
              })}>
              <Logo />
            </div>
            <>
              <form onSubmit={handleSubmit}>
                {activeStep === 0 && (
                  <>
                    <div>
                      <Input
                        name="token_address"
                        label="Token Address on Ethereum(L1)"
                        placeholder="Token address"
                        onChange={handleAddressChange}
                        value={token_address}
                        required
                      />
                    </div>
                    {tokenData.name !== '' ? (
                      <div className="w-full px-3">
                        <div className="w-full px-6 py-3 bg-neutral-50 rounded-[10px] border border-zinc-200 flex-col justify-start items-start gap-6 inline-flex">
                          <div className="flex-col justify-start items-start gap-[7px] flex">
                            <div className="text-neutral-900 text-sm font-medium leading-tight">
                              Token Name
                            </div>
                            <div className="text-blue-700 text-xl font-normal leading-[29px]">
                              {tokenData.name}
                            </div>
                          </div>
                          <div className="flex-col justify-start items-start gap-[7px] flex">
                            <div className="text-neutral-900 text-sm font-medium leading-tight">
                              Token Symbol
                            </div>
                            <div className="text-blue-700 text-xl font-normal leading-[29px]">
                              {tokenData.symbol}
                            </div>
                          </div>
                          <div className="flex-col justify-start items-start gap-[7px] flex">
                            <div className="text-neutral-900 text-sm font-medium leading-tight">
                              Token Decimal
                            </div>
                            <div className="text-blue-700 text-xl font-normal leading-[29px]">
                              {tokenData.decimal}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      ''
                    )}

                    <div>
                      <Input
                        name="token_description"
                        label="Token Description"
                        type={'textarea'}
                        placeholder="Token Description"
                        onChange={handleChange}
                        value={formData.token_description}
                        required
                      />
                    </div>

                    <div className="py-6 flex flex-col justify-center items-center">
                      <Button
                        disabled={!token_address || !formData.token_description}
                        onClick={nextStep}
                        variant="tertiary"
                        text={'Next'}
                      />
                    </div>
                  </>
                )}

                {activeStep === 1 && (
                  <>
                    <div>
                      <Input
                        name="logo"
                        label="Logo url (must be in SVG format)"
                        placeholder="Add your Logo URL"
                        onChange={handleChange}
                        value={formData.logo}
                        required
                      />
                    </div>
                    <div>
                      <Input
                        name="website"
                        label="Website Link"
                        placeholder="www.njokuscript.com"
                        onChange={handleChange}
                        value={formData.website}
                      />
                    </div>
                    <div>
                      <Input
                        name="twitter"
                        label="Twitter Link"
                        placeholder="www.twitter.com/njokuscript"
                        onChange={handleChange}
                        value={formData.twitter}
                      />
                    </div>

                    <div className="py-6 flex flex-col justify-center items-center">
                      <Button
                        disabled={!formData.logo}
                        type="submit"
                        variant="tertiary"
                        text={'Migrate to Base'}
                      />
                    </div>
                  </>
                )}
              </form>
            </>

            {activeStep === 2 && (
              <MigrationProgress
                isDone={done}
                isPending={isPending}
                isConfirmed={isConfirmed}
                next={nextStep}
                refresh={refresh}
              />
            )}

            {activeStep === 3 && (
              <Success hash={hash} token_address={deployedToken} repo_url={pullRequestUrl} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default MigratePage;
