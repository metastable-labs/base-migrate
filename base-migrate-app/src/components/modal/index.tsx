import classNames from "classnames";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { Modal } from "./types";

const Modal = ({ close, children }: Modal) => {
  useEffect(() => {
    // Add no-scroll class to body when the modal opens
    document.body.classList.add("no-scroll");

    // Remove no-scroll class when the modal closes
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center h-screen"
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="z-10 absolute w-full h-full bg-black-100 bg-opacity-85 backdrop-blur-[0.8px]"
      />
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className={classNames(
          "z-50 max-h-[65%] overflow-y-auto bg-white-50 border border-white-200 shadow-wide-box p-3 lg:p-6 w-[72%] xl:w-[552px] rounded-xl"
        )}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default Modal;
