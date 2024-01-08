import {AnyAction, ThunkDispatch} from '@reduxjs/toolkit';
import {Persistor, persistStore} from 'redux-persist';
import {AppState, createStore} from '../../config/StoreConfig';
import {ToolkitStore} from '@reduxjs/toolkit/dist/configureStore';

const store: ToolkitStore<AppState> = createStore();
export const persistor: Persistor = persistStore(store);

export const getStore = () => {
  return store;
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;
