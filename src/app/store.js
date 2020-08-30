import { configureStore } from '@reduxjs/toolkit';
import consoleReducer from '../features/console/consoleSlice';

export default configureStore({
  reducer: {
    console: consoleReducer,
  },
});
