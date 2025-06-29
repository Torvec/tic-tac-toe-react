import useGameStateContext from "../hooks/use-game-state-context";
import GameGrid from "./game-grid";
import GameResult from "../ui/game-result";

export default function GameBoard() {
  const { state } = useGameStateContext();
  const { currentScreen } = state;

  const gridLayout = {
    classic: { grids: 1, style: "p-4 h-full" },
    ultimate: {
      grids: 9,
      style: "h-full grid grid-cols-3 grid-rows-3 gap-2 md:gap-4 p-4",
    },
  };

  const boardLayout = [
    ...Array(gridLayout[currentScreen as keyof typeof gridLayout].grids),
  ].map((_, i) => <GameGrid key={i} gridIndex={i} />);

  return (
    <div className="relative z-0 mx-auto mb-4 aspect-square h-auto w-full max-w-5xl rounded-lg bg-neutral-400">
      <GameResult />
      <div
        className={gridLayout[currentScreen as keyof typeof gridLayout].style}
      >
        {boardLayout}
      </div>
    </div>
  );
}
