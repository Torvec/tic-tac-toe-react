import { useContext } from "react";
import { GameModeContext } from "../contexts/GameModeContext";

export const useGameModeContext = () => {
  const context = useContext(GameModeContext);
  if (!context) {
    throw new Error(
      "useGameModeContext must be used within a GameModeProvider",
    );
  }
  return context;
};
