import { Button } from "../ui/button";
import { useNavContext } from "../hooks/useNavContext";

export const Mode = () => {
  const text = {
    header: "Select Mode",
    classicButton: "Classic Mode",
    ultimateButton: "Ultimate Mode",
    howToPlay: "How To Play",
  };

  const { setCurrentPage } = useNavContext();

  return (
    <>
      <h2 className="mb-8 text-center font-mono text-4xl font-bold">
        {text.header}
      </h2>
      <div className="mb-32 flex justify-center gap-4">
        <Button type="large" onClick={() => setCurrentPage("opponent")}>
          {text.classicButton}
        </Button>
        <Button type="large" onClick={() => setCurrentPage("opponent")}>
          {text.ultimateButton}
        </Button>
      </div>
      <div className="flex justify-center">
        <Button type="small" onClick={() => setCurrentPage("howToPlay")}>
          {text.howToPlay}
        </Button>
      </div>
    </>
  );
};
