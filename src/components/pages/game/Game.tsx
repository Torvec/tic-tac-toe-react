import { Button } from "../../ui/button";
import { useNavContext } from "../../hooks/useNavContext";
import { useOptionsContext } from "../../hooks/useOptionsContext";
import { PlayerIndicator } from "../../ui/playerIndicator";
import { GameBoard } from "./GameBoard";

export const Game = () => {
  const text = {
    xTurn: "X's Turn",
    oTurn: "O's Turn",
    resetButton: "Reset",
    quitButton: "Quit",
  };

  const { currentPage, setCurrentPage } = useNavContext();
  const { gameMode, setGameMode } = useOptionsContext();

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
      <PlayerIndicator />
      <GameBoard mode={gameMode} />
      <div className="flex justify-center gap-4">
        <Button type="small" onClick={handleResetSelect}>
          {text.resetButton}
        </Button>
        <Button type="small" onClick={handleQuitSelect}>
          {text.quitButton}
        </Button>
      </div>
    </>
  );
};
