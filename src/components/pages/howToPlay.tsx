import { Button } from "../ui/button";
import { useNavContext } from "../hooks/useNavContext";

export const HowToPlay = () => {
  const text = {
    classicMode: {
      header: "Classic Mode",
      p1: "Win: 3 in a row in a horizontal, vertical or diagonal direction wins.",
      p2: "Draw: If all squares are filled and no win condition is met then it is a draw.",
    },
    ultimateMode: {
      header: "Ultimate Mode",
      p1: "X/O Placement: The game starts in the center grid and depending on where the X/O is placed in that grid will dictate which grid to play in next.",
      p2: "Playable Grids: If a X/O is placed in a grid and the corresponding grid is unplayable then the current player can play on any playable grid.",
      p3: "Win a Grid: 3 in a row in a horizontal, vertical, or diagonal direction wins a grid and no further X/O's can be placed there.",
      p4: "Win the game: 3 grids in a row in a horizontal, vertical, or diagonal direction wins the game.",
      p5: "Draw: If all grids are won or drawn but no win condition is met then it is a draw.",
    },
    backButton: "Back",
  };

  const { setCurrentPage } = useNavContext();

  return (
    <>
      <h2 className="text-3xl font-black">{text.classicMode.header}</h2>
      <div className="mb-8 space-y-6 font-mono text-2xl">
        <p>{text.classicMode.p1}</p>
        <p>{text.classicMode.p2}</p>
      </div>
      <h2 className="text-3xl font-black">{text.ultimateMode.header}</h2>
      <div className="mb-8 space-y-6 font-mono text-2xl">
        <p>{text.ultimateMode.p1}</p>
        <p>{text.ultimateMode.p2}</p>
        <p>{text.ultimateMode.p3}</p>
        <p>{text.ultimateMode.p4}</p>
        <p>{text.ultimateMode.p5}</p>
      </div>
      <div className="flex justify-center">
        <Button type="small" onClick={() => setCurrentPage("mode")}>{text.backButton}</Button>
      </div>
    </>
  );
};
