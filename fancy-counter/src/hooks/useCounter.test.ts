import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import useCounter from "./useCounter";

describe("useCounter", () => {
  it("respects bounds and exposes derived state", () => {
    const { result } = renderHook(() => useCounter({ min: 0, max: 2 }));

    expect(result.current.value).toBe(0);
    expect(result.current.canDecrement).toBe(false);
    expect(result.current.isAtInitial).toBe(true);

    act(() => {
      result.current.decrement();
    });
    expect(result.current.value).toBe(0);

    act(() => {
      result.current.increment();
    });
    expect(result.current.value).toBe(1);
    expect(result.current.canDecrement).toBe(true);

    act(() => {
      result.current.increment();
    });
    expect(result.current.value).toBe(2);
    expect(result.current.isAtLimit).toBe(true);
    expect(result.current.canIncrement).toBe(false);

    act(() => {
      result.current.increment();
    });
    expect(result.current.value).toBe(2);

    act(() => {
      result.current.reset();
    });
    expect(result.current.value).toBe(0);
    expect(result.current.isAtInitial).toBe(true);
  });

  it("updates when bounds change", () => {
    const { result, rerender } = renderHook(
      ({ min, max, initial }) => useCounter({ min, max, initial }),
      {
        initialProps: { min: 0, max: 5, initial: 2 },
      }
    );

    expect(result.current.value).toBe(2);

    rerender({ min: 1, max: 3, initial: 1 });
    act(() => {
      result.current.decrement();
    });
    expect(result.current.value).toBe(1);
    expect(result.current.isAtFloor).toBe(true);

    act(() => {
      result.current.reset();
    });
    expect(result.current.value).toBe(1);
    expect(result.current.isAtInitial).toBe(true);
  });
});
