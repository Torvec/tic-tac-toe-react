import { NavProvider } from "./components/contexts/NavContext";
import { useNavContext } from "./components/hooks/useNavContext";
import "./App.css";
import { Header } from "./components/ui/header";
import { Mode } from "./components/pages/mode";
import { Opponent } from "./components/pages/opponent";
import { HowToPlay } from "./components/pages/howToPlay";
import { Game } from "./components/pages/game";
import { Footer } from "./components/ui/footer";

const MainContent = () => {
  const { currentPage } = useNavContext();

  const pages = {
    mode: <Mode />,
    opponent: <Opponent />,
    howToPlay: <HowToPlay />,
    game: <Game />,
  };

  return pages[currentPage];
};

export const App = () => {
  return (
    <div className="rounded-3xl bg-neutral-200">
      <div className="fullscreen container mx-auto flex flex-col">
        <Header />
        <main className="flex-grow place-content-center">
          <NavProvider>
            <MainContent />
          </NavProvider>
        </main>
        <Footer />
      </div>
    </div>
  );
};
