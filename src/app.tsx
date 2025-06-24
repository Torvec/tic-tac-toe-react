import "./app.css";
import { GameStateProvider } from "./components/providers/game-state-provider";
import Header from "./components/ui/header";
import ScreenSelect from "./components/ui/screen-select";
import Footer from "./components/ui/footer";

export default function App() {
  return (
    <div className="p-4 md:p-8">
      <div className="fullscreen mx-auto flex flex-col justify-between gap-8 rounded-3xl bg-neutral-200 p-4 md:justify-center md:p-8">
        <GameStateProvider>
          <Header />
          <main>
            <ScreenSelect />
          </main>
        </GameStateProvider>
        <Footer />
      </div>
    </div>
  );
}
