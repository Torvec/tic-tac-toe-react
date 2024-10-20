import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

type Screen = "gameModeSelect" | "howToPlay" | "game";

type GameMode = "classic" | "ultimate" | undefined;

type Player = "X" | "O" | undefined;

type GameGrid = "active" | "inactive" | "X" | "O" | "draw";

type GameBoard = "play" | "Won" | "Draw";

type GameStateContextType = {
  currentScreen: Screen;
  setCurrentScreen: Dispatch<SetStateAction<Screen>>;
  gameMode: GameMode;
  setGameMode: Dispatch<SetStateAction<GameMode>>;
  currentPlayer: Player;
  setCurrentPlayer: Dispatch<SetStateAction<Player>>;
  gameGridState: GameGrid;
  setGameGridState: Dispatch<SetStateAction<GameGrid>>;
  gameBoardState: GameBoard;
  setGameBoardState: Dispatch<SetStateAction<GameBoard>>;
  reset: boolean;
  triggerReset: () => void;
  completeReset: () => void;
};

type GameStateProviderProps = {
  children: ReactNode;
};

export const GameStateContext = createContext<GameStateContextType | undefined>(
  undefined,
);

export const GameStateProvider = ({ children }: GameStateProviderProps) => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("gameModeSelect");
  const [gameMode, setGameMode] = useState<GameMode>(undefined);
  const [currentPlayer, setCurrentPlayer] = useState<Player>(undefined);
  const [gameGridState, setGameGridState] = useState<GameGrid>("active");
  const [gameBoardState, setGameBoardState] = useState<GameBoard>("play");
  const [reset, setReset] = useState(false);
  const triggerReset = () => {
    setReset(true);
    setCurrentPlayer("X");
    setGameGridState("active");
    setGameBoardState("play");
  };
  const completeReset = () => {
    setReset(false);
  };

  return (
    <GameStateContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        gameMode,
        setGameMode,
        currentPlayer,
        setCurrentPlayer,
        gameGridState,
        setGameGridState,
        gameBoardState,
        setGameBoardState,
        reset,
        triggerReset,
        completeReset,
      }}
    >
      {children}
    </GameStateContext.Provider>
  );
};
