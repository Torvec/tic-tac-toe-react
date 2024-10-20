import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useNavContext } from "../hooks/useNavContext";
import { useGameModeContext } from "../hooks/useGameModeContext";
import { useGameContext } from "../hooks/useGameContext";

type GameCellProps = {
  reset: boolean;
};

const GameCell = ({ reset }: GameCellProps) => {
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

const GameGrid = () => {
  const { reset } = useGameContext();

  const cells = Array.from({ length: 9 }, (_, i) => (
    <GameCell key={i} reset={reset} />
  ));

  return (
    <div className="grid h-full grid-cols-3 grid-rows-3 gap-2">{cells}</div>
  );
};

const GameBoard = () => {
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

const ButtonMenu = () => {
  const { setCurrentPage } = useNavContext();
  const { setGameMode } = useGameModeContext();
  const { triggerReset } = useGameContext();
  return (
    <div className="flex justify-center gap-4">
      <Button type="small" onClick={triggerReset}>
        Reset
      </Button>
      <Button
        type="small"
        onClick={() => {
          setCurrentPage("gameModeSelect");
          setGameMode(undefined);
        }}
      >
        Back
      </Button>
    </div>
  );
};

export const Game = () => {
  
  return (
    <>
      <GameBoard />
      <ButtonMenu />
    </>
  );
};
