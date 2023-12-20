import React from "react";
import { Nav } from "@/components/header/Menu";
import { ModeToggle } from "@/components/theme/ModeToggle";

const Header = () => {
  return (
    <div className="flex justify-between border-b px-4 h-16 items-center ">

      <div className=" text-lg lg:text-2xl font-bold">🌊 Springshed</div>
      <Nav />
      <ModeToggle />
    </div>
  );
};

export default Header;
