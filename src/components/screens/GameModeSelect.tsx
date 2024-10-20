import { Button } from "../ui/button";
import { useGameStateContext } from "../hooks/useGameStateContext";

export const GameModeSelect = () => {
  const { dispatch } = useGameStateContext();

  return (
    <>
      <div className="mb-32 flex justify-center gap-4">
        <Button
          type="large"
          onClick={() => {
            dispatch({ type: "setGameMode", payload: "classic" });
            dispatch({ type: "setCurrentScreen", payload: "game" });
          }}
        >
          Classic <br /> Mode
        </Button>
        <Button
          type="large"
          onClick={() => {
            dispatch({ type: "setGameMode", payload: "ultimate" });
            dispatch({ type: "setCurrentScreen", payload: "game" });
          }}
        >
          Ultimate <br /> Mode
        </Button>
      </div>
      <div className="flex justify-center">
        <Button
          type="small"
          onClick={() =>
            dispatch({ type: "setCurrentScreen", payload: "howToPlay" })
          }
        >
          How To Play
        </Button>
      </div>
    </>
  );
};
