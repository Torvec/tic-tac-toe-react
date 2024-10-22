import useGameStateContext from "../hooks/useGameStateContext";
import Grid from "./Grid";

export default function Board() {
  const { state, dispatch } = useGameStateContext();
  const { gameMode, cellValues, currentPlayer } = state;

  const handleClick = (gridIndex: number, cellIndex: number) => {
    if (cellValues[gridIndex][cellIndex] !== " ") return;
    
    const newCellValues = cellValues.map((grid, i) => {
      if (i === gridIndex) {
        return grid.map((cell, j) => (j === cellIndex ? currentPlayer : cell));
      }
      return grid;
    });

    dispatch({ type: "setCellValues", payload: newCellValues });
    dispatch({
      type: "setCurrentPlayer",
      payload: currentPlayer === "X" ? "O" : "X",
    });
  };

  const board = [];
  const numOfGrids = gameMode === "classic" ? 1 : 9;
  for (let i = 0; i < numOfGrids; i++) {
    board.push(
      <Grid
        key={i}
        gridIndex={i}
        cellValues={cellValues[i]}
        onCellClick={handleClick}
      />,
    );
  }

  const className =
    gameMode === "classic"
      ? "p-4 h-full"
      : "h-full grid grid-cols-3 grid-rows-3 gap-8 p-4";

  return (
    <div className="mx-auto mb-8 aspect-square h-auto w-3/4 rounded-xl bg-neutral-600">
      <div className={className}>{board}</div>
    </div>
  );
}
