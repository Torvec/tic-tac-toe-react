import Button from "../ui/button";

export default function mode() {
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
      <div className="flex justify-center gap-4 mb-8">
        <Button type="large">{text.classicButton}</Button>
        <Button type="large">{text.ultimateButton}</Button>
      </div>
      <div className="flex justify-center">
        <Button type="small">How To Play</Button>
      </div>
    </>
  );
}
