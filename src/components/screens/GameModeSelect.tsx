import { Button } from "../ui/button";
import { useGameStateContext } from "../hooks/useGameStateContext";

export const GameModeSelect = () => {
  const { setGameMode, setCurrentScreen } = useGameStateContext();

  return (
    <>
      <div className="mb-32 flex justify-center gap-4">
        <Button
          type="large"
          onClick={() => {
            setGameMode("classic");
            setCurrentScreen("game");
          }}
        >
          Classic <br /> Mode
        </Button>
        <Button
          type="large"
          onClick={() => {
            setGameMode("ultimate");
            setCurrentScreen("game");
          }}
        >
          Ultimate <br /> Mode
        </Button>
      </div>
      <div className="flex justify-center">
        <Button type="small" onClick={() => setCurrentScreen("howToPlay")}>
          How To Play
        </Button>
      </div>
    </>
  );
};
