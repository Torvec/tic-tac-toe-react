import GameLogo from "./game-logo";
import { PlayerIndicator } from "./player-indicator";
import useGameStateContext from "../hooks/use-game-state-context";

export default function Header() {
  const { state } = useGameStateContext();
  const { currentScreen, currentPlayer } = state;
  return (
    <>
      {currentScreen === "classic" || currentScreen === "ultimate" ? (
        <header className="mx-auto flex justify-between gap-2 md:justify-evenly items-center w-full bg-neutral-300 p-2 rounded-xl">
          <PlayerIndicator
            player="X"
            opacity={currentPlayer === "X" ? "" : "opacity-50"}
          />
          <GameLogo />
          <PlayerIndicator
            player="O"
            opacity={currentPlayer === "O" ? "" : "opacity-50"}
          />
        </header>
      ) : (
        <header>
          <GameLogo />
        </header>
      )}
    </>
  );
}
