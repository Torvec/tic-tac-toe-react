import { createContext, ReactNode, Dispatch, useReducer } from "react";

// All possible types for each game state except for Game Cells

type Screen = "gameModeSelect" | "howToPlay" | "game";
type GameMode = "classic" | "ultimate" | undefined;
type Player = "X" | "O";
type Cell = "X" | "O" | " ";
type Grid = "active" | "inactive" | "X" | "O" | "draw";
type Board = "play" | "xWon" | "oWon" | "Draw";

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
  cellValues: Cell[][];
  gridState: Grid;
  boardState: Board;
  reset: boolean;
};

type Action =
  | { type: "setCurrentScreen"; payload: Screen }
  | { type: "setGameMode"; payload: GameMode }
  | { type: "setCurrentPlayer"; payload: Player }
  | { type: "setCellValues"; payload: Cell[][] }
  | { type: "setGridState"; payload: Grid }
  | { type: "setBoardState"; payload: Board }
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
    case "setCellValues":
      return { ...state, cellValues: action.payload };
    case "setGridState":
      return { ...state, gridState: action.payload };
    case "setBoardState":
      return { ...state, boardState: action.payload };
    case "triggerReset":
      return {
        ...state,
        reset: true,
        currentPlayer: "X",
        gridState: "active",
        boardState: "play",
        cellValues: Array.from({ length: 9 }, () => Array(9).fill(" ")),
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
  cellValues: Array.from({ length: 9 }, () => Array(9).fill(" ")),
  gridState: "active",
  boardState: "play",
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
