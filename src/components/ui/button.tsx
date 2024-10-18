import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  type: "large" | "small";
  onClick: () => void;
}

const classNames = {
  large:
    "bg-neutral-700 text-neutral-300 rounded-xl py-20 px-10 uppercase text-3xl font-bold",
  small:
    "bg-neutral-700 text-neutral-300 rounded-xl py-5 px-20 uppercase text-3xl font-bold",
};

export const Button = ({ children, type, onClick }: ButtonProps) => {
  const className = classNames[type];

  return <button className={className} onClick={onClick}>{children}</button>;
};
