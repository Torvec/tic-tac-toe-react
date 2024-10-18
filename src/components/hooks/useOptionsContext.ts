import { useContext } from "react";
import { OptionsContext } from "../contexts/OptionsContext";

export const useOptionsContext = () => {
  const context = useContext(OptionsContext);
  if (!context) {
    throw new Error("useOptionsContext must be used within a NavProvider");
  }
  return context;
};
