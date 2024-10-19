import { useState } from "react";

// type CellProps = {};

export const GameCell = () => {
  const [value, setValue] = useState("");

  // const cellStates = {
  //   EMPTY: (
  //     <div className="cursor-pointer place-content-center rounded-2xl bg-neutral-400 text-center transition-colors duration-300 ease-in-out hover:bg-neutral-300"></div>
  //   ),
  //   X: (
  //     <div className="cursor-pointer place-content-center rounded-2xl bg-neutral-400 text-center transition-colors duration-300 ease-in-out hover:bg-neutral-300">
  //       X
  //     </div>
  //   ),
  //   O: (
  //     <div className="cursor-pointer place-content-center rounded-2xl bg-neutral-400 text-center transition-colors duration-300 ease-in-out hover:bg-neutral-300">
  //       O
  //     </div>
  //   ),
  //   X_WIN: (
  //     <div className="cursor-pointer place-content-center rounded-2xl bg-neutral-400 text-center transition-colors duration-300 ease-in-out hover:bg-neutral-300">
  //       X
  //     </div>
  //   ),
  //   O_WIN: (
  //     <div className="cursor-pointer place-content-center rounded-2xl bg-neutral-400 text-center transition-colors duration-300 ease-in-out hover:bg-neutral-300">
  //       O
  //     </div>
  //   ),
  //   DRAW: (
  //     <div className="cursor-pointer place-content-center rounded-2xl bg-neutral-400 text-center transition-colors duration-300 ease-in-out hover:bg-neutral-300">
  //       D
  //     </div>
  //   ),
  // };

  const handleClick = () => {
    if (value === "") {
      setValue("X");
    } else if (value === "X") {
      setValue("O");
    } else {
      setValue("");
    }
  };

  return (
    <div
      className="cursor-pointer place-content-center rounded-2xl bg-neutral-400 text-center transition-colors duration-300 ease-in-out hover:bg-neutral-300"
      onClick={handleClick}
    >{value}</div>
  );
};
