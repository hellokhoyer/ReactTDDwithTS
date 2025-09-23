import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import App from "./App";

const STORAGE_KEY = "word-analytics:last-checked-at";

describe("App", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-01-10T08:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
    window.localStorage.clear();
  });

  it("reads the saved timestamp on mount", () => {
    window.localStorage.setItem(STORAGE_KEY, "2025-01-08T08:00:00.000Z");

    render(<App />);

    expect(
      screen.getByText("Last checked limits: 2 days ago"),
    ).toBeInTheDocument();
  });

  it("persists the latest timestamp after stats update", () => {
    render(<App />);

    const textarea = screen.getByPlaceholderText("Enter your text");

    vi.setSystemTime(new Date("2025-01-10T12:00:00Z"));
    fireEvent.change(textarea, { target: { value: "Testing" } });

    expect(window.localStorage.getItem(STORAGE_KEY)).toBe(
      "2025-01-10T12:00:00.000Z",
    );
    expect(screen.getByText("Last checked limits: Today")).toBeInTheDocument();
  });
});
