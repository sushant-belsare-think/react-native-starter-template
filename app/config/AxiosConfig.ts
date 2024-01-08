import {instance} from './ApiConfigs';
import unprotectedPathes from '../domain/authentication/constants/UnprotectedPath';
import {AppState} from './StoreConfig';
import {ToolkitStore} from '@reduxjs/toolkit/dist/configureStore';
import {RefreshToSignInAsyncAction} from '../domain/authentication/store/actions/RefreshToSignInAsyncAction';
import axios from 'axios';
import qs from 'qs';
import {setTokenDataToReducer} from '../domain/authentication/store/reducers/AuthReducer';

export function addTokenExpiredListenerstoAxiosInstance(
  store: ToolkitStore<AppState>,
) {
  const refreshTokenHelper = async () => {
    try {
      const auth = store.getState().auth;
      const body = {
        grant_type: 'refresh_token',
        refresh_token: auth.token.refresh_token,
        client_id: auth.authClientId,
        client_secret: auth.authClientSecret,
      };
      console.log('***************axios error ******************'+JSON.stringify(auth.token));
      // *** CREATE REFRESH TOKEN CONSTANT FIRST (CREATE ACTION BY TYPE) AND THEN UNCOMMENT IT ***
      // store.dispatch(refreshToken.request());
      // *** SETUP API CALL THEN UNCOMMENT LINE & CREATE REFRESH TOKEN CONSTANT (CREATE ACTION BY TYPE) 14 to 22 ***

      const options = {
        method: 'POST',
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        data: qs.stringify(body),
        url: auth.authbaseUrl + '/protocol/openid-connect/token',
      };
      axios(options)
        .then(res => {
          console.log(
            '🚀 ~ file: AxiosConfig.ts:47 ~ refreshTokenHelper ~ res:',
            res,
          );
          if (res.status === 200) {
            store.dispatch(setTokenDataToReducer(res?.data));
          }
        })
        .catch(error => {
          console.log('🚀 ~ file: AxiosConfig.ts:40 ~ axios ~ error:', error);
          store.dispatch(RefreshToSignInAsyncAction());
        });
    } catch (error) {
      // *** CREATE SHOW NOTIFICATION COMMAN ALERT BOX THEN UNCOMMENT IT ***
      //   showErrorNotification(String(error.message));
      // *** CREATE REFRESH TOKEN CONSTANT FIRST (CREATE ACTION BY TYPE) AND THEN UNCOMMENT IT ***
      //   store.dispatch(refreshToken.failure(error));
    }
  };

  instance.interceptors.request.use(async (config: any) => {
    if (!unprotectedPathes[config.url]) {
      try {
        const auth = store.getState().auth;
        // console.log(
        //   '🚀 ~ file: AxiosConfig.ts:53 ~ instance.interceptors.request.use ~ auth:',
        //   auth,
        // );
        // if (Date.now() >= auth.token.expires_in * 1000) {
        //   if (Date.now() > auth.token.refresh_expires_in * 1000) {
        //     await refreshTokenHelper();
        //   } else {
        //     store.dispatch(RefreshToSignInAsyncAction());
        //   }
        // }
        config.headers.Authorization = `Bearer ${auth.token.access_token}`;
      } catch (e) {
        //     *** LEARN REACTRON ***
        // reactotron.log(e);
      }
    }
    return config;
  });

  instance.interceptors.response.use(
    response => response,
    async error => {
      // console.log('🚀 ~ file: AxiosConfig.ts:83 ~ error:', error);
      if (error.response && error.response.status) {
        if (error.response.status === 401) {
          refreshTokenHelper();
          // *** CREATE LOGIN OUT CONSTANT WITH (CREATE ACTION WITH TYPE) AND THEN UNCOMMENT ***
          // store.dispatch(RefreshToSignInAsyncAction());
        }
      }
      return await Promise.reject(error);
    },
  );
}
