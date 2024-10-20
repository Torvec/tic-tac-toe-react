import "./App.css";
import { GameModeProvider } from "./components/contexts/GameModeContext";
import { GameProvider } from "./components/contexts/GameContext";
import { Header } from "./components/ui/header";
import { NavProvider } from "./components/contexts/NavContext";
import { useNavContext } from "./components/hooks/useNavContext";
import { GameModeSelect } from "./components/screens/GameModeSelect";
import { HowToPlay } from "./components/screens/HowToPlay";
import { Game } from "./components/screens/Game";
import { Footer } from "./components/ui/footer";

const Screen = () => {
  const { currentScreen } = useNavContext();

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
        <GameModeProvider>
          <GameProvider>
            <Header />
            <NavProvider>
              <main className="flex-grow place-content-center">
                <Screen />
              </main>
            </NavProvider>
          </GameProvider>
        </GameModeProvider>
        <Footer />
      </div>
    </div>
  );
};
