import React, { createContext, ReactNode, useState } from "react";

// 1. Define type for context value
interface CommonContextType {
  sidemenu: boolean;
  setSidemenu: React.Dispatch<React.SetStateAction<boolean>>;
  mobilemenu: boolean;
  setMobilemenu: React.Dispatch<React.SetStateAction<boolean>>;
}

// 2. Create context with default (undefined, will be overridden in provider)
export const CommonContext = createContext<CommonContextType | undefined>(
  undefined
);

// 3. Props for provider
interface ContextProviderProps {
  children: ReactNode;
}

// 4. Provider with state
export default function ContextProvider({ children }: ContextProviderProps) {
  const [sidemenu, setSidemenu] = useState(true);
  const [mobilemenu, setMobilemenu] = useState(true);

  return (
    <CommonContext.Provider
      value={{ sidemenu, setSidemenu, mobilemenu, setMobilemenu }}
    >
      {children}
    </CommonContext.Provider>
  );
}
