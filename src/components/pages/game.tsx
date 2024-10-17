import Button from "../ui/button";

export default function Game() {
  const text = {
    xTurn: "X's Turn",
    oTurn: "O's Turn",
    resetButton: "Reset",
    startMenuButton: "Start Menu",
  };

  return (
    <>
      <div className="flex gap-16 justify-center mb-8">
        <div>{text.xTurn}</div>
        <div>{text.oTurn}</div>
      </div>
      <div className="text-center py-96 mb-8 bg-neutral-500">Game Grid&#40;s&#41; here</div>
      <div className="flex gap-4 justify-center">
        <Button type="small">{text.resetButton}</Button>
        <Button type="small">{text.startMenuButton}</Button>
      </div>
    </>
  );
}
