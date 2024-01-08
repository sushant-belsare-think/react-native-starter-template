import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {persistedReducer} from './PersistConfig';
import createSagaMiddleware from '@redux-saga/core';
import {ToolkitStore} from '@reduxjs/toolkit/dist/configureStore';
import {IAuth} from '../domain/authentication/interfaces/IAuth';
import {rootSaga} from './WatcherConfig';
import {NavState} from '../navigation/Interface/NavState';
import {addTokenExpiredListenerstoAxiosInstance} from './AxiosConfig';

const saga = createSagaMiddleware();

export interface AppState {
  auth: IAuth;
  nav: NavState;
  password: any;
  chat: any;
  user: any;
  scan: any;
  history: any;
  notification: any;
}

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

export const createStore = (): ToolkitStore<AppState> => {
  const store = configureStore({
    reducer: persistedReducer,
    devTools: true,
    middleware: [...customizedMiddleware],
  });
  // saga.run(rootSaga);
  addTokenExpiredListenerstoAxiosInstance(store);
  return store;
};
