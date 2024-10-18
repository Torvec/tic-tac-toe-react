import { useContext } from "react";
import { NavContext } from "../contexts/NavContext";

export const useNavContext = () => {
  const context = useContext(NavContext);
  if (!context) {
    throw new Error("useNavContext must be used within a NavProvider");
  }
  return context;
};
