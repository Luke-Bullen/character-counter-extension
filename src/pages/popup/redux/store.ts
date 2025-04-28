import { configureStore } from '@reduxjs/toolkit';
import listSlice from './listSlice';

const store = configureStore({
  reducer: {
    list: listSlice,
  },
});

store.subscribe(() => {
  console.log('store sub', store.getState().list);
});
