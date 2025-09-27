import { FormEvent, useState } from "react";

import { addItem } from "../store/itemsSlice";
import { useAppDispatch } from "../store/hooks";
import Button from "./Button";

const AddItemForm = () => {
  const [name, setName] = useState("");
  const dispatch = useAppDispatch();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();
    if (!trimmedName) {
      return;
    }

    dispatch(addItem(trimmedName));
    setName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Item</h2>

      <input
        type="text"
        placeholder="Add new item"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <Button type="submit" disabled={name.trim() === ""}>
        Add Item
      </Button>
    </form>
  );
};

export default AddItemForm;
