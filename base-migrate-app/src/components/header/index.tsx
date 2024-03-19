"use client";

import { Button, Container } from "..";
import { Logo } from "../../../public/icons";

const Header = () => {
  return (
    <Container classes="border-b border-white-150">
      <header className="h-[11vh] flex items-center">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Logo />
            <div className="text-sm lg:text-xl text-black-100 font-medium">
              Base Migrate
            </div>
          </div>
          <Button onClick={() => null} text="Migrate to base" />
        </div>
      </header>
    </Container>
  );
};

export default Header;
