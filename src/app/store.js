import { configureStore } from '@reduxjs/toolkit';
import tabsReducer from '../features/tab/tabsSlice';
import paneReducer from '../features/pane/paneSlice';

const preloadedState = localStorage.getItem('reduxState')
    ? JSON.parse(localStorage.getItem('reduxState'))
    : {};

export default configureStore({
  reducer: {
    tabs: tabsReducer,
    pane: paneReducer
  },
  preloadedState
});

