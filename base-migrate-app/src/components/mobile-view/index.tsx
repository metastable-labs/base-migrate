import { MobileViewIcon } from '../../../public/icons';

const MobileView = () => {
  return (
    <div className="lg:hidden min-h-[89vh] flex justify-center items-center bg-blue-200">
      <div className="p-6 border border-black-200 rounded-xl flex flex-col items-center justify-center bg-white-50 w-full mx-6">
        <MobileViewIcon />

        <div className="mt-14 font-medium text-xl text-center text-black-250">
          Please switch to Desktop
        </div>
        <p className="text-lg leading-[27.9px] text-center text-black-150 mt-4 mx-5 pb-8">
          For the best experience, please use your desktop to continue{' '}
        </p>
      </div>
    </div>
  );
};

export default MobileView;
