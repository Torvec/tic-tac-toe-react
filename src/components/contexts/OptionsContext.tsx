import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

export type Mode = "classic" | "ultimate" | undefined;

type OptionsContextType = {
  gameMode: Mode;
  setGameMode: Dispatch<SetStateAction<Mode>>;
};

type OptionsProviderProps = {
  children: ReactNode;
};

export const OptionsContext = createContext<OptionsContextType | undefined>(
  undefined,
);

export const OptionsProvider = ({ children }: OptionsProviderProps) => {
  const [gameMode, setGameMode] = useState<Mode>(undefined);

  return (
    <OptionsContext.Provider
      value={{
        gameMode,
        setGameMode,
      }}
    >
      {children}
    </OptionsContext.Provider>
  );
};
