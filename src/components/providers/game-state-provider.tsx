import { useReducer } from "react";
import { GameStateContext } from "../contexts/game-state-context";
import {
  type State,
  type Action,
  type Grid,
  type Cell,
  type GameMode,
} from "../../types";

const setInitCellValues: Record<GameMode, Cell[][]> = {
  classic: [Array(9).fill("")],
  ultimate: Array.from({ length: 9 }, () => Array(9).fill("")),
};

const setInitGridState: Record<GameMode, Grid[]> = {
  classic: ["enabled"],
  ultimate: Array(9)
    .fill("disabled")
    .map((state, i) => (i === 4 ? "enabled" : state)),
};

const initState: State = {
  currentScreen: "select",
  currentPlayer: "X",
  boardState: "play",
  gridState: [],
  cellValues: [],
};

const updateGridState = (
  gridState: Grid[],
  gridIndex: number,
  newState: Grid,
): Grid[] => {
  return gridState.map((g, i) => (i === gridIndex ? newState : g));
};

function gameStateReducer(state: State, action: Action): State {
  const { currentScreen, gridState } = state;
  switch (action.type) {
    case "setCurrentScreen":
      return {
        ...state,
        currentScreen: action.payload,
        gridState: setInitGridState[action.payload as GameMode],
        cellValues: setInitCellValues[action.payload as GameMode],
      };
    case "setCurrentPlayer":
      return { ...state, currentPlayer: action.payload };
    case "setCellValues":
      return { ...state, cellValues: action.payload };
    case "setGridState":
      return {
        ...state,
        gridState: updateGridState(
          gridState,
          action.payload.gridIndex,
          action.payload.state,
        ),
      };
    case "setBoardState":
      return { ...state, boardState: action.payload };
    case "triggerReset":
      return {
        ...state,
        currentPlayer: "X",
        boardState: "play",
        gridState: setInitGridState[currentScreen as GameMode],
        cellValues: setInitCellValues[currentScreen as GameMode],
      };
  }
}

export default function GameStateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(gameStateReducer, initState);

  return (
    <GameStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GameStateContext.Provider>
  );
}
