import { Button } from "../../ui/button";
import { useNavContext } from "../../hooks/useNavContext";
import { useGameModeContext } from "../../hooks/useGameModeContext";
import { GameBoard } from "./GameBoard";
import { useGameContext } from "../../hooks/useGameContext";

export const Game = () => {
  const { setCurrentPage } = useNavContext();
  const { setGameMode } = useGameModeContext();
  const { triggerReset } = useGameContext();

  const handleResetSelect = () => {
    triggerReset();
  };

  const handleQuitSelect = () => {
    setCurrentPage("gameModeSelect");
    setGameMode(undefined);
  };

  return (
    <>
      <GameBoard />
      <div className="flex justify-center gap-4">
        <Button type="small" onClick={handleResetSelect}>
          Reset
        </Button>
        <Button type="small" onClick={handleQuitSelect}>
          Quit
        </Button>
      </div>
    </>
  );
};
