import { screen } from "@testing-library/react";

import Counter from "./Counter";
import { renderWithProviders } from "../test/test-utils";

describe("Counter", () => {
  it("shows the packing progress", () => {
    renderWithProviders(<Counter />);

    expect(screen.getByText(/0 of 3 items packed/i)).toBeInTheDocument();
  });

  it("prompts the user when the list is empty", () => {
    renderWithProviders(<Counter />, {
      preloadedState: {
        items: {
          items: [],
          nextId: 1,
        },
      },
    });

    expect(screen.getByText(/add items to get started/i)).toBeInTheDocument();
  });
});

