import Button from "./button";
import useGameStateContext from "../hooks/use-game-state-context";

export default function HowToPlay() {
  const { dispatch } = useGameStateContext();

  return (
    <>
      <div className="mx-auto max-w-2xl">
        <h2 className="mb-2 text-center text-2xl font-black uppercase">
          Classic Mode
        </h2>
        <ul className="mb-8 space-y-2 text-lg">
          <li>
            <span className="font-bold">Win:</span> Three X's or O's in a
            horizontal, vertical, or diagonal direction wins the game.
          </li>
          <li>
            <span className="font-bold">Draw:</span> If all cells are filled
            with X's and O's and no win condition is met then it is a draw.
          </li>
        </ul>
        <h2 className="mb-2 text-center text-2xl font-black uppercase">
          Ultimate Mode
        </h2>
        <ul className="mb-8 space-y-2 text-lg">
          <li>
            <span className="font-bold">X/O Placement:</span> The game starts in
            the center grid and depending on which cell the X/O is placed in
            that grid will determine which grid to play in next.
          </li>
          <li>
            <span className="font-bold">Playable Grids:</span> If a X/O is
            placed in a grid and the corresponding grid is already won or drawn
            then the current player can play on any non-won/drawn grid.
          </li>
          <li>
            <span className="font-bold">Grid Win:</span> 3 X's or O's in a
            horizontal, vertical or diagonal direction wins a grid and no
            further X's or O's can be placed within.
          </li>
          <li>
            <span className="font-bold">Grid Draw:</span> If all cells are
            filled with X's and O's and no win condition is met then the grid is
            a draw.
          </li>
          <li>
            <span className="font-bold">Board Win:</span> 3 won grids in a
            horizontal, vertical or diagonal direction wins the game.
          </li>
          <li>
            <span className="font-bold">Board Draw:</span> If all grids are won
            or drawn but no win condition is met then it is a draw.
          </li>
        </ul>
      </div>
      <div className="flex justify-center">
        <Button
          type="small"
          onClick={() =>
            dispatch({ type: "setCurrentScreen", payload: "select" })
          }
        >
          Back
        </Button>
      </div>
    </>
  );
}
