import useGameStateContext from "./use-game-state-context";
import calculateWinner from "../../utils/calculate-winner";

export default function useHandleClick() {
  const { state, dispatch } = useGameStateContext();
  const { cellValues, currentPlayer } = state;

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

    const isGridWon = calculateWinner(newCellValues[gridIndex]);
    const winner = {
      X: "wonX",
      O: "wonO",
    } as const; // treats the values as literal types instead of string types
    const isGridDraw = newCellValues.every((grid) =>
      grid.every((cell) => cell !== ""),
    );

    if (isGridWon) {
      dispatch({ type: "setGridState", payload: winner[currentPlayer] });
      console.log("winner: " + currentPlayer);
    } else if (isGridDraw) {
      dispatch({ type: "setGridState", payload: "draw" });
      console.log("draw");
    } else {
      dispatch({
        type: "setCurrentPlayer",
        payload: currentPlayer === "X" ? "O" : "X",
      });
    }

    // Check if winning conditon is met for that grid

    // Check if draw condition is met for that grid

    // Check if winning condition is met for game board

    // Check if draw condition is met for game board
  };
}
