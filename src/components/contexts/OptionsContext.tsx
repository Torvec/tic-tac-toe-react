import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

export type Mode = "classic" | "ultimate" | undefined;

export type Opponent = "pvp" | "pvc" | undefined;

type OptionsContextType = {
  gameMode: Mode;
  setGameMode: Dispatch<SetStateAction<Mode>>;
  opponent: Opponent;
  setOpponent: Dispatch<SetStateAction<Opponent>>;
};

type OptionsProviderProps = {
  children: ReactNode;
};

export const OptionsContext = createContext<OptionsContextType | undefined>(
  undefined,
);

export const OptionsProvider = ({ children }: OptionsProviderProps) => {
  const [gameMode, setGameMode] = useState<Mode>(undefined);
  const [opponent, setOpponent] = useState<Opponent>(undefined);

  return (
    <OptionsContext.Provider
      value={{
        gameMode,
        setGameMode,
        opponent,
        setOpponent,
      }}
    >
      {children}
    </OptionsContext.Provider>
  );
};
