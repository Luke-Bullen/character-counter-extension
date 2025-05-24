import browser from 'webextension-polyfill';
import { configureStore } from '@reduxjs/toolkit';
import listSlice, { setOrder, setSavedEntries } from './listSlice';
import themeSlice, { setTheme } from './themeSlice';

const store = configureStore({
  reducer: {
    list: listSlice,
    theme: themeSlice,
  },
});

const setup = async () => {
  const {
    order,
    darkTheme,
    ...rest
  }: { order?: string[]; darkTheme?: boolean } =
    await browser.storage.local.get(null);
  if (order) store.dispatch(setOrder(order));
  if (darkTheme) store.dispatch(setTheme(darkTheme));
  store.dispatch(setSavedEntries(rest));
};

setup();

store.subscribe(async () => {
  const {
    list: { listOrder, savedEntries },
    theme: { darkTheme },
  } = store.getState();

  await browser.storage.local.set({ order: listOrder });

  await browser.storage.local.set(savedEntries);

  await browser.storage.local.set({ darkTheme });
});

export default store;
