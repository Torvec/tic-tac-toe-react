import { ReactNode, useReducer } from "react";
import { GameStateContext } from "../contexts/game-state-context";
import { type State, type Action, type Screen } from "../../types";

function getInitialCellValues(currentScreen: Screen) {
  if (currentScreen === "classic") {
    return [Array(9).fill("")]; // 1 Grid x 9 Cells
  } else if (currentScreen === "ultimate") {
    return Array.from({ length: 9 }, () => Array(9).fill("")); // 9 Grids x 9 Cells
  } else {
    return [];
  }
}

function gameStateReducer(state: State, action: Action): State {
  switch (action.type) {
    case "setCurrentScreen":
      return {
        ...state,
        currentScreen: action.payload,
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
        currentPlayer: "X",
        gridState: "enabled",
        boardState: "play",
        cellValues: getInitialCellValues(state.currentScreen),
      };
  }
}

const initialState: State = {
  currentScreen: "select",
  currentPlayer: "X",
  cellValues: [],
  gridState: "enabled",
  boardState: "play",
};

export function GameStateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameStateReducer, initialState);

  return (
    <GameStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GameStateContext.Provider>
  );
}
