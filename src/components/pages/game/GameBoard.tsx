// import { useState } from "react";
// import { Cell } from "./cell";
import { GameGrid } from "./GameGrid";
import { type Mode } from "../../contexts/OptionsContext";

type BoardProps = {
  mode: Mode;
};

export const GameBoard = ({ mode }: BoardProps) => {
  const classicGrids = Array.from({ length: 1 }, (_, i) => (
    <GameGrid key={i} />
  ));
  const ultimateGrids = Array.from({ length: 9 }, (_, i) => (
    <GameGrid key={i} />
  ));
  const setupBoard = {
    classic: classicGrids,
    ultimate: ultimateGrids,
  };
  const classNames = {
    classic: "p-4 h-full",
    ultimate: "h-full grid grid-cols-3 grid-rows-3 gap-8 p-4",
  };
  return (
    <div className="mx-auto mb-8 aspect-square h-auto w-1/2 rounded-xl bg-neutral-600">
      <div className={mode ? classNames[mode] : undefined}>
        {mode ? setupBoard[mode] : undefined}
      </div>
    </div>
  );
};
