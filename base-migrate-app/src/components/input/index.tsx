/* eslint-disable @typescript-eslint/no-unused-vars */
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { InputType } from './types';

const Input = (props: InputType) => {
  const { type, disabled, label, name, placeholder, valid, value, onChange, error } = props;

  const [valueText, setValue] = useState('');

  const handleOnChange = (value: string) => {
    if (value.length === 0) {
      setValue('');
      onChange && onChange('');
      return;
    }

    // Check if the input is a valid number (without decimals)
    const isNumberMatch = value.match(/^\d+$/);

    if (isNumberMatch && isNaN(Number(value))) return;

    // Check if the input is a valid Ethereum wallet address
    const isAddressMatch = value.match(/^0x[a-fA-F0-9]{40}$/);

    if (isNumberMatch || isAddressMatch) {
      setValue(value);
      onChange && onChange(value);
      return;
    }

    // Allow any text input
    setValue(value);
    onChange && onChange(value);
  };

  return (
    <div className="max-w-lg mx-auto py-6 px-3">
      <label htmlFor={name} className="block text-sm font-medium text-black-250">
        {label}
      </label>
      <div className="mt-3.5">
        <input
          id={name}
          type={type}
          disabled={disabled}
          placeholder={placeholder}
          value={value || valueText}
          className="justify-center text-black-250 w-full items-start self-stretch px-6 py-3.5 text-sm leading-5 bg-gray-50 rounded-lg border border-solid border-zinc-200 max-w-[504px] outline outline-blue-50 max-md:px-5"
          onChange={(e) => handleOnChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Input;
