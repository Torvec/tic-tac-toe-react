import "./app.css";
import GameStateProvider from "./components/providers/game-state-provider";
import Header from "./components/ui/header";
import ScreenSelect from "./components/ui/screen-select";
import Footer from "./components/ui/footer";

export default function App() {
  return (
    <div className="space-y-4 md:pt-8">
      <div className="mx-auto flex max-w-2xl flex-col bg-neutral-200 pb-8 md:aspect-square md:justify-center md:rounded-3xl md:p-8">
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
