import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Stats from "../Stats";

const stats = {
  numberOfWords: 3,
  numberOfCharacters: 15,
  instagramCharactersLeft: -5,
  facebookCharactersLeft: 42,
};

describe("Stats", () => {
  it("renders each stat with its label", () => {
    render(<Stats stats={stats} />);

    expect(screen.getByText("Words")).toBeInTheDocument();
    expect(screen.getByText("Characters")).toBeInTheDocument();
    expect(screen.getByText("Instagram")).toBeInTheDocument();
    expect(screen.getByText("Facebook")).toBeInTheDocument();

    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("15")).toBeInTheDocument();
    expect(screen.getByText("-5")).toHaveClass("stat__number--limit");
    expect(screen.getByText("42")).toBeInTheDocument();
  });
});
