import useGameStateContext from "../hooks/use-game-state-context";
import GameModeSelect from "./game-mode-select";
import HowToPlay from "./how-to-play";
import GameBoard from "../ui/game-board";
import ButtonMenu from "../ui/button-menu";

export default function ScreenSelect() {
  const { state } = useGameStateContext();

  switch (state.currentScreen) {
    case "select":
      return <GameModeSelect />;
    case "how to play":
      return <HowToPlay />;
    case "classic":
    case "ultimate":
      return (
        <>
          <GameBoard />
          <ButtonMenu />
        </>
      );
  }
}
