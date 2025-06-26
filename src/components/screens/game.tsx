import GameBoard from "../ui/game-board";
import GameResult from "../ui/game-result";
import ButtonMenu from "../ui/button-menu";

export default function Game() {
  return (
    <>
      <GameResult />
      <GameBoard />
      <ButtonMenu />
    </>
  );
}
