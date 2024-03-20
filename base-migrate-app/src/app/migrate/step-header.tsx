'use client';
import React from 'react';
import { CheckIcon, RightArrowIcon } from '../../../public/icons';
import classNames from 'classnames';

const StepHeader = ({ activeStep }: { activeStep: number }) => {
  return (
    <div className="flex flex-row gap-4 justify-center items-center mt-10">
      {activeStep === 0 ? (
        <div className="rounded-full bg-blue-150 w-5 h-5 items-center justify-center flex">
          <div className="text-xs font-medium text-white-50">1</div>
        </div>
      ) : (
        <CheckIcon />
      )}

      <div className="text-sm font-normal text-black-50">Token info</div>
      <RightArrowIcon />
      <div
        className={classNames('', {
          'bg-blue-150 rounded-full w-5 h-5 items-center justify-center flex': activeStep === 1,
          'border border-grey-150 rounded-full w-5 h-5 items-center justify-center flex':
            activeStep === 0,
        })}>
        <div
          className={classNames('', {
            'text-xs font-medium text-grey-100': activeStep === 0,
            'text-xs font-medium text-white-50': activeStep === 1,
          })}>
          2
        </div>
      </div>
      <div className="text-sm font-normal text-grey-100">Social Links</div>
    </div>
  );
};

export default StepHeader;
