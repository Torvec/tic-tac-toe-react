import { Button } from "../ui/button";
import { useNavContext } from "../hooks/useNavContext";

export const Opponent = () => {
  const text = {
    header: "Select Opponent",
    pvpButton: "Player vs Player",
    pvcButton: "Player vs Computer",
    backButton: "Back",
  };

  const { setCurrentPage } = useNavContext();

  return (
    <>
      <h2 className="mb-8 text-center font-mono text-4xl font-bold">
        {text.header}
      </h2>
      <div className="mb-8 flex justify-center gap-4">
        <Button type="large" onClick={() => setCurrentPage("game")}>
          {text.pvpButton}
        </Button>
        <Button type="large" onClick={() => setCurrentPage("game")}>
          {text.pvcButton}
        </Button>
      </div>
      <div className="flex justify-center">
        <Button type="small" onClick={() => setCurrentPage("mode")}>
          {text.backButton}
        </Button>
      </div>
    </>
  );
};
