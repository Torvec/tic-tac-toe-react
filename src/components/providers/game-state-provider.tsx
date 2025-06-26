import { ReactNode, useReducer } from "react";
import { GameStateContext } from "../contexts/game-state-context";
import { type State, type Action, type Grid } from "../../types";

const setInitCellValues = {
  classic: [Array(9).fill("")],
  ultimate: Array.from({ length: 9 }, () => Array(9).fill("")),
};

const setInitGridState: Record<string, Grid[]> = {
  classic: ["enabled"],
  ultimate: [
    "disabled",
    "disabled",
    "disabled",
    "disabled",
    "enabled",
    "disabled",
    "disabled",
    "disabled",
    "disabled",
  ],
};

function gameStateReducer(state: State, action: Action): State {
  switch (action.type) {
    case "setCurrentScreen":
      return {
        ...state,
        currentScreen: action.payload,
        cellValues:
          setInitCellValues[action.payload as keyof typeof setInitCellValues],
        gridState:
          setInitGridState[action.payload as keyof typeof setInitGridState],
      };
    case "setCurrentPlayer":
      return { ...state, currentPlayer: action.payload };
    case "setCellValues":
      return { ...state, cellValues: action.payload };
    case "setGridState":
      return {
        ...state,
        gridState: state.gridState.map((g, i) =>
          i === action.payload.gridIndex ? action.payload.state : g,
        ),
      };
    case "setBoardState":
      return { ...state, boardState: action.payload };
    case "triggerReset":
      return {
        ...state,
        currentPlayer: "X",
        gridState:
          setInitGridState[
            state.currentScreen as keyof typeof setInitGridState
          ],
        boardState: "play",
        cellValues:
          setInitCellValues[
            state.currentScreen as keyof typeof setInitCellValues
          ],
      };
  }
}

const initialState: State = {
  currentScreen: "select",
  currentPlayer: "X",
  cellValues: [],
  gridState: [],
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
