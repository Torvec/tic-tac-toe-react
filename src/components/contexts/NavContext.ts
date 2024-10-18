import { createContext, useContext } from "react";

export type Page = "mode" | "opponent" | "howToPlay" | "game";

export const NavContext = createContext<Page>("mode");

export const useNav = () => {
  const nav = useContext(NavContext);
  return nav;
}