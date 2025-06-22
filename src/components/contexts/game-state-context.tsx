import { createContext } from "react";
import { type GameStateContextType } from "../../types";

export const GameStateContext = createContext<GameStateContextType | undefined>(
  undefined,
);
