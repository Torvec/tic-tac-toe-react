import { ReactNode, useReducer } from "react";
import { GameStateContext } from "../contexts/game-state-context";
import { type State, type Action } from "../../types";

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

const initialState: State = {
  currentScreen: "gameModeSelect",
  gameMode: "",
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