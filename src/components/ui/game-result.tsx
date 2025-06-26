import useGameStateContext from "../hooks/use-game-state-context";

export default function GameResult() {
  const { state } = useGameStateContext();
  const { boardState } = state;

  const results = {
    wonX: "X Wins!",
    wonO: "O Wins!",
    draw: "Nobody Wins!",
  };

  return (
    <div className="text-center font-bold uppercase">
      {results[boardState as keyof typeof results]}
    </div>
  );
}
