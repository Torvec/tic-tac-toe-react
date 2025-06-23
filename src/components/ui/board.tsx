import useGameStateContext from "../hooks/use-game-state-context";
import calculateWinner from "../../utils/calculate-winner";
import { type GridProps, type CellProps } from "../../types";

export default function Board() {
  const { state, dispatch } = useGameStateContext();
  const { gameMode, cellValues, currentPlayer, gridState, boardState } = state;

  const handleClick = (gridIndex: number, cellIndex: number) => {
    if (cellValues[gridIndex][cellIndex] !== null) return;

    const newCellValues = cellValues.map((grid, i) => {
      if (i === gridIndex) {
        return grid.map((cell, j) => (j === cellIndex ? currentPlayer : cell));
      }
      return grid;
    });

    dispatch({ type: "setCellValues", payload: newCellValues });

    const winner = calculateWinner(newCellValues[gridIndex]);

    if (winner) {
      dispatch({ type: "setGridState", payload: { won: currentPlayer } });
      dispatch({ type: "setBoardState", payload: { won: currentPlayer } });
      console.log(currentPlayer);
    } else if (
      newCellValues.every((grid) => grid.every((cell) => cell !== null))
    ) {
      dispatch({ type: "setGridState", payload: "draw" });
      dispatch({ type: "setBoardState", payload: "draw" });
      console.log("draw");
    } else {
      dispatch({
        type: "setCurrentPlayer",
        payload: currentPlayer === "X" ? "O" : "X",
      });
    }
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
        gridState={gridState}
        boardState={boardState}
      />,
    ];
  }

  const styleClasses =
    gameMode === "classic"
      ? "p-4 h-full"
      : "h-full grid grid-cols-3 grid-rows-3 gap-8 p-4";

  return (
    <div className="mx-auto mb-8 aspect-square h-auto w-full max-w-5xl rounded-xl bg-neutral-400">
      <div className={styleClasses}>{board}</div>
    </div>
  );
}

const Grid = ({
  gridIndex,
  cellValues,
  onCellClick,
  gridState,
  boardState,
}: GridProps) => {
  const grid = cellValues.map((cellValue, i) => (
    <Cell
      key={i}
      cellValue={cellValue}
      onCellClick={() => onCellClick(gridIndex, i)}
      gridState={gridState}
      boardState={boardState}
    />
  ));

  return (
    <div className="grid h-full grid-cols-3 grid-rows-3 gap-4">{grid}</div>
  );
};

const Cell = ({ cellValue, onCellClick, gridState, boardState }: CellProps) => {
  const styleClasses = {
    null: "bg-neutral-500 hover:bg-neutral-300",
    X: "bg-blue-600 hover:bg-blue-400",
    O: "bg-red-600 hover:bg-red-400",
  };

  return (
    <button
      className={`cursor-pointer place-content-center rounded-2xl text-center font-mono text-8xl font-black transition-colors duration-300 ease-in-out disabled:cursor-default disabled:opacity-50 ${styleClasses[cellValue === null ? "null" : cellValue]}`}
      onClick={onCellClick}
      disabled={
        gridState === "disabled" ||
        gridState === "draw" ||
        boardState !== "play"
      }
    >
      {cellValue}
    </button>
  );
};
