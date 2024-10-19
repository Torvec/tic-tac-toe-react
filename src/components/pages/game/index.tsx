import { Button } from "../../ui/button";
import { useNavContext } from "../../hooks/useNavContext";
import { useOptionsContext } from "../../hooks/useOptionsContext";
import { Board } from "./board";

export const Game = () => {
  const text = {
    xTurn: "X's Turn",
    oTurn: "O's Turn",
    resetButton: "Reset",
    quitButton: "Quit",
  };

  const currentOpponent = {
    pvp: "Player vs Player",
    pvc: "Player vs Computer",
  };

  const { currentPage, setCurrentPage } = useNavContext();
  const { gameMode, setGameMode, opponent, setOpponent } = useOptionsContext();

  const handleResetSelect = () => {
    setCurrentPage(currentPage);
    setGameMode(gameMode);
    setOpponent(opponent);
  };

  const handleQuitSelect = () => {
    setCurrentPage("mode");
    setGameMode(undefined);
  };

  return (
    <>
      <div className="mb-8 flex justify-center gap-16">
        <div>{text.xTurn}</div>
        <div>{text.oTurn}</div>
      </div>
      <Board mode={gameMode} />
      <div className="mb-16 text-center text-2xl font-bold uppercase">
        {opponent ? currentOpponent[opponent] : ""}
      </div>
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
