import useGameStateContext from "../hooks/use-game-state-context";
import Button from "./button";

export default function ButtonMenu() {
  const { state, dispatch } = useGameStateContext();

  const resetBtnText = state.boardState !== "play" ? "Replay" : "Reset";

  return (
    <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
      <Button type="small" onClick={() => dispatch({ type: "triggerReset" })}>
        {resetBtnText}
      </Button>
      <Button
        type="small"
        onClick={() => {
          dispatch({ type: "triggerReset" });
          dispatch({ type: "setCurrentScreen", payload: "select" });
        }}
      >
        Back
      </Button>
    </div>
  );
}
