import { type Cell, type Grid } from "../types";

export default function calculateWinner(input: Cell[] | Grid[]) {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winningCombos.length; i++) {
    const [a, b, c] = winningCombos[i];
    if (input[a] && input[a] === input[b] && input[a] === input[c]) {
      return input[a];
    }
  }
  return null;
}
