// src/components/pages/game/GameCell.tsx
import { useState, useEffect } from "react";
import { useGameContext } from "../../hooks/useGameContext";

type GameCellProps = {
  reset: boolean;
};

export const GameCell = ({ reset }: GameCellProps) => {
  const { currentPlayer, setCurrentPlayer, completeReset } = useGameContext();
  const [cellState, setCellState] = useState<" " | "X" | "O">(" ");

  useEffect(() => {
    if (reset) {
      setCellState(" ");
      completeReset();
    }
  }, [reset, completeReset]);

  const handleClick = () => {
    if (cellState === " ") {
      setCellState(currentPlayer);
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  return (
    <div
      className="cursor-pointer place-content-center rounded-2xl bg-neutral-400 text-center transition-colors duration-300 ease-in-out hover:bg-neutral-300"
      onClick={handleClick}
    >
      {cellState}
    </div>
  );
};
