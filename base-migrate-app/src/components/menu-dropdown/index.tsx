/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import React, { memo } from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';

const MenuDropdown = ({
  onClick,
  classes,
  children,
}: {
  onClick: () => void;
  classes?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center h-screen">
      <div onClick={onClick} className="z-10 absolute w-full h-full bg-transparent" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className={classNames(
          'absolute z-50 right-11 md:right-60 top-[72px] md:top-28 min-w-[220px]',
          classes,
        )}>
        <div className="bg-white-50 p-5 md:p-7 rounded-xl border border-grey-200">{children}</div>
      </motion.div>
    </div>
  );
};

export default memo(MenuDropdown);
