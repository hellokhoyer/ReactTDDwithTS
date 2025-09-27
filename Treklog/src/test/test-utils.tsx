import { render, type RenderOptions } from "@testing-library/react";
import type { PreloadedState } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import type { PropsWithChildren, ReactElement } from "react";
import { Provider } from "react-redux";

import itemsReducer from "../store/itemsSlice";
import type { AppDispatch, RootState } from "../store";

type AppStore = ReturnType<typeof setupStore>;

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: {
      items: itemsReducer,
    },
    preloadedState,
  });
}

type ExtendedRenderOptions = {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
} & Omit<RenderOptions, "wrapper">;

export function renderWithProviders(
  ui: ReactElement,
  {
    preloadedState,
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren) {
    return <Provider store={store}>{children}</Provider>;
  }

  return {
    store,
    dispatch: store.dispatch as AppDispatch,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}
