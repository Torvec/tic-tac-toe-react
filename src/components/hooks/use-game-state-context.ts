import { useContext } from "react";
import { GameStateContext } from "../contexts/game-state-context";

export default function useGameStateContext() {
  const context = useContext(GameStateContext);
  if (!context) {
    throw new Error(
      "useGameStateContext must be used within a GameStateProvider",
    );
  }
  return context;
}
