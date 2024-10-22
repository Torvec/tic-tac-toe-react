import GameLogo from "./GameLogo";
import { PlayerX, PlayerO } from "./PlayerIndicator";
import useGameStateContext from "../hooks/useGameStateContext";

export default function Header() {
  const { state } = useGameStateContext();
  const { currentScreen, currentPlayer } = state;
  return (
    <>
      {currentScreen === "game" ? (
        <header className="mx-auto grid w-1/2 grid-cols-3 grid-rows-1 items-center py-8">
          {currentPlayer === "X" ? (
            <PlayerX />
          ) : (
            <div className="opacity-25">
              <PlayerX />
            </div>
          )}
          <GameLogo />
          {currentPlayer === "O" ? (
            <PlayerO />
          ) : (
            <div className="opacity-25">
              <PlayerO />
            </div>
          )}
        </header>
      ) : (
        <header className="py-8">
          <GameLogo />
        </header>
      )}
    </>
  );
}
