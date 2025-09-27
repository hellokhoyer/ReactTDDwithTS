import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import AddItemForm from "./AddItemForm";
import ItemList from "./ItemList";
import { renderWithProviders } from "../test/test-utils";

describe("AddItemForm", () => {
  it("disables the submit button when the input is empty", () => {
    renderWithProviders(<AddItemForm />);

    const submitButton = screen.getByRole("button", { name: /add item/i });
    expect(submitButton).toBeDisabled();
  });

  it("adds a new item to the list", async () => {
    const user = userEvent.setup();

    renderWithProviders(
      <>
        <AddItemForm />
        <ItemList />
      </>
    );

    const input = screen.getByPlaceholderText(/add new item/i);
    const submit = screen.getByRole("button", { name: /add item/i });

    await user.type(input, "Water Bottle");
    await user.click(submit);

    expect(screen.getByText("Water Bottle")).toBeInTheDocument();
    expect(input).toHaveValue("");
  });
});

