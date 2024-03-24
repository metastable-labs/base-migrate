import { motion } from 'framer-motion';
import { CancelIcon, DisconnectIcon } from '../../../public/icons';
import { ClickAnimation } from '..';

interface IMenu {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const MenuComponent = ({ isOpen, setIsOpen }: IMenu) => {
  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: '100%' },
  };

  return (
    <motion.div
      initial="closed"
      animate={isOpen ? 'open' : 'closed'}
      variants={variants}
      transition={{
        duration: 1,
        // ease: "anticipate",
        type: 'spring',
        stiffness: 60,
      }}
      className="fixed inset-0 bg-white-50 z-50 min-h-screen flex flex-col justify-between w-full py-10 px-6">
      <div>
        <div className="flex justify-between items-center">
          <h4 className="text-3xl font-bold text-grey-700">Menu</h4>
          <ClickAnimation onClick={() => setIsOpen(false)}>
            <CancelIcon />
          </ClickAnimation>
        </div>
      </div>

      <ClickAnimation
        classes="bg-white-50 p-5 md:p-7 rounded-xl flex flex-col gap-7 border border-grey-200"
        onClick={() => setIsOpen(false)}>
        <DisconnectIcon />
      </ClickAnimation>
    </motion.div>
  );
};

export default MenuComponent;
