import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useGameStateContext } from "../hooks/useGameStateContext";

type GameCellProps = {
  reset: boolean;
};

const GameCell = ({ reset }: GameCellProps) => {
  const { currentPlayer, setCurrentPlayer, completeReset } =
    useGameStateContext();
  const [cellState, setCellState] = useState<" " | "X" | "O">(" ");

  useEffect(() => {
    if (reset) {
      setCellState(" ");
      completeReset();
    }
  }, [reset, completeReset]);

  const handleClick = () => {
    if (cellState === " ") {
      //! FIGURE OUT A FIX FOR THIS
      // @ts-expect-error - currentPlayer is only undefined when not in game mode
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
  const { reset } = useGameStateContext();

  const cells = Array.from({ length: 9 }, (_, i) => (
    <GameCell key={i} reset={reset} />
  ));

  return (
    <div className="grid h-full grid-cols-3 grid-rows-3 gap-2">{cells}</div>
  );
};

const GameBoard = () => {
  const { setCurrentPlayer, gameMode } = useGameStateContext();

  useEffect(() => {
    setCurrentPlayer("X");
  }, [gameMode, setCurrentPlayer]);

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
  const { triggerReset, setCurrentPlayer, setCurrentScreen, setGameMode } =
    useGameStateContext();
  return (
    <div className="flex justify-center gap-4">
      <Button type="small" onClick={triggerReset}>
        Reset
      </Button>
      <Button
        type="small"
        onClick={() => {
          setCurrentScreen("gameModeSelect");
          setGameMode(undefined);
          setCurrentPlayer(undefined);
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
