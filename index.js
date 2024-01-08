/**
 * @format
 */
import React from 'react';
import {AppRegistry, Platform} from 'react-native';
import App from './app/App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {getStore, persistor} from './app/lib';
import {PersistGate} from 'redux-persist/integration/react';
import {fontType} from './app/assets/fontType';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

const ThePayee = () => {
  const store = getStore();
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <PaperProvider>
          <App />
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => ThePayee);
