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

store.subscribe(() => {
  console.log('store sub', store.getState().list);
});
