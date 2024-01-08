import AsyncStorage from '@react-native-async-storage/async-storage';
import {Reducer, combineReducers} from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import {AppState} from './StoreConfig';
import authReducer from '../domain/authentication/store/reducers/AuthReducer';
import navigationReducer from '../domain/comman/store/reducers/NavigationReducer';
import passwordReducer from '../domain/authentication/store/reducers/PasswordReducer';
import chatReducer from '../domain/chat/store/reducers/ChatReducer';
import userProfileReducer from '../domain/user-profile/store/reducers/UserProfileReducer';
import scanReducer from '../domain/scan/store/reducers/ScanReducer';
import historyReducer from '../domain/history/store/reducers/HistoryReducer';
import notificationReducer from '../domain/notification/store/reducers/notificationSettingReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
};

const rootReducer: Reducer<AppState> = combineReducers({
  auth: authReducer,
  nav: navigationReducer,
  password: passwordReducer,
  chat: chatReducer,
  user: userProfileReducer,
  scan: scanReducer,
  history: historyReducer,
  notification: notificationReducer,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);
