export default function Footer() {
  return (
    <footer className="mx-auto w-max">
      <a
        className="group flex justify-center gap-2"
        href="https://edward-vonschondorf.dev"
      >
        <img
          src="logo_bo.png"
          alt="My EV Logo"
          className="size-8 self-center transition-transform duration-200 ease-in-out group-hover:-translate-y-1"
        />
        <div className="font-medium">
          <span className="block text-neutral-800 transition-colors duration-200 ease-in-out group-hover:text-neutral-500">
            2025 Edward Vonschodorf
          </span>
          <span className="block text-orange-600 transition-colors duration-200 ease-in-out group-hover:text-orange-400">
            edward-vonschondorf.dev
          </span>
        </div>
      </a>
    </footer>
  );
}
