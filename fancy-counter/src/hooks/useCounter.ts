import { useCallback, useEffect, useRef, useState } from "react";

type CounterConfig = {
  initial?: number;
  min?: number;
  max?: number;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const DEFAULT_MAX = Number.POSITIVE_INFINITY;

const useCounter = ({
  initial = 0,
  min = 0,
  max = DEFAULT_MAX,
}: CounterConfig = {}) => {
  if (min > max) {
    throw new Error("`min` cannot be greater than `max`.");
  }
  if (initial < min || initial > max) {
    throw new Error("`initial` must be within the range defined by `min` and `max`.");
  }

  const initialRef = useRef(initial);
  const [value, setValue] = useState(initial);

  useEffect(() => {
    initialRef.current = clamp(initial, min, max);
  }, [initial, min, max]);

  useEffect(() => {
    setValue((prev) => clamp(prev, min, max));
  }, [min, max]);

  const increment = useCallback(() => {
    setValue((prev) => (prev >= max ? prev : prev + 1));
  }, [max]);

  const decrement = useCallback(() => {
    setValue((prev) => (prev <= min ? prev : prev - 1));
  }, [min]);

  const reset = useCallback(() => {
    setValue(initialRef.current);
  }, []);

  return {
    value,
    canIncrement: value < max,
    canDecrement: value > min,
    isAtLimit: value === max,
    isAtFloor: value === min,
    isAtInitial: value === initialRef.current,
    increment,
    decrement,
    reset,
  };
};

export default useCounter;
