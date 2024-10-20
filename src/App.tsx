import "./App.css";
import { useGameStateContext } from "./components/hooks/useGameStateContext";
import { GameStateProvider } from "./components/contexts/GameStateContext";
import { Header } from "./components/ui/header";
import { GameModeSelect } from "./components/screens/GameModeSelect";
import { HowToPlay } from "./components/screens/HowToPlay";
import { Game } from "./components/screens/Game";
import { Footer } from "./components/ui/footer";

const Screen = () => {
  const { currentScreen } = useGameStateContext();

  switch (currentScreen) {
    case "gameModeSelect":
      return <GameModeSelect />;
    case "howToPlay":
      return <HowToPlay />;
    case "game":
      return <Game />;
  }
};

export const App = () => {
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
};
