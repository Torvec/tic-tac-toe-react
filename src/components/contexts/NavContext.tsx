import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

type Screen = "gameModeSelect" | "howToPlay" | "game";

type NavContextType = {
  currentScreen: Screen;
  setCurrentScreen: Dispatch<SetStateAction<Screen>>;
};

type NavProviderProps = {
  children: ReactNode;
};

export const NavContext = createContext<NavContextType | undefined>(undefined);

export const NavProvider = ({ children }: NavProviderProps) => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("gameModeSelect");

  return (
    <NavContext.Provider value={{ currentScreen, setCurrentScreen }}>
      {children}
    </NavContext.Provider>
  );
};
