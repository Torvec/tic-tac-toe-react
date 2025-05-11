import "./app.css";
import useGameStateContext from "./components/hooks/use-game-state-context";
import { GameStateProvider } from "./components/contexts/game-state-context";
import Header from "./components/ui/header";
import GameModeSelect from "./components/screens/game-mode-select";
import HowToPlay from "./components/screens/how-to-play";
import Game from "./components/screens/game";
import Footer from "./components/ui/footer";

const Screen = () => {
  const { state } = useGameStateContext();
  const { currentScreen } = state;

  switch (currentScreen) {
    case "gameModeSelect":
      return <GameModeSelect />;
    case "howToPlay":
      return <HowToPlay />;
    case "game":
      return <Game />;
  }
};

export default function App() {
  return (
    <div className="rounded-3xl bg-neutral-200">
      <div className="fullscreen container mx-auto flex flex-col">
        <GameStateProvider>
          <Header />
          <main className="flex-grow place-content-center">
            <Screen />
          </main>
        </GameStateProvider>
        <Footer />
      </div>
    </div>
  );
}
