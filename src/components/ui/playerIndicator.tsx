// Need to know who's turn it is
// Need to change which indicator is highlighted based on who's turn it is

export const PlayerIndicator = () => {
    const text = {
        X: "X",
        O: "O",
        turn: "Turn",
    };
    
  return (
    <div className="mb-8 flex justify-evenly text-center font-mono font-bold uppercase">
        <div className="text-blue-700">
            <div className="text-6xl">{text.X}</div>
            <div className="text-xl">{text.turn}</div>
        </div>
        <div className="text-red-700">
            <div className="text-6xl">{text.O}</div>
            <div className="text-xl">{text.turn}</div>
        </div>
    </div>
  );
};
