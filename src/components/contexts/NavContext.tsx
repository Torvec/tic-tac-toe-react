import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

type Page = "mode" | "howToPlay" | "game";

type NavContextType = {
  currentPage: Page;
  setCurrentPage: Dispatch<SetStateAction<Page>>;
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
