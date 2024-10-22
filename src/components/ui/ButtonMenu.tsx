import useGameStateContext from "../hooks/useGameStateContext";
import Button from "./Button";

export default function ButtonMenu() {
  const { dispatch } = useGameStateContext();
  return (
    <div className="flex justify-center gap-4">
      <Button type="small" onClick={() => dispatch({ type: "triggerReset" })}>
        Reset
      </Button>
      <Button
        type="small"
        onClick={() => {
          dispatch({ type: "triggerReset" });
          dispatch({ type: "setCurrentScreen", payload: "gameModeSelect" });
          dispatch({ type: "setCurrentPlayer", payload: "X" });
        }}
      >
        Back
      </Button>
    </div>
  );
}
