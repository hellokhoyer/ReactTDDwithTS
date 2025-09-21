import type { MouseEventHandler } from "react";
import { useCallback } from "react";
import Card from "./components/Card";
import useCounter from "./hooks/useCounter";

const COUNTER_BOUNDS = {
  min: 0,
  max: 10,
};

const App = () => {
  const {
    value: count,
    increment,
    decrement,
    reset,
    canIncrement,
    canDecrement,
    isAtLimit,
    isAtInitial,
  } = useCounter(COUNTER_BOUNDS);

  const handleIncrement = useCallback<
    MouseEventHandler<HTMLButtonElement>
  >(() => {
    increment();
  }, [increment]);

  const handleDecrement = useCallback<
    MouseEventHandler<HTMLButtonElement>
  >(() => {
    decrement();
  }, [decrement]);

  const handleReset = useCallback<MouseEventHandler<HTMLButtonElement>>(() => {
    reset();
  }, [reset]);

  return (
    <main>
      <Card
        count={count}
        onReset={handleReset}
        onDecrement={handleDecrement}
        onIncrement={handleIncrement}
        canIncrement={canIncrement}
        canDecrement={canDecrement}
        isAtLimit={isAtLimit}
        isAtInitial={isAtInitial}
      />
    </main>
  );
};

export default App;
