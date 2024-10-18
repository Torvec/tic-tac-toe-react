import { ReactNode } from "react";

type ButtonTypes = "large" | "small";

interface ButtonProps {
  children: ReactNode;
  type: ButtonTypes;
  onClick: () => void;
}

const classNames = {
  large:
    "bg-neutral-700 text-neutral-300 rounded-xl uppercase text-3xl font-bold min-w-96 min-h-96 hover:bg-neutral-400 hover:text-neutral-700 hover:transition-colors hover:duration-300 hover:ease-in-out",
  small:
    "bg-neutral-200 border-2 border-neutral-700 text-neutral-700 rounded-xl py-4 min-w-96 uppercase text-2xl font-bold hover:bg-neutral-400 hover:text-white hover:border-neutral-400 hover:transition-all hover:duration-300 hover:ease-in-out",
};

export const Button = ({ children, type, onClick }: ButtonProps) => {
  const className = classNames[type];

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
};
