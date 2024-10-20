import { GameGrid } from "./GameGrid";
import { useGameModeContext } from "../../hooks/useGameModeContext";

export const GameBoard = () => {
  const { gameMode } = useGameModeContext();

  let grids: JSX.Element[] = [];
  let className = "";

  switch (gameMode) {
    case "classic":
      grids = Array.from({ length: 1 }, (_, i) => <GameGrid key={i} />);
      className = "p-4 h-full";
      break;
    case "ultimate":
      grids = Array.from({ length: 9 }, (_, i) => <GameGrid key={i} />);
      className = "h-full grid grid-cols-3 grid-rows-3 gap-8 p-4";
      break;
  }

  return (
    <div className="mx-auto mb-8 aspect-square h-auto w-1/2 rounded-xl bg-neutral-600">
      <div className={className}>{grids}</div>
    </div>
  );
};
