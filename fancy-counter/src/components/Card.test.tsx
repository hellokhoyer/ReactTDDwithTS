import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Card from "./Card";

vi.mock("./Title", () => ({
  default: () => <div data-testid="title">Title</div>,
}));
vi.mock("./Count", () => ({
  default: ({
    value,
    isAtLimit,
  }: {
    value: number;
    isAtLimit: boolean;
  }) => (
    <div data-testid="count" data-limit={isAtLimit}>
      {value}
    </div>
  ),
}));
vi.mock("./ResetButton", () => ({
  default: ({
    onReset,
    disabled,
  }: {
    onReset: () => void;
    disabled: boolean;
  }) => (
    <button
      type="button"
      data-testid="reset"
      onClick={onReset}
      disabled={disabled}
    >
      Reset
    </button>
  ),
}));

describe("Card", () => {
  it("renders all child components and handles button clicks", () => {
    const onReset = vi.fn();
    const onDecrement = vi.fn();
    const onIncrement = vi.fn();
    render(
      <Card
        count={5}
        onReset={onReset}
        onDecrement={onDecrement}
        onIncrement={onIncrement}
        canIncrement
        canDecrement
        isAtLimit={false}
        isAtInitial={false}
      />
    );
    expect(screen.getByTestId("title")).toBeInTheDocument();
    expect(screen.getByTestId("count")).toHaveTextContent("5");
    fireEvent.click(screen.getByTestId("reset"));
    expect(onReset).toHaveBeenCalled();

    const decrementBtn = screen.getByRole("button", { name: /decrement/i });
    fireEvent.click(decrementBtn);
    expect(onDecrement).toHaveBeenCalled();

    const incrementBtn = screen.getByRole("button", { name: /increment/i });
    fireEvent.click(incrementBtn);
    expect(onIncrement).toHaveBeenCalled();

    expect(decrementBtn.querySelector("svg")).toBeInTheDocument();
    expect(incrementBtn.querySelector("svg")).toBeInTheDocument();

    expect(decrementBtn).toHaveAttribute("aria-label", "Decrement");
    expect(incrementBtn).toHaveAttribute("aria-label", "Increment");
  });

  it("disables controls and surfaces limit state", () => {
    const handlers = {
      onReset: vi.fn(),
      onDecrement: vi.fn(),
      onIncrement: vi.fn(),
    };

    const { rerender } = render(
      <Card
        count={0}
        onReset={handlers.onReset}
        onDecrement={handlers.onDecrement}
        onIncrement={handlers.onIncrement}
        canIncrement
        canDecrement={false}
        isAtLimit={false}
        isAtInitial
      />
    );

    expect(screen.getByTestId("count")).toHaveAttribute("data-limit", "false");
    expect(screen.getByTestId("reset")).toBeDisabled();
    const decrementBtn = screen.getByRole("button", { name: /decrement/i });
    expect(decrementBtn).toBeDisabled();
    fireEvent.click(decrementBtn);
    expect(handlers.onDecrement).not.toHaveBeenCalled();

    rerender(
      <Card
        count={10}
        onReset={handlers.onReset}
        onDecrement={handlers.onDecrement}
        onIncrement={handlers.onIncrement}
        canIncrement={false}
        canDecrement
        isAtLimit
        isAtInitial={false}
      />
    );

    expect(screen.getByText(/maximum value/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /increment/i })).toBeDisabled();
    expect(screen.getByTestId("count")).toHaveAttribute("data-limit", "true");
  });
});
