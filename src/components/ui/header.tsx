import { GameLogo } from "./gameLogo";
import { PlayerX, PlayerO } from "./playerIndicator";
import { useGameContext } from "../hooks/useGameContext";

export const Header = () => {
  const { currentPlayer } = useGameContext();
  return (
    <header className="mx-auto grid w-1/2 grid-cols-3 grid-rows-1 items-center py-8">
      {currentPlayer === "X" ? <PlayerX /> : <div></div>}
      <GameLogo />
      {currentPlayer === "O" ? <PlayerO /> : <div></div>}
    </header>
  );
};
