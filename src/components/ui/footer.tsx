export default function Footer() {
  return (
    <footer className="py-8 md:flex md:justify-center md:gap-4">
      <div className="md:self-center">
        <img src="logo_bo.png" alt="My EV Logo" />
      </div>
      <div className="text-2xl">
        <p>2024 Edward Vonschondorf</p>
        <a className="text-orange-600" href="https://edward-vonschondorf.dev">
          edward-vonschondorf.dev
        </a>
      </div>
    </footer>
  );
}
