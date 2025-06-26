import useGameStateContext from "./use-game-state-context";
import calculateWinner from "../../utils/calculate-winner";

export default function useHandleClick() {
  const { state, dispatch } = useGameStateContext();
  const { gridState, cellValues, currentPlayer, currentScreen } = state;

  return (gridIndex: number, cellIndex: number) => {
    // Prevent changing cell value if it is already occupied by X or O
    if (cellValues[gridIndex][cellIndex] !== "") return;

    // Change the cell value to X or O at (gridIndex, cellIndex)
    const newCellValues = cellValues.map((grid, i) => {
      if (i === gridIndex) {
        return grid.map((cell, j) => (j === cellIndex ? currentPlayer : cell));
      }
      return grid;
    });

    dispatch({ type: "setCellValues", payload: newCellValues });

    const winner = {
      X: "wonX",
      O: "wonO",
    } as const; // treats the values as literal types instead of string types

    const isGridWon = calculateWinner(newCellValues[gridIndex]);
    const isGridDraw = newCellValues[gridIndex].every((cell) => cell !== "");

    const nextGridState = [...state.gridState];
    if (isGridWon) {
      nextGridState[gridIndex] = winner[currentPlayer];
    }
    if (isGridDraw) {
      nextGridState[gridIndex] = "draw";
    }

    if (currentScreen === "ultimate") {
      const nextState = nextGridState[cellIndex];
      if (
        nextState === "draw" ||
        nextState === "wonO" ||
        nextState === "wonX"
      ) {
        nextGridState.forEach((g, i) => {
          if (g !== "wonX" && g !== "wonO" && g !== "draw") {
            dispatch({
              type: "setGridState",
              payload: { gridIndex: i, state: "enabled" },
            });
          }
        });
      } else {
        nextGridState.forEach((g, i) => {
          if (i !== cellIndex && g !== "wonX" && g !== "wonO" && g !== "draw") {
            dispatch({
              type: "setGridState",
              payload: { gridIndex: i, state: "disabled" },
            });
          }
        });
        if (nextState === "enabled" || nextState === "disabled") {
          dispatch({
            type: "setGridState",
            payload: { gridIndex: cellIndex, state: "enabled" },
          });
        }
      }
    }

    const gridWinners = gridState.map((state) => {
      if (state === "wonX") return "X";
      if (state === "wonO") return "O";
      return "";
    });

    const isBoardWon = calculateWinner(gridWinners);
    const isBoardDraw = newCellValues.every((grid) =>
      grid.every((cell) => cell !== ""),
    );

    if (isGridWon) {
      if (currentScreen === "classic") {
        dispatch({ type: "setBoardState", payload: winner[currentPlayer] });
        return;
      }
      dispatch({
        type: "setGridState",
        payload: { gridIndex, state: winner[currentPlayer] },
      });
      console.log(gridIndex + " winner: " + currentPlayer);
    }

    if (isGridDraw) {
      dispatch({ type: "setGridState", payload: { gridIndex, state: "draw" } });
      console.log(gridIndex + " draw");
    }

    if (isBoardWon) {
      dispatch({ type: "setBoardState", payload: winner[currentPlayer] });
    }

    if (isBoardDraw) {
      dispatch({ type: "setBoardState", payload: "draw" });
    }

    dispatch({
      type: "setCurrentPlayer",
      payload: currentPlayer === "X" ? "O" : "X",
    });
  };
}
