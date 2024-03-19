import { Button } from "@/components";
import { GithubIcon, SmallGithubIcon } from "../../../public/icons";

const ConnectGithub = () => {
  return (
    <div className="w-[80%] md:w-[376px] p-6 rounded-xl border border-black-200 flex flex-col justify-center items-center gap-6">
      <GithubIcon />
      <div className="font-medium text-sm md:text-base text-black-250">
        Connect Github
      </div>
      <p className="text-black-300 text-sm md:text-base leading-5 lg:leading-7 text-center">
        The github account connected will be used to fork and create a pr on the
        Superchain token list repo.
      </p>
      <Button
        variant="secondary"
        onClick={() => {}}
        text="Connect github"
        icon={<SmallGithubIcon />}
      />
    </div>
  );
};

export default ConnectGithub;
