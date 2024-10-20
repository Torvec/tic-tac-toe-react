import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

type Player = "X" | "O" | undefined;

type GameGrid = "active" | "inactive" | "X" | "O" | "draw";

type GameBoard = "play" | "Won" | "Draw";

type GameContextType = {
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

type GameProviderProps = {
  children: ReactNode;
};

export const GameContext = createContext<GameContextType | undefined>(
  undefined,
);

export const GameProvider = ({ children }: GameProviderProps) => {
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
    <GameContext.Provider
      value={{
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
    </GameContext.Provider>
  );
};
