import useGameStateContext from "../hooks/use-game-state-context";
import { type GameCellProps } from "../../types";

export default function GameCell({
  gridIndex,
  cellValue,
  onCellClick,
}: GameCellProps) {
  const { state } = useGameStateContext();
  const { gridState, boardState } = state;

  const gridColors = {
    wonX: "bg-blue-900 text-white",
    wonO: "bg-red-900 text-white",
    draw: "bg-neutral-700 text-white",
  };

  const cellColors = {
    "": "bg-neutral-500 not-disabled:hover:bg-neutral-300",
    X: "bg-blue-600 not-disabled:hover:bg-blue-400",
    O: "bg-red-600 not-disabled:hover:bg-red-400",
  };

  const gridStatus = gridState[gridIndex];
  const colorClass =
    gridStatus === "wonX" || gridStatus === "wonO" || gridStatus === "draw"
      ? gridColors[gridStatus]
      : cellColors[cellValue];

  const isDisabled =
    gridState[gridIndex] === "disabled" ||
    gridState[gridIndex] === "draw" ||
    gridState[gridIndex] === "wonX" ||
    gridState[gridIndex] === "wonO" ||
    boardState !== "play";

  return (
    <button
      className={`cursor-pointer place-content-center rounded-sm text-center font-mono text-2xl font-bold transition-colors duration-300 ease-in-out disabled:cursor-default disabled:opacity-50 md:rounded-2xl md:text-4xl lg:text-6xl ${colorClass}`}
      onClick={onCellClick}
      disabled={isDisabled}
    >
      {cellValue}
    </button>
  );
}
