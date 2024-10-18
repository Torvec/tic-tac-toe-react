import { Button } from "../ui/button";

export const Opponent = () => {
  const text = {
    header: "Select Opponent",
    pvpButton: "Player vs Player",
    pvcButton: "Player vs Computer",
    startMenuButton: "Start Menu",
  };

  return (
    <>
      <h2 className="mb-8 text-center font-mono text-4xl font-bold">
        {text.header}
      </h2>
      <div className="mb-8 flex justify-center gap-4">
        <Button type="large">{text.pvpButton}</Button>
        <Button type="large">{text.pvcButton}</Button>
      </div>
      <div className="flex justify-center">
        <Button type="small">{text.startMenuButton}</Button>
      </div>
    </>
  );
};
