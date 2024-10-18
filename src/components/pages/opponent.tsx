import { Button } from "../ui/button";
import { useNavContext } from "../hooks/useNavContext";
import { useOptionsContext } from "../hooks/useOptionsContext";

export const Opponent = () => {
  const text = {
    header: "Select Opponent",
    pvpButton: "Player vs Player",
    pvcButton: "Player vs Computer",
    backButton: "Back",
  };

  const { setCurrentPage } = useNavContext();
  const { setOpponent, setGameMode } = useOptionsContext();

  const handlePVPSelect = () => {
    setOpponent("pvp");
    setCurrentPage("game");
  };

  const handlePVCSelect = () => {
    setOpponent("pvc");
    setCurrentPage("game");
  };

  const handleBackSelect = () => {
    setCurrentPage("mode");
    setGameMode(undefined);
  };

  return (
    <>
      <h2 className="mb-8 text-center font-mono text-4xl font-bold">
        {text.header}
      </h2>
      <div className="mb-32 flex justify-center gap-4">
        <Button type="large" onClick={handlePVPSelect}>
          {text.pvpButton}
        </Button>
        <Button type="large" onClick={handlePVCSelect}>
          {text.pvcButton}
        </Button>
      </div>
      <div className="flex justify-center">
        <Button type="small" onClick={handleBackSelect}>
          {text.backButton}
        </Button>
      </div>
    </>
  );
};
