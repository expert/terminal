import { configureStore } from '@reduxjs/toolkit';
import tabsReducer from '../features/tab/tabsSlice';

export default configureStore({
  reducer: {
    tabs: tabsReducer,
  },
});
