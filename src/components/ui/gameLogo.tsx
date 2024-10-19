import { useOptionsContext } from "../hooks/useOptionsContext";

export const GameLogo = () => {
  const letters = ["T", "I", "C", "T", "A", "C", "T", "O", "E"];
  const modes = { classic: "Classic", ultimate: "Ultimate", };
  const { gameMode } = useOptionsContext();

  return (
    <>
      <div className="mx-auto grid size-28 grid-cols-3 grid-rows-3 gap-0.5">
        {letters.map((letter, index) => (
          <h1
            key={index}
            className="place-content-center rounded-xl bg-neutral-900 text-center text-xl font-bold uppercase text-neutral-200"
          >
            {letter}
          </h1>
        ))}
      </div>
      <div>
        <h2 className="text-center text-2xl font-bold uppercase tracking-wide text-neutral-600 min-h-8">
          {gameMode ? modes[gameMode] : ""}
        </h2>
      </div>
    </>
  );
};
