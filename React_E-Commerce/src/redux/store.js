import { configureStore } from '@reduxjs/toolkit';
import rootReducers from './reducer';
import { loadState, saveState } from './reducer/localStorage';

const preloadedState = loadState();

const store = configureStore({
  reducer: rootReducers,
  preloadedState,
});

// Subscribe to store changes and save the state to localStorage
store.subscribe(() => {
  saveState(store.getState());
});

export default store;
