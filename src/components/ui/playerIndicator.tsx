// Need to know who's turn it is
// Need to change which indicator is highlighted based on who's turn it is

export const PlayerX = () => {
  return (
    <div className="text-center font-mono font-bold uppercase text-blue-700">
      <div className="text-6xl">X</div>
      <div className="text-xl">Turn</div>
    </div>
  );
};

export const PlayerO = () => {
  return (
    <div className="text-center font-mono font-bold uppercase text-red-700">
      <div className="text-6xl">O</div>
      <div className="text-xl">Turn</div>
    </div>
  );
};
