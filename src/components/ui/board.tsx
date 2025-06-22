import useGameStateContext from "../hooks/use-game-state-context";
import Grid from "./grid";

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

  let board: JSX.Element[] = [];
  const numOfGrids = gameMode === "classic" ? 1 : 9;
  for (let i = 0; i < numOfGrids; i++) {
    board = [
      ...board,
      <Grid
        key={i}
        gridIndex={i}
        cellValues={cellValues[i]}
        onCellClick={handleClick}
      />,
    ];
  }

  const className =
    gameMode === "classic"
      ? "p-4 h-full"
      : "h-full grid grid-cols-3 grid-rows-3 gap-8 p-4";

  return (
    <div className="mx-auto mb-8 aspect-square h-auto max-w-5xl w-full rounded-xl bg-neutral-600">
      <div className={className}>{board}</div>
    </div>
  );
}
