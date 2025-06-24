import useGameStateContext from "../hooks/use-game-state-context";
import GameModeSelect from "../screens/game-mode-select";
import HowToPlay from "../screens/how-to-play";
import Game from "../screens/game";

export default function ScreenSelect() {
  const { state } = useGameStateContext();
  
  switch (state.currentScreen) {
    case "select":
      return <GameModeSelect />;
    case "how to play":
      return <HowToPlay />;
    case "classic":
    case "ultimate":
      return <Game />
  }
}
