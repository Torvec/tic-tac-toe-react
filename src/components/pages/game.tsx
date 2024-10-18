import { Button } from "../ui/button";

export const Game = () => {
  const text = {
    xTurn: "X's Turn",
    oTurn: "O's Turn",
    resetButton: "Reset",
    startMenuButton: "Start Menu",
  };

  return (
    <>
      <div className="mb-8 flex justify-center gap-16">
        <div>{text.xTurn}</div>
        <div>{text.oTurn}</div>
      </div>
      <div className="mb-8 bg-neutral-500 py-96 text-center">
        Game Grid&#40;s&#41; here
      </div>
      <div className="flex justify-center gap-4">
        <Button type="small">{text.resetButton}</Button>
        <Button type="small">{text.startMenuButton}</Button>
      </div>
    </>
  );
};
