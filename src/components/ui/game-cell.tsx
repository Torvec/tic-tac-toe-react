import useGameStateContext from "../hooks/use-game-state-context";
import { type GameCellProps } from "../../types";

export default function GameCell({
  gridIndex,
  cellValue,
  onCellClick,
}: GameCellProps) {
  const { state } = useGameStateContext();
  const { gridState, boardState, currentPlayer } = state;

  const gridColors = {
    wonX: "bg-blue-900 text-white",
    wonO: "bg-red-900 text-white",
    draw: "bg-neutral-700 text-white",
  };

  const cellHoverColors = {
    X: "not-disabled:hover:bg-blue-500",
    O: "not-disabled:hover:bg-red-500",
  };

  const cellColors = {
    "": `bg-neutral-500 ${cellHoverColors[currentPlayer]}`,
    X: "bg-blue-600",
    O: "bg-red-600",
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
      className={`cursor-pointer place-content-center rounded-sm text-center font-mono text-2xl font-bold transition-colors duration-300 ease-in-out disabled:cursor-default disabled:opacity-50 md:rounded-2xl md:text-4xl ${colorClass}`}
      onClick={onCellClick}
      disabled={isDisabled}
    >
      {cellValue}
    </button>
  );
}
