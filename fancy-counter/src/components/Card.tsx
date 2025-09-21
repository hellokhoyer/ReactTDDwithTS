import type { MouseEventHandler } from "react";
import Count from "./Count";
import CounterButton from "./CounterButton";
import ResetButton from "./ResetButton";
import Title from "./Title";

type CardProps = {
  count: number;
  canIncrement: boolean;
  canDecrement: boolean;
  isAtLimit: boolean;
  isAtInitial: boolean;
  onReset: MouseEventHandler<HTMLButtonElement>;
  onDecrement: MouseEventHandler<HTMLButtonElement>;
  onIncrement: MouseEventHandler<HTMLButtonElement>;
};

const Card = ({
  count,
  canIncrement,
  canDecrement,
  isAtLimit,
  isAtInitial,
  onReset,
  onDecrement,
  onIncrement,
}: CardProps) => (
  <div className={`card${isAtLimit ? " card--limit" : ""}`}>
    <Title />
    <Count value={count} isAtLimit={isAtLimit} />
    {isAtLimit && (
      <p className="count-message" role="alert">
        You reached the maximum value.
      </p>
    )}
    <ResetButton onReset={onReset} disabled={isAtInitial} />
    <div className="button-container">
      <CounterButton
        direction="decrement"
        className="count-btn count-btn--minus"
        onClick={onDecrement}
        disabled={!canDecrement}
      />
      <CounterButton
        direction="increment"
        className="count-btn count-btn--plus"
        onClick={onIncrement}
        disabled={!canIncrement}
      />
    </div>
  </div>
);

export default Card;
