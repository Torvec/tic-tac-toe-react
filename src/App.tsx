import "./App.css";
import Header from "./components/ui/header";
import Mode from "./components/pages/mode";
// import Opponent from "./components/pages/opponent";
// import HowToPlay from "./components/pages/howToPlay";
// import Game from "./components/pages/game";
import Footer from "./components/ui/footer";

export default function App() {
  return (
    <div className="rounded-3xl bg-neutral-200">
      <div className="fullscreen container mx-auto flex flex-col">
        <Header />
        <main className="flex-grow place-content-center">
          <Mode />
          {/* <Opponent /> */}
          {/* <HowToPlay /> */}
          {/* <Game /> */}
        </main>
        <Footer />
      </div>
    </div>
  );
}
