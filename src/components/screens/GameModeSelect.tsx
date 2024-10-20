import { Button } from "../ui/button";
import { useNavContext } from "../hooks/useNavContext";
import { useGameModeContext } from "../hooks/useGameModeContext";

export const GameModeSelect = () => {
  const { setCurrentScreen } = useNavContext();
  const { setGameMode } = useGameModeContext();

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
