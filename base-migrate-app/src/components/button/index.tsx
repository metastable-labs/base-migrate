"use client";
import { motion } from "framer-motion";
import classNames from "classnames";

import { Button } from "./types";

const Button = ({
  onClick,
  text,
  type = "button",
  disabled,
  loading,
  icon,
}: Button) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.9 }}
      transition={{ ease: "backOut" }}
      className={classNames(
        "h-10 lg:h-12 rounded-[92px] px-4 md:px-6 flex items-center justify-center text-white-50 text-sm lg:text-lg bg-blue-50 border-[1.28px] border-blue-100",
        {
          "pointer-events-none": loading || disabled,
        }
      )}
      disabled={disabled}
      type={type}
    >
      <div>{loading ? "Loading..." : text}</div>

      {icon && icon}
    </motion.button>
  );
};

export default Button;
