import { GameCell } from "./GameCell";
import { useGameContext } from "../../hooks/useGameContext";

export const GameGrid = () => {
  const { reset } = useGameContext();

  const cells = Array.from({ length: 9 }, (_, i) => (
    <GameCell key={i} reset={reset} />
  ));

  return (
    <div className="grid h-full grid-cols-3 grid-rows-3 gap-2">{cells}</div>
  );
};
