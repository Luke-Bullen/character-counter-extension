import browser from 'webextension-polyfill';
import { configureStore } from '@reduxjs/toolkit';
import listSlice, { setOrder, setSavedEntries } from './listSlice';

const store = configureStore({
  reducer: {
    list: listSlice,
  },
});

const setup = async () => {
  const { order, ...rest }: { order?: string[] } =
    await browser.storage.local.get(null);
  if (order) store.dispatch(setOrder(order));
  store.dispatch(setSavedEntries(rest));
};

setup();

store.subscribe(async () => {
  const { listOrder, savedEntries } = store.getState().list;

  await browser.storage.local.set({ order: listOrder });

  await browser.storage.local.set(savedEntries);
});

export default store;
