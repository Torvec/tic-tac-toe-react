// import { useState } from "react";
import { Cell } from "./cell";

// type GridProps = {}

export const Grid = () => {
  const cells = Array.from({ length: 9 }, (_, i) => <Cell key={i} />);

  return (
    <div className="grid h-full grid-cols-3 grid-rows-3 gap-2">{cells}</div>
  );
};
