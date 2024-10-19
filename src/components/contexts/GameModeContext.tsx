import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

export type GameMode = "classic" | "ultimate" | undefined;

type GameModeContextType = {
  gameMode: GameMode;
  setGameMode: Dispatch<SetStateAction<GameMode>>;
};

type GameModeProviderProps = {
  children: ReactNode;
};

export const GameModeContext = createContext<GameModeContextType | undefined>(
  undefined,
);

export const GameModeProvider = ({ children }: GameModeProviderProps) => {
  const [gameMode, setGameMode] = useState<GameMode>(undefined);

  return (
    <GameModeContext.Provider
      value={{
        gameMode,
        setGameMode,
      }}
    >
      {children}
    </GameModeContext.Provider>
  );
};
