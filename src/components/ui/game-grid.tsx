import useGameStateContext from "../hooks/use-game-state-context";
import useHandleClick from "../hooks/use-handle-click";
import GameCell from "./game-cell";
import { GameGridProps } from "../../types";

export default function GameGrid({ gridIndex }: GameGridProps) {
  const { state } = useGameStateContext();
  const { cellValues, currentScreen } = state;
  const gridCells = cellValues[gridIndex];
  const handleClick = useHandleClick();

  const gridGap = {
    classic: "gap-4",
    ultimate: "gap-2",
  };

  const grid = gridCells.map((cellValue, cellIndex) => (
    <GameCell
      key={cellIndex}
      cellValue={cellValue}
      onCellClick={() => handleClick(gridIndex, cellIndex)}
    />
  ));

  return (
    <div
      className={`grid h-full grid-cols-3 grid-rows-3 ${gridGap[currentScreen as keyof typeof gridGap]}`}
    >
      {grid}
    </div>
  );
}
