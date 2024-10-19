import { Button } from "../ui/button";
import { useNavContext } from "../hooks/useNavContext";

export const HowToPlay = () => {
  const { setCurrentPage } = useNavContext();

  return (
    <div className="mx-auto w-3/4">
      <h2 className="mb-4 text-3xl font-black uppercase">Classic Mode</h2>
      <ul className="mb-8 space-y-4 pl-9 text-xl">
        <li>
          <span className="font-bold">Win:</span> 3 in a row in a horizontal,
          vertical or diagonal direction wins.
        </li>
        <li>
          <span className="font-bold">Draw:</span> If all squares are filled and
          no win condition is met then it is a draw.
        </li>
      </ul>
      <h2 className="mb-4 text-3xl font-black uppercase">Ultimate Mode</h2>
      <ul className="mb-16 space-y-4 pl-8 text-xl">
        <li>
          <span className="font-bold">X/O Placement:</span> The game starts in
          the center grid and depending on where the X/O is placed in that grid
          will dictate which grid to play in next.
        </li>
        <li>
          <span className="font-bold">Playable Grids:</span> If a X/O is placed
          in a grid and the corresponding grid is unplayable then the current
          player can play on any playable grid.
        </li>
        <li>
          <span className="font-bold">Win A Grid:</span> 3 in a row in a
          horizontal, vertical, or diagonal direction wins a grid and no further
          X/O's can be placed there.
        </li>
        <li>
          <span className="font-bold">Win The Game:</span> 3 grids in a row in a
          horizontal, vertical, or diagonal direction wins the game.
        </li>
        <li>
          <span className="font-bold">Draw Game:</span> If all grids are won or
          drawn but no win condition is met then it is a draw.
        </li>
      </ul>
      <div className="flex justify-center">
        <Button type="small" onClick={() => setCurrentPage("mode")}>
          Back
        </Button>
      </div>
    </div>
  );
};
