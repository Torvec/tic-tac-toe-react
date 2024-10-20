import { Button } from "../ui/button";
import { useNavContext } from "../hooks/useNavContext";

export const HowToPlay = () => {
  const { setCurrentScreen } = useNavContext();

  return (
    <>
      <div className="flex gap-16">
        <div className="w-1/2">
          <h2 className="mb-4 text-center text-3xl font-black uppercase">
            Classic Mode
          </h2>
          <ul className="mb-8 space-y-4 text-xl">
            <li>
              <span className="font-bold">Win:</span> 3 X's or O's in a
              horizontal, vertical or diagonal direction wins the game.
            </li>
            <li>
              <span className="font-bold">Draw:</span> If all cells are filled
              with X's and O's and no win condition is met then it is a draw.
            </li>
          </ul>
        </div>
        <div className="w-1/2">
          <h2 className="mb-4 text-center text-3xl font-black uppercase">
            Ultimate Mode
          </h2>
          <ul className="mb-16 space-y-4 text-xl">
            <li>
              <span className="font-bold">X/O Placement:</span> The game starts
              in the center grid and depending on where the X/O is placed in
              that grid will dictate which grid to play in next.
            </li>
            <li>
              <span className="font-bold">Playable Grids:</span> If a X/O is
              placed in a grid and the corresponding grid is unplayable then the
              current player can play on any playable grid.
            </li>
            <li>
              <span className="font-bold">Win A Grid:</span> 3 X's or O's in a
              horizontal, vertical or diagonal direction wins a grid and no
              further X's or O's can be placed within.
            </li>
            <li>
              <span className="font-bold">Draw Grid:</span> If all cells are
              filled with X's and O's and no win condition is met then the grid
              is a draw.
            </li>
            <li>
              <span className="font-bold">Win The Game:</span> 3 won grids in a
              horizontal, vertical or diagonal direction wins the game.
            </li>
            <li>
              <span className="font-bold">Draw Game:</span> If all grids are won
              or drawn but no win condition is met then it is a draw.
            </li>
          </ul>
        </div>
      </div>
      <div className="flex justify-center">
        <Button type="small" onClick={() => setCurrentScreen("gameModeSelect")}>
          Back
        </Button>
      </div>
    </>
  );
};
