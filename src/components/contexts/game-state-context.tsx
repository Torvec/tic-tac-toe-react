import { createContext, ReactNode, useReducer } from "react";
import { type GameStateContextType, type State, type Action } from "../../types";

export const GameStateContext = createContext<GameStateContextType | undefined>(
  undefined,
);

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

const initialState: State = {
  currentScreen: "gameModeSelect",
  gameMode: undefined,
  currentPlayer: "X",
  cellValues: Array.from({ length: 9 }, () => Array(9).fill(" ")),
  gridState: "active",
  boardState: "play",
  reset: false,
};

export function GameStateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameStateReducer, initialState);

  return (
    <GameStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GameStateContext.Provider>
  );
}
