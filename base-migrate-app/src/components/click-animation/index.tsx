import React from 'react';
import { motion } from 'framer-motion';

import classNames from 'classnames';
import { ClickAnimationType } from './types';

const ClickAnimation = ({ children, onClick, classes }: ClickAnimationType) => {
  return (
    <motion.div
      role="button"
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.9 }}
      className={classNames(classes, 'cursor-pointer')}>
      {children}
    </motion.div>
  );
};

export default ClickAnimation;
