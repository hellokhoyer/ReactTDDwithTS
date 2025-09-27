import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ButtonGroup from "./ButtonGroup";
import ItemList from "./ItemList";
import { renderWithProviders } from "../test/test-utils";

describe("ButtonGroup", () => {
  it("marks all items as complete and incomplete", async () => {
    const user = userEvent.setup();

    renderWithProviders(
      <>
        <ButtonGroup />
        <ItemList />
      </>
    );

    const completeBtn = screen.getByRole("button", {
      name: /mark all as complete/i,
    });
    const incompleteBtn = screen.getByRole("button", {
      name: /mark all as incomplete/i,
    });

    await user.click(completeBtn);

    screen.getAllByRole("checkbox").forEach((checkbox) => {
      expect(checkbox).toBeChecked();
    });

    await user.click(incompleteBtn);

    screen.getAllByRole("checkbox").forEach((checkbox) => {
      expect(checkbox).not.toBeChecked();
    });
  });

  it("removes all items", async () => {
    const user = userEvent.setup();

    renderWithProviders(
      <>
        <ButtonGroup />
        <ItemList />
      </>
    );

    const removeBtn = screen.getByRole("button", {
      name: /remove all items/i,
    });

    await user.click(removeBtn);

    expect(screen.getByText(/empty packing list/i)).toBeInTheDocument();
  });
});
