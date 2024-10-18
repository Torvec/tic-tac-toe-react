import { Button } from "../ui/button";
import { useNavContext } from "../hooks/useNavContext";

export const Game = () => {
  const text = {
    xTurn: "X's Turn",
    oTurn: "O's Turn",
    resetButton: "Reset",
    quitButton: "Quit",
  };

  const { setCurrentPage } = useNavContext();

  return (
    <>
      <div className="mb-8 flex justify-center gap-16">
        <div>{text.xTurn}</div>
        <div>{text.oTurn}</div>
      </div>
      <div className="mx-auto mb-32 h-[768px] w-[768px] place-content-center bg-neutral-500 text-center">
        Game Grid&#40;s&#41; here
      </div>
      <div className="flex justify-center gap-4">
        <Button type="small" onClick={() => setCurrentPage("game")}>
          {text.resetButton}
        </Button>
        <Button type="small" onClick={() => setCurrentPage("mode")}>
          {text.quitButton}
        </Button>
      </div>
    </>
  );
};
