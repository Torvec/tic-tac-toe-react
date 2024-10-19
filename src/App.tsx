import { NavProvider } from "./components/contexts/NavContext";
import { OptionsProvider } from "./components/contexts/OptionsContext";
import { useNavContext } from "./components/hooks/useNavContext";
import "./App.css";
import { Header } from "./components/ui/header";
import { Mode } from "./components/pages/mode";
import { HowToPlay } from "./components/pages/howToPlay";
import { Game } from "./components/pages/game/Game";
import { Footer } from "./components/ui/footer";

const PageContent = () => {
  const { currentPage } = useNavContext();

  const pages = {
    mode: <Mode />,
    howToPlay: <HowToPlay />,
    game: <Game />,
  };

  return pages[currentPage];
};

export const App = () => {
  return (
    <div className="rounded-3xl bg-neutral-200">
      <div className="fullscreen container mx-auto flex flex-col">
        <OptionsProvider>
          <Header />
          <NavProvider>
            <main className="flex-grow place-content-center">
              <PageContent />
            </main>
          </NavProvider>
        </OptionsProvider>
        <Footer />
      </div>
    </div>
  );
};
