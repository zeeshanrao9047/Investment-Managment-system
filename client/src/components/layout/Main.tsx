import { CommonContext } from "@/context/Contextprovider";
import React, { ReactNode, useContext } from "react";

interface MainProps {
  children: ReactNode;
}
export default function Main({ children }:MainProps) {
      const context = useContext(CommonContext);
      if (!context) {
        throw new Error("CommonContext must be used inside ContextProvider");
      }
  const { sidemenu, setSidemenu } = context;

  return (
    <>
      <main className={`${sidemenu ? " max-w-full p-3 md:p-5 mt-[65px] lg:mt-0 transition-all duration-100  ease-in-out":"transition-all duration-100  ease-in-out max-w-full p-5"} `}>
        {children}
      </main>
    </>
  );
}
