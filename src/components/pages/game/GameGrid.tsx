// import { useState } from "react";
import { GameCell } from "./GameCell";

// type GridProps = {}

export const GameGrid = () => {
  const cells = Array.from({ length: 9 }, (_, i) => <GameCell key={i} />);

  return (
    <div className="grid h-full grid-cols-3 grid-rows-3 gap-2">{cells}</div>
  );
};
