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
        'h-10 lg:h-12 rounded-lg flex items-center justify-center text-sm lg:text-lg border-[1.28px] gap-2',
        {
          'bg-blue-50 border-blue-100 text-white-50': !disabled,
          'bg-gray-50 text-zinc-400 text-sm leading-5': disabled,
          'pointer-events-none': loading || disabled,
          'px-4 md:px-6': variant === 'primary',
          'px-12 md:px-24 font-medium': variant === 'secondary',
          'max-w-[504px] self-stretch': variant === 'tertiary',
        },
      )}
      disabled={disabled}
      type={type}>
      <div className="text-sm">{loading ? 'Loading...' : text}</div>

      {icon && !loading && icon}

      {loading && (
        <div className="animate-spin">
          <div className="h-4 w-4 border-2 border-dashed border-white-50 rounded-full"></div>
        </div>
      )}
    </motion.button>
  );
};

export default Button;
