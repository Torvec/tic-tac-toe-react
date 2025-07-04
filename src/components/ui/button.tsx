import { type ButtonProps } from "../../types";

const classNames = {
  large:
    "cursor-pointer bg-neutral-700 text-neutral-300 rounded-xl uppercase text-3xl font-bold aspect-square size-full hover:bg-neutral-400 hover:text-neutral-700 hover:transition-colors hover:duration-300 hover:ease-in-out",
  small:
    "cursor-pointer bg-neutral-200 border-2 border-neutral-700 text-neutral-700 rounded-xl py-2 w-full max-w-96 uppercase text-xl font-bold hover:bg-neutral-400 hover:text-white hover:border-neutral-400 hover:transition-all hover:duration-300 hover:ease-in-out",
};

export default function Button({ children, type, onClick }: ButtonProps) {
  const className = classNames[type];

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}
