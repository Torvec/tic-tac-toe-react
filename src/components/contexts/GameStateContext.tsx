import { createContext, ReactNode, Dispatch, useReducer } from "react";

// All possible types for each game state except for Game Cells

type Screen = "gameModeSelect" | "howToPlay" | "game";
type GameMode = "classic" | "ultimate" | undefined;
type Player = "X" | "O";
type GameGrid = "active" | "inactive" | "X" | "O" | "draw";
type GameBoard = "play" | "Won" | "Draw";

// Game State Context

type GameStateContextType = {
  state: State;
  dispatch: Dispatch<Action>;
};

export const GameStateContext = createContext<GameStateContextType | undefined>(
  undefined,
);

// Game State Reducer

type State = {
  currentScreen: Screen;
  gameMode: GameMode;
  currentPlayer: Player;
  gameGridState: GameGrid;
  gameBoardState: GameBoard;
  reset: boolean;
};

type Action =
  | { type: "setCurrentScreen"; payload: Screen }
  | { type: "setGameMode"; payload: GameMode }
  | { type: "setCurrentPlayer"; payload: Player }
  | { type: "setGridState"; payload: GameGrid }
  | { type: "setGameBoardState"; payload: GameBoard }
  | { type: "triggerReset" }
  | { type: "completeReset" };

function gameStateReducer(state: State, action: Action): State {
  switch (action.type) {
    case "setCurrentScreen":
      return { ...state, currentScreen: action.payload };
    case "setGameMode":
      return { ...state, gameMode: action.payload };
    case "setCurrentPlayer":
      return { ...state, currentPlayer: action.payload };
    case "setGridState":
      return { ...state, gameGridState: action.payload };
    case "setGameBoardState":
      return { ...state, gameBoardState: action.payload };
    case "triggerReset":
      return {
        ...state,
        reset: true,
        currentPlayer: "X",
        gameGridState: "active",
        gameBoardState: "play",
      };
    case "completeReset":
      return { ...state, reset: false };
  }
}

// Game State Provider

type GameStateProviderProps = {
  children: ReactNode;
};

const initialState: State = {
  currentScreen: "gameModeSelect",
  gameMode: undefined,
  currentPlayer: "X",
  gameGridState: "active",
  gameBoardState: "play",
  reset: false,
};

export function GameStateProvider({ children }: GameStateProviderProps) {
  const [state, dispatch] = useReducer(gameStateReducer, initialState);

  return (
    <GameStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GameStateContext.Provider>
  );
}
