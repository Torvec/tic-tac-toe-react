export default function GameLogo() {
  const letters = ["T", "I", "C", "T", "A", "C", "T", "O", "E"];

  return (
    <div className="mx-auto grid h-32 w-32 grid-cols-3 grid-rows-3 gap-0.5">
      {letters.map((letter, index) => (
        <div
          key={index}
          className="place-content-center rounded-xl bg-neutral-900 text-center text-xl font-bold uppercase text-neutral-200"
        >
          {letter}
        </div>
      ))}
    </div>
  );
}
