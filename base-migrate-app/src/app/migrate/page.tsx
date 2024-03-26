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
import { Button } from '@/components';
import MigrationProgress from './progress';
import useContract from '@/hooks/useContract';
import { axiosInstance } from '@/utils/axios';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import readTokenData from '../utils/read-contract';

function MigratePage() {
  const { deployToken, isPending, isConfirmed, getTransactionData } = useContract();
  const chainId = useChainId();
  const { navigate } = useSystemFunctions();

  const [activeStep, setActiveStep] = useState(0);
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
  const [cookies] = useCookies(['authtoken']);

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

      toast("We're currently updating our service. Please try again shortly!", {
        type: 'error',
      });
      return;

      // if (!cookies?.authtoken) {
      //   return navigate.push('/home');
      // }

      // nextStep();

      // if (token_address) {
      //   deployToken(token_address, tokenData.name, tokenData.symbol);
      // }
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
            decimals: tokenData?.decimal,
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

        const deployedToken = data?.logs[chainId === 84532 ? 1 : 0]?.topics[2];

        body.tokenData.tokens[alternativeToken.id!] = { address: trim(deployedToken!) };

        const response = await axiosInstance.post(`/migrate/token`, body);

        setPullRequestUrl(response?.data?.data?.pullRequestUrl);
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

  useEffect(() => {
    fetchData();
  }, [isPending, isConfirmed]);

  useEffect(() => {
    if (token_address) {
      fetchTokenData();
    }
  }, [token_address]);

  return (
    <div>
      {activeStep < 2 && <StepHeader activeStep={activeStep} />}
      <div className="p-8 flex items-center justify-center">
        <div
          className={classNames(
            'flex-col border rounded-xl border-grey-200 bg-white-50 inline-flex w-full mx-2 md:mx-0 h-auto p-6',
            {
              'md:w-[552px]': activeStep !== 2,
              'md:w-[448px]': activeStep === 2,
              'mt-20': activeStep > 1,
            },
          )}>
          <div className="flex justify-center pb-6">
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
            <div>
              <div className="md:text-lg text-black-250 text-center font-medium">
                You’re almost Based 🔵
              </div>
              <p className="text-black-300 text-sm md:text-base leading-5 lg:leading-7 text-center mt-4 px-6 md:px-20">
                To complete the migration, submit a pull request to the Superchain token repo list.
              </p>
              <p className="text-black-300 text-sm md:text-base leading-5 lg:leading-7 text-center mt-4 px-6 md:px-20">
                Once your PR is merged, the token list will update automatically to include your
                token and your token will be available on the Base Bridge.
              </p>

              <a
                target={'_blank'}
                rel={'noreferrer'}
                href={pullRequestUrl}
                className="py-7 flex flex-col justify-center items-center">
                <Button onClick={() => {}} variant="tertiary" text={'Raise Pull Request'} />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MigratePage;
