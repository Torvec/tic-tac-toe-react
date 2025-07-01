import GameLogo from "./game-logo";
import { PlayerIndicator } from "./player-indicator";
import useGameStateContext from "../hooks/use-game-state-context";

export default function Header() {
  const { state } = useGameStateContext();
  const { currentScreen, currentPlayer } = state;
  return (
    <>
      {currentScreen === "classic" || currentScreen === "ultimate" ? (
        <header className="mx-auto flex w-full items-center justify-between gap-2 bg-neutral-300 p-2 md:justify-evenly md:rounded-t-xl">
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
        <header className="py-4">
          <GameLogo />
        </header>
      )}
    </>
  );
}
