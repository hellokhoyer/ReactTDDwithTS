import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type PackingItem = {
  id: number;
  name: string;
  packed: boolean;
};

const baseItems: PackingItem[] = [
  { id: 1, name: "Item 1", packed: false },
  { id: 2, name: "Item 2", packed: false },
  { id: 3, name: "Item 3", packed: false },
];

const createInitialState = () => ({
  items: baseItems.map((item) => ({ ...item })),
  nextId: baseItems.length + 1,
});

type ItemsState = ReturnType<typeof createInitialState>;

const initialState: ItemsState = createInitialState();

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<string>) {
      const name = action.payload.trim();
      if (!name) {
        return;
      }

      state.items.push({ id: state.nextId, name, packed: false });
      state.nextId += 1;
    },
    toggleItem(state, action: PayloadAction<number>) {
      const item = state.items.find((entry) => entry.id === action.payload);
      if (item) {
        item.packed = !item.packed;
      }
    },
    markAllPacked(state) {
      state.items.forEach((item) => {
        item.packed = true;
      });
    },
    markAllUnpacked(state) {
      state.items.forEach((item) => {
        item.packed = false;
      });
    },
    resetToInitial() {
      return createInitialState();
    },
    removeAll(state) {
      state.items = [];
      state.nextId = 1;
    },
  },
});

export const {
  addItem,
  toggleItem,
  markAllPacked,
  markAllUnpacked,
  resetToInitial,
  removeAll,
} = itemsSlice.actions;

export default itemsSlice.reducer;
