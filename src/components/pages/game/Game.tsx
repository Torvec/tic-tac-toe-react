import { Button } from "../../ui/button";
import { useNavContext } from "../../hooks/useNavContext";
import { useGameModeContext } from "../../hooks/useGameModeContext";
import { GameBoard } from "./GameBoard";

export const Game = () => {

  const { currentPage, setCurrentPage } = useNavContext();
  const { gameMode, setGameMode } = useGameModeContext();

  // ! This doesn't seem to do anything at the moment, i need it to reset the whole board
  const handleResetSelect = () => {
    setCurrentPage(currentPage);
    setGameMode(gameMode);
  };

  const handleQuitSelect = () => {
    setCurrentPage("mode");
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
