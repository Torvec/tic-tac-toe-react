export default function Footer() {
  return (
    <footer className="mx-auto">
      <a
        className="group flex gap-2 md:gap-4"
        href="https://edward-vonschondorf.dev"
      >
        <img
          src="logo_bo.png"
          alt="My EV Logo"
          className="size-8 self-center transition-transform duration-200 ease-in-out group-hover:-translate-y-1 md:size-10"
        />
        <div className="font-semibold md:text-xl">
          <span className="block text-neutral-800 transition-colors duration-300 ease-in-out group-hover:text-neutral-600">
            2025 Edward Vonschodorf
          </span>
          <span className="block text-orange-600 transition-colors duration-300 ease-in-out group-hover:text-orange-500">
            edward-vonschondorf.dev
          </span>
        </div>
      </a>
    </footer>
  );
}
