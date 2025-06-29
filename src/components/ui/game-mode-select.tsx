import Button from "./button";
import useGameStateContext from "../hooks/use-game-state-context";

export default function GameModeSelect() {
  const { dispatch } = useGameStateContext();

  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <div className="flex flex-col justify-center gap-2 md:flex-row md:gap-4">
        <Button
          type="large"
          onClick={() => {
            dispatch({ type: "setCurrentScreen", payload: "classic" });
          }}
        >
          Classic <br /> Mode
        </Button>
        <Button
          type="large"
          onClick={() => {
            dispatch({ type: "setCurrentScreen", payload: "ultimate" });
          }}
        >
          Ultimate <br /> Mode
        </Button>
      </div>
      <div className="flex justify-center">
        <Button
          type="small"
          onClick={() =>
            dispatch({ type: "setCurrentScreen", payload: "how to play" })
          }
        >
          How To Play
        </Button>
      </div>
    </div>
  );
}
