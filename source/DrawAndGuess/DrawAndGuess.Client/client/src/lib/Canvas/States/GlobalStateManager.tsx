import { GlobalStateManagerType } from "@/lib/Canvas/Types/GlobalStateManagerType";
import { createContext, useState } from "react";

const GlobalStateContext = createContext({} as GlobalStateManagerType);

interface GlobalStateProviderProps {
  children: React.ReactNode;
}

export const GlobalStateProvider: React.FC<GlobalStateProviderProps> = ({
  children,
}) => {
  const [isAdmin, setIsAdmin] = useState(false);
  return (
    <GlobalStateContext.Provider value={{
      isAdmin,
      setIsAdmin
    }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
