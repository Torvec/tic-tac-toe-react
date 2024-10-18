export const Footer = () => {
  const text = {
    year: 2024,
    name: "Edward Vonschondorf",
    website: "edward-vonschondorf.dev",
    link: "https://edward-vonschondorf.dev",
  };

  return (
    <footer className="py-8 md:flex md:justify-center md:gap-4">
      <div className="md:self-center">
        <img src="logo_bo.png" alt="My EV Logo" />
      </div>
      <div className="text-2xl">
        <p>
          {text.year} {text.name}
        </p>
        <a className="text-orange-600" href={text.link}>
          {text.website}
        </a>
      </div>
    </footer>
  );
};
