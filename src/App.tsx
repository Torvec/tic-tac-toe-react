import { NavProvider } from "./components/contexts/NavContext";
import { GameModeProvider } from "./components/contexts/GameModeContext";
import { useNavContext } from "./components/hooks/useNavContext";
import "./App.css";
import { Header } from "./components/ui/header";
import { GameModeSelect } from "./components/pages/GameModeSelect";
import { HowToPlay } from "./components/pages/HowToPlay";
import { Game } from "./components/pages/Game";
import { Footer } from "./components/ui/footer";
import { GameProvider } from "./components/contexts/GameContext";

const PageContent = () => {
  const { currentPage } = useNavContext();

  switch (currentPage) {
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
          <Header />
          <NavProvider>
            <GameProvider>
              <main className="flex-grow place-content-center">
                <PageContent />
              </main>
            </GameProvider>
          </NavProvider>
        </GameModeProvider>
        <Footer />
      </div>
    </div>
  );
};
