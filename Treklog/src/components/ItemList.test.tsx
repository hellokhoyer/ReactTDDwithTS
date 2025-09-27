import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ItemList from "./ItemList";
import { renderWithProviders } from "../test/test-utils";

describe("ItemList", () => {
  it("renders all packing items and allows toggling", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ItemList />);

    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes).toHaveLength(3);
    expect(checkboxes[0]).not.toBeChecked();

    await user.click(checkboxes[0]);

    expect(checkboxes[0]).toBeChecked();
  });

  it("renders the empty view when no items exist", () => {
    renderWithProviders(<ItemList />, {
      preloadedState: {
        items: {
          items: [],
          nextId: 1,
        },
      },
    });

    expect(screen.getByText(/empty packing list/i)).toBeInTheDocument();
    expect(
      screen.getByText(/start by adding some items you absolutely/i)
    ).toBeInTheDocument();
  });
});

