import useGameStateContext from "../hooks/use-game-state-context";
import Button from "./button";

export default function ButtonMenu() {
  const { dispatch } = useGameStateContext();
  return (
    <div className="flex flex-col md:flex-row justify-center gap-4">
      <Button type="small" onClick={() => dispatch({ type: "triggerReset" })}>
        Reset
      </Button>
      <Button
        type="small"
        onClick={() => {
          dispatch({ type: "triggerReset" });
          dispatch({ type: "setCurrentScreen", payload: "select" });
          dispatch({ type: "setCurrentPlayer", payload: "X" });
          dispatch({ type: "setGameMode", payload: null });
        }}
      >
        Back
      </Button>
    </div>
  );
}
