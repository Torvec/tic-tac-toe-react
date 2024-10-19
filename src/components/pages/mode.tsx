import { Button } from "../ui/button";
import { useNavContext } from "../hooks/useNavContext";
import { useGameModeContext } from "../hooks/useGameModeContext";

export const Mode = () => {
  const { setCurrentPage } = useNavContext();
  const { setGameMode } = useGameModeContext();

  const handleClassicModeSelect = () => {
    setGameMode("classic");
    setCurrentPage("game");
  };

  const handleUltimateModeSelect = () => {
    setGameMode("ultimate");
    setCurrentPage("game");
  };

  return (
    <>
      <h2 className="mb-8 text-center font-mono text-4xl font-bold">
        Select Mode
      </h2>
      <div className="mb-32 flex justify-center gap-4">
        <Button type="large" onClick={handleClassicModeSelect}>
          Classic Mode
        </Button>
        <Button type="large" onClick={handleUltimateModeSelect}>
          Ultimate Mode
        </Button>
      </div>
      <div className="flex justify-center">
        <Button type="small" onClick={() => setCurrentPage("howToPlay")}>
          How To Play
        </Button>
      </div>
    </>
  );
};
