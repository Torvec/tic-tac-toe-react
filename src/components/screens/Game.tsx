import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useGameStateContext } from "../hooks/useGameStateContext";

type GameCellProps = {
  resetGame: boolean;
};

const GameCell = ({ resetGame }: GameCellProps) => {
  const { state, dispatch } = useGameStateContext();
  const [cellState, setCellState] = useState<" " | "X" | "O">(" ");

  useEffect(() => {
    if (resetGame) {
      setCellState(" ");
      dispatch({ type: "completeReset" });
    }
  }, [resetGame, dispatch]);

  const handleClick = () => {
    if (cellState === " ") {
      const currentPlayer = state.currentPlayer;
      if (currentPlayer) {
        setCellState(currentPlayer);
        const nextPlayer = currentPlayer === "X" ? "O" : "X";
        dispatch({ type: "setCurrentPlayer", payload: nextPlayer });
      }
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
  const { state } = useGameStateContext();
  const { reset } = state;

  const cells = Array.from({ length: 9 }, (_, i) => (
    <GameCell key={i} resetGame={reset} />
  ));

  return (
    <div className="grid h-full grid-cols-3 grid-rows-3 gap-2">{cells}</div>
  );
};

const GameBoard = () => {
  const { state, dispatch } = useGameStateContext();
  const { gameMode } = state;

  useEffect(() => {
    dispatch({ type: "setCurrentPlayer", payload: "X" });
  }, [dispatch, gameMode]);

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
  const { dispatch } = useGameStateContext();
  return (
    <div className="flex justify-center gap-4">
      <Button type="small" onClick={() => dispatch({ type: "triggerReset" })}>
        Reset
      </Button>
      <Button
        type="small"
        onClick={() => {
          dispatch({ type: "setCurrentScreen", payload: "gameModeSelect" });
          dispatch({ type: "setGameMode", payload: undefined });
          dispatch({ type: "setCurrentPlayer", payload: undefined });
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
