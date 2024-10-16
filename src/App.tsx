import "./App.css";
import Header from "./components/ui/header";
import Button from "./components/ui/button";
import Footer from "./components/ui/footer";

export default function App() {
  return (
    <div className="rounded-3xl bg-neutral-200">
      <div className="container mx-auto flex min-h-screen flex-col">
        <Header />
        <main className="flex-grow">
          <Button type="large">A Square Button</Button>
          <Button type="small">A Rectangle Button</Button>
        </main>
        <Footer />
      </div>
    </div>
  );
}
