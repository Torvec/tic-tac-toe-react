import { useState } from "react";
import { NavContext, type Page } from "./components/contexts/NavContext";
import "./App.css";
import { Header } from "./components/ui/header";
import { Mode } from "./components/pages/mode";
import { Opponent } from "./components/pages/opponent";
import { HowToPlay } from "./components/pages/howToPlay";
import { Game } from "./components/pages/game";
import { Footer } from "./components/ui/footer";

export const App = () => {
  const [currentPage, setCurrentPage] = useState<Page>("mode");

  const pages = {
    mode: <Mode />,
    opponent: <Opponent />,
    howToPlay: <HowToPlay />,
    game: <Game />,
  };

  return (
    <div className="rounded-3xl bg-neutral-200">
      <div className="fullscreen container mx-auto flex flex-col">
        <Header />
        <main className="flex-grow place-content-center">
          <NavContext.Provider value="mode">
            {pages[currentPage]}
          </NavContext.Provider>
        </main>
        <Footer />
      </div>
    </div>
  );
};
