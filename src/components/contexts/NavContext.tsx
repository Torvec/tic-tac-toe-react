import { createContext, useState, ReactNode } from "react";

type Page = "mode" | "opponent" | "howToPlay" | "game";

type NavContextType = {
  currentPage: Page;
  setCurrentPage: React.Dispatch<React.SetStateAction<Page>>;
};

type NavProviderProps = {
  children: ReactNode;
};

export const NavContext = createContext<NavContextType | undefined>(undefined);

export const NavProvider = ({ children }: NavProviderProps) => {
  const [currentPage, setCurrentPage] = useState<Page>("mode");

  return (
    <NavContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </NavContext.Provider>
  );
};
