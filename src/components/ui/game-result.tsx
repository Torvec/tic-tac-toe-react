import useGameStateContext from "../hooks/use-game-state-context";

export default function GameResult() {
  const { state } = useGameStateContext();
  const { boardState } = state;

  const results = {
    wonX: "X Wins!",
    wonO: "O Wins!",
    draw: "Draw!",
  };

  const isVisible = boardState !== "play" ? "block" : "hidden";

  return (
    <div
      className={`absolute top-1/2 left-1/2 z-10 size-max -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white/50 py-6 px-4 text-center text-7xl font-bold uppercase backdrop-blur-sm md:text-9xl ${isVisible}`}
    >
      {results[boardState as keyof typeof results]}
    </div>
  );
}
