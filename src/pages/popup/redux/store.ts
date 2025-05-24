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
    listOrder,
    darkTheme,
    ...rest
  }: { listOrder?: string[]; darkTheme?: boolean } =
    await browser.storage.local.get(null);
  if (listOrder) store.dispatch(setOrder(listOrder));
  if (darkTheme) store.dispatch(setTheme(darkTheme));
  store.dispatch(setSavedEntries(rest));
};

setup();

store.subscribe(async () => {
  const {
    list: { listOrder, savedEntries },
    theme: { darkTheme },
  } = store.getState();

  await browser.storage.local.set({ listOrder });

  await browser.storage.local.set(savedEntries);

  await browser.storage.local.set({ darkTheme });
});

export default store;
