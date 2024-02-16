import React from "react";
import Image from "next/image";
import logo from "@/components/images/nivetti-systems-logo.png";
import { ModeToggle } from "@/components/theme-button";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/ui/navbar";

//@ts-ignore
function Layout({ children }) {
  return (
    <main className="">
      <Navbar />
      <div className="m-2">{children}</div>
    </main>
  );
}

export default Layout;
