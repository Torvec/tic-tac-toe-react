import GameLogo from "./game-logo";
import { PlayerIndicator } from "./player-indicator";
import useGameStateContext from "../hooks/use-game-state-context";

export default function Header() {
  const { state } = useGameStateContext();
  const { currentScreen, currentPlayer } = state;
  return (
    <>
      {currentScreen === "classic" || currentScreen === "ultimate" ? (
        <header className="mx-auto grid grid-cols-3 grid-rows-1">
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
