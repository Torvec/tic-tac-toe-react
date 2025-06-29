import useGameStateContext from "../hooks/use-game-state-context";

export default function GameResult() {
  const { state } = useGameStateContext();

  const results = {
    wonX: { text: "X Wins!", color: "text-blue-800" },
    wonO: { text: "O Wins!", color: "text-red-800" },
    draw: { text: "Draw!", color: "text-neutral-800" },
  };

  const isVisible = state.boardState !== "play" ? "block" : "hidden";
  const result = results[state.boardState as keyof typeof results];
  const textColor = result?.color ?? "";
  const text = result?.text ?? "";

  return (
    <div
      className={`absolute top-1/2 left-1/2 z-10 size-max -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white/50 px-8 py-6 text-center text-7xl font-bold uppercase backdrop-blur-sm md:text-9xl ${isVisible} ${textColor}`}
    >
      {text}
    </div>
  );
}
