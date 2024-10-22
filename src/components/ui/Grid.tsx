import Cell from "./Cell";

type GridProps = {
  gridIndex: number;
  cellValues: (" " | "X" | "O")[];
  onCellClick: (gridIndex: number, cellIndex: number) => void;
};

export default function Grid({
  gridIndex,
  cellValues,
  onCellClick,
}: GridProps) {
  const grid = cellValues.map((cellValue, i) => (
    <Cell
      key={i}
      cellValue={cellValue}
      onCellClick={() => onCellClick(gridIndex, i)}
    />
  ));

  return (
    <div className="grid h-full grid-cols-3 grid-rows-3 gap-2">{grid}</div>
  );
}
