import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import Textarea from "../Textarea";

describe("Textarea", () => {
  it("invokes the callback with calculated stats", () => {
    const onStatsChange = vi.fn();
    render(<Textarea onStatsChange={onStatsChange} />);

    const textarea = screen.getByPlaceholderText("Enter your text");

    fireEvent.change(textarea, { target: { value: "Hello world" } });

    expect(onStatsChange).toHaveBeenCalledTimes(1);
    expect(onStatsChange).toHaveBeenCalledWith({
      numberOfWords: 2,
      numberOfCharacters: 11,
      instagramCharactersLeft: 269,
      facebookCharactersLeft: 2189,
    });
  });

  it("sanitizes disallowed input and shows a warning", () => {
    const onStatsChange = vi.fn();
    render(<Textarea onStatsChange={onStatsChange} />);

    const textarea = screen.getByPlaceholderText("Enter your text");
    fireEvent.change(textarea, { target: { value: "Go<script>" } });

    expect(textarea).toHaveValue("Go");
    expect(
      screen.getByText("You can't use <script> in your text."),
    ).toBeInTheDocument();
    expect(onStatsChange).toHaveBeenCalledWith({
      numberOfWords: 1,
      numberOfCharacters: 2,
      instagramCharactersLeft: 278,
      facebookCharactersLeft: 2198,
    });
  });
});
