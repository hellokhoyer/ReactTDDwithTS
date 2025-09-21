import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import type { MouseEventHandler } from "react";

type Direction = "decrement" | "increment";

type CounterButtonProps = {
  direction: Direction;
  onClick: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  disabled?: boolean;
};

const LABELS: Record<Direction, string> = {
  decrement: "Decrement",
  increment: "Increment",
};

const CounterButton = ({
  direction,
  onClick,
  className,
  disabled = false,
}: CounterButtonProps) => (
  <button
    type="button"
    className={className}
    onClick={onClick}
    aria-label={LABELS[direction]}
    disabled={disabled}
  >
    {direction === "decrement" ? (
      <MinusIcon className="count-btn-icon" />
    ) : (
      <PlusIcon className="count-btn-icon" />
    )}
  </button>
);

export default CounterButton;
