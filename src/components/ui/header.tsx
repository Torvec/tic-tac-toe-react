import { GameLogo } from "./gameLogo";
import { PlayerX, PlayerO } from "./playerIndicator";

export const Header = () => {
  return (
    <header className="mx-auto grid w-1/2 grid-cols-3 grid-rows-1 items-center py-8">
      <PlayerX />
      <GameLogo />
      <PlayerO />
    </header>
  );
};
