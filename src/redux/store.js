import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { persistConfig } from './persistConfig';
import { combineReducers } from 'redux';
import flightsReducer from './slices/flightsSlice';
import mealsReducer from './slices/mealsSlice';

const rootReducer = combineReducers({
  flights: flightsReducer,
  meals: mealsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
