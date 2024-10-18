import { Button } from "../ui/button";

export const Mode = () => {
  const text = {
    header: "Select Mode",
    classicButton: "Classic Mode",
    ultimateButton: "Ultimate Mode",
  };

  return (
    <>
      <h2 className="mb-8 text-center font-mono text-4xl font-bold">
        {text.header}
      </h2>
      <div className="mb-8 flex justify-center gap-4">
        <Button type="large">{text.classicButton}</Button>
        <Button type="large">{text.ultimateButton}</Button>
      </div>
      <div className="flex justify-center">
        <Button type="small">How To Play</Button>
      </div>
    </>
  );
};
