import useGameStateContext from "../hooks/use-game-state-context";
import { type GameCellProps } from "../../types";

export default function GameCell({ cellValue, onCellClick }: GameCellProps) {
  const { state } = useGameStateContext();
  const { gridState, boardState } = state;

  const colors = {
    "": "bg-neutral-500 hover:bg-neutral-300",
    X: "bg-blue-600 hover:bg-blue-400",
    O: "bg-red-600 hover:bg-red-400",
  };

  const isDisabled =
    gridState === "disabled" ||
    gridState === "draw" ||
    gridState === "wonX" ||
    gridState === "wonO" ||
    boardState !== "play";

  return (
    <button
      className={`cursor-pointer place-content-center rounded-2xl text-center font-mono text-8xl font-black transition-colors duration-300 ease-in-out disabled:cursor-default disabled:opacity-50 ${colors[cellValue]}`}
      onClick={onCellClick}
      disabled={isDisabled}
    >
      {cellValue}
    </button>
  );
}
