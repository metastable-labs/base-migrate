'use client';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { getAccount } from '@wagmi/core';
import { wagmiConfig } from '@/config/rainbowkit';
import { useCookies } from 'react-cookie';

import StepHeader from './step-header';
import { Logo } from '../../../public/icons';
import Input from '@/components/input';
import { Button } from '@/components';
import MigrationProgress from './progress';
import useContract from '@/hooks/useContract';
import { axiosInstance } from '@/utils/axios';
import useSystemFunctions from '@/hooks/useSystemFunctions';

function MigratePage() {
  const { deployToken, isPending, isConfirmed, getTransactionData } = useContract();
  const { chainId } = getAccount(wagmiConfig);
  const { navigate } = useSystemFunctions();

  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    token_name: '',
    token_symbol: '',
    token_decimal: '',
    token_description: '',
    token_address: '',
    logo: '',
    website: '',
    twitter: '',
  });
  const [done, setDone] = useState(false);
  const [pullRequestUrl, setPullRequestUrl] = useState('');
  const [cookies] = useCookies(['authtoken']);

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData((prevFormData: any) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const nextStep = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!cookies?.authtoken) {
      return navigate.push('/home');
    }

    nextStep();

    deployToken(formData.token_address, formData.token_name, formData.token_symbol);
  };

  const fetchData = async () => {
    try {
      if (isPending || !isConfirmed) return;

      const data = await getTransactionData();
      console.log(data, 'tx data');
      console.log('deployed token on base:', data?.logs[0].address);

      const body = {
        chainId,
        logoUrl: formData.logo,
        tokenData: {
          name: formData.token_name,
          symbol: formData.token_symbol,
          decimals: formData.token_decimal,
          description: formData.token_description,
          website: formData.website,
          twitter: formData.twitter,
          tokens: {
            ethereum: {
              address: formData.token_address,
            },
            base: {
              address: data?.logs[0].address,
            },
          },
        },
      };

      const response = await axiosInstance.post(`/migrate/token`, body);

      setPullRequestUrl(response?.data?.data?.pullRequestUrl);
      setDone(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isPending, isConfirmed]);
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
                      name="token_name"
                      label="Token Name"
                      placeholder="DAI Stablecoin"
                      onChange={handleChange}
                      value={formData.token_name}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      name="token_symbol"
                      label="Token Symbol"
                      placeholder="$DAI"
                      onChange={handleChange}
                      value={formData.token_symbol}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      name="token_decimal"
                      label="Token Decimal"
                      placeholder="18"
                      onChange={handleChange}
                      value={formData.token_decimal}
                      required
                    />
                  </div>
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
                  <div>
                    <Input
                      name="token_address"
                      label="Token Address on Ethereum(L1)"
                      placeholder="Token address"
                      onChange={handleChange}
                      value={formData.token_address}
                      required
                    />
                  </div>
                  <div className="py-6 flex flex-col justify-center items-center">
                    <Button onClick={nextStep} variant="tertiary" text={'Next'} />
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
                      onChange={() => {}}
                      value={formData.logo}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      name="website"
                      label="Website Link"
                      placeholder="www.njokuscript.com"
                      onChange={() => {}}
                      value={formData.website}
                    />
                  </div>
                  <div>
                    <Input
                      name="twitter"
                      label="Twitter Link"
                      placeholder="www.twitter.com/njokuscript"
                      onChange={() => {}}
                      value={formData.twitter}
                    />
                  </div>

                  <div className="py-6 flex flex-col justify-center items-center">
                    <Button type="submit" variant="tertiary" text={'Migrate to Base'} />
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

              <a href={pullRequestUrl} className="py-7 flex flex-col justify-center items-center">
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
