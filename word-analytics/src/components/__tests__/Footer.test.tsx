import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import Footer from "../Footer";

describe("Footer", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-01-10T08:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("shows fallback message when the timestamp is missing", () => {
    render(<Footer lastCheckedAt={null} />);

    expect(screen.getByText("Last checked limits: Never")).toBeInTheDocument();
  });

  it("shows relative days when the timestamp is in the past", () => {
    render(<Footer lastCheckedAt="2025-01-09T08:00:00.000Z" />);

    expect(
      screen.getByText("Last checked limits: 1 day ago"),
    ).toBeInTheDocument();
  });
});
