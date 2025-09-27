import itemsReducer, {
  addItem,
  markAllPacked,
  markAllUnpacked,
  removeAll,
  resetToInitial,
  toggleItem,
} from "./itemsSlice";

describe("itemsSlice", () => {
  const initialState = itemsReducer(undefined, { type: "@@INIT" });

  it("adds new items with trimmed names", () => {
    const result = itemsReducer(initialState, addItem("  New Item  "));

    expect(result.items).toHaveLength(initialState.items.length + 1);
    expect(result.items.at(-1)).toMatchObject({
      name: "New Item",
      packed: false,
    });
  });

  it("ignores empty item names", () => {
    const result = itemsReducer(initialState, addItem("   "));

    expect(result.items).toHaveLength(initialState.items.length);
  });

  it("toggles individual items", () => {
    const targetId = initialState.items[0]!.id;

    const toggled = itemsReducer(initialState, toggleItem(targetId));
    expect(toggled.items[0]!.packed).toBe(true);

    const toggledBack = itemsReducer(toggled, toggleItem(targetId));
    expect(toggledBack.items[0]!.packed).toBe(false);
  });

  it("marks all items as packed and unpacked", () => {
    const packedState = itemsReducer(initialState, markAllPacked());
    packedState.items.forEach((item) => expect(item.packed).toBe(true));

    const unpackedState = itemsReducer(packedState, markAllUnpacked());
    unpackedState.items.forEach((item) => expect(item.packed).toBe(false));
  });

  it("resets to the initial items", () => {
    const modified = itemsReducer(initialState, addItem("Something"));
    const reset = itemsReducer(modified, resetToInitial());

    expect(reset.items).toEqual(initialState.items);
  });

  it("removes all items", () => {
    const cleared = itemsReducer(initialState, removeAll());

    expect(cleared.items).toHaveLength(0);
    expect(cleared.nextId).toBe(1);
  });
});

