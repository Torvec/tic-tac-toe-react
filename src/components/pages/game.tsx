import { Button } from "../ui/button";
import { useNavContext } from "../hooks/useNavContext";

export const Game = () => {
  const text = {
    xTurn: "X's Turn",
    oTurn: "O's Turn",
    resetButton: "Reset",
    startMenuButton: "Start Menu",
  };

  const { setCurrentPage } = useNavContext();

  return (
    <>
      <div className="mb-8 flex justify-center gap-16">
        <div>{text.xTurn}</div>
        <div>{text.oTurn}</div>
      </div>
      <div className="mb-8 bg-neutral-500 w-[768px] h-[768px] place-content-center text-center mx-auto">
        Game Grid&#40;s&#41; here
      </div>
      <div className="flex justify-center gap-4">
        <Button type="small" onClick={() => setCurrentPage("game")}>
          {text.resetButton}
        </Button>
        <Button type="small" onClick={() => setCurrentPage("mode")}>
          {text.startMenuButton}
        </Button>
      </div>
    </>
  );
};
