import { type PlayerIndicatorProps } from "../../types";

export function PlayerIndicator({ player, opacity }: PlayerIndicatorProps) {
  const colorClass = player === "X" ? "text-blue-700" : "text-red-700";
  return (
    <div
      className={`aspect-square place-content-center rounded-lg bg-neutral-300 text-center font-mono font-bold uppercase ${colorClass} ${opacity}`}
    >
      <div className="text-4xl md:text-6xl">{player}</div>
      <div className="md:text-xl">Turn</div>
    </div>
  );
}
