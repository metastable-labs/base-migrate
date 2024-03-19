import React from 'react';
import { useAccount } from 'wagmi';
import { motion } from 'framer-motion';

import classNames from 'classnames';
import { ClickAnimation } from './types';

const ClickAnimation = ({ children, onClick, classes }: ClickAnimation) => {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.9 }}
      className={classNames(classes, 'cursor-pointer')}>
      {children}
    </motion.div>
  );
};

export default ClickAnimation;
