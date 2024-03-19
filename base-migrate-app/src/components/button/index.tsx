'use client';
import React from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';

import { ButtonType } from './types';

const Button = ({
  onClick,
  text,
  type = 'button',
  disabled,
  loading,
  icon,
  variant = 'primary',
}: ButtonType) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.9 }}
      transition={{ ease: 'backOut' }}
      className={classNames(
        'h-10 lg:h-12 rounded-[92px] flex items-center justify-center text-white-50 text-sm lg:text-lg bg-blue-50 border-[1.28px] border-blue-100 gap-2',
        {
          'pointer-events-none': loading || disabled,
          'px-4 md:px-6': variant === 'primary',
          'px-12 md:px-16': variant === 'secondary',
          'max-w-[504px] self-stretch': variant === 'tertiary',
        },
      )}
      disabled={disabled}
      type={type}>
      <div>{loading ? 'Loading...' : text}</div>

      {icon && icon}
    </motion.button>
  );
};

export default Button;
