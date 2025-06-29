import useGameStateContext from "../hooks/use-game-state-context";

export default function GameLogo() {
  const letters = ["T", "I", "C", "T", "A", "C", "T", "O", "E"];
  const { state } = useGameStateContext();
  const { currentScreen } = state;

  return (
    <div>
      <div className="mx-auto grid size-24 grid-cols-3 grid-rows-3 gap-0.5">
        {letters.map((letter, index) => (
          <h1
            key={index}
            className="place-content-center rounded-lg bg-neutral-900 text-center text-xl font-bold uppercase text-neutral-200"
          >
            {letter}
          </h1>
        ))}
      </div>
      <div>
        <h2 className="text-center text-xl font-bold uppercase tracking-wide text-neutral-600">
          {currentScreen}
        </h2>
      </div>
    </div>
  );
}
