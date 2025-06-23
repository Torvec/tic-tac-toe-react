import { ReactNode, useReducer } from "react";
import { GameStateContext } from "../contexts/game-state-context";
import { type State, type Action } from "../../types";

function getInitialCellValues(gameMode: "classic" | "ultimate" | null) {
  if (gameMode === "classic") {
    return [Array(9).fill(null)]; // 1 Grid x 9 Cells
  }
  return Array.from({ length: 9 }, () => Array(9).fill(null)); // 9 Grids x 9 Cells
}

function gameStateReducer(state: State, action: Action): State {
  switch (action.type) {
    case "setCurrentScreen":
      return { ...state, currentScreen: action.payload };
    case "setGameMode":
      return {
        ...state,
        gameMode: action.payload,
        cellValues: getInitialCellValues(action.payload),
      };
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
        gridState: "enabled",
        boardState: "play",
        cellValues: getInitialCellValues(state.gameMode),
      };
    case "completeReset":
      return { ...state, reset: false };
  }
}

const initialState: State = {
  currentScreen: "select",
  gameMode: null,
  currentPlayer: "X",
  cellValues: [],
  gridState: "enabled",
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
