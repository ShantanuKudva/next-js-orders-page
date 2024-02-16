import React from "react";
import Image from "next/image";
import logo from "@/components/images/nivetti-systems-logo.png";
import { ModeToggle } from "../theme-button";
import { Button } from "./button";

function Navbar() {
  return (
    <nav className="flex items-center justify-between p-2 m-2">
      <Image src={logo} height={100} width={100} alt="logo" />
      <div className="flex items-center justify-center gap-2">
        <Button>Sign In</Button>
        <ModeToggle />
      </div>
    </nav>
  );
}

export default Navbar;
