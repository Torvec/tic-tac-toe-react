import { type CellProps } from "../../types";

export default function Cell({ cellValue, onCellClick }: CellProps) {
  let className;
  switch (cellValue) {
    case "X":
      className =
        "cursor-pointer place-content-center rounded-2xl bg-blue-600 text-center font-mono text-8xl font-black transition-colors duration-300 ease-in-out hover:bg-blue-400";
      break;
    case "O":
      className =
        "cursor-pointer place-content-center rounded-2xl bg-red-600 text-center font-mono text-8xl font-black transition-colors duration-300 ease-in-out hover:bg-red-400";
      break;
    case " ":
      className =
        "cursor-pointer place-content-center rounded-2xl bg-neutral-400 text-center font-mono text-8xl font-black transition-colors duration-300 ease-in-out hover:bg-neutral-300";
      break;
  }

  return (
    <div className={className} onClick={onCellClick}>
      {cellValue}
    </div>
  );
}
