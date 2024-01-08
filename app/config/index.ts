import Config from 'react-native-config';

const config = {
  api: {
    baseUrl: Config.BASE_URL_API,
  },
  token: {
    tokenKeySecureStorage: Config.TOKEN_KEY_SECURE_STORAGE,
    tokenTimeout: parseInt(Config.TOKEN_TIMEOUT, 10),
  },
};

const BASE_URL_API = config.api.baseUrl;
const TOKEN_KEY_SECURE_STORAGE = config.token.tokenKeySecureStorage;
const TOKEN_TIMEOUT = config.token.tokenTimeout;

export {BASE_URL_API, TOKEN_KEY_SECURE_STORAGE, TOKEN_TIMEOUT};
