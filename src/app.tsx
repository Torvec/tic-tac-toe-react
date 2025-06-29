import "./app.css";
import GameStateProvider from "./components/providers/game-state-provider";
import Header from "./components/ui/header";
import ScreenSelect from "./components/ui/screen-select";
import Footer from "./components/ui/footer";

export default function App() {
  return (
    <div className="p-2 md:p-8 space-y-4">
      <div className="mx-auto flex flex-col gap-8 rounded-3xl bg-neutral-200 px-2 py-8 md:justify-center md:p-8">
        <GameStateProvider>
          <Header />
          <main>
            <ScreenSelect />
          </main>
        </GameStateProvider>
      </div>
      <Footer />
    </div>
  );
}
