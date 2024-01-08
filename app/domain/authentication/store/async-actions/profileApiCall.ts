import axios from 'axios';
import {from} from 'rxjs';
import {get} from '../../../../config/ApiConfigs';
import {NavigationServiceImpl} from '../../../comman/store/services/NavigationServiceImpl';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../../../../lib';
import {
  resetLoginFormValues,
  setTokenInfo,
  showPayerPayeeModal,
  stopLoader,
} from '../reducers/AuthReducer';
import {resendOtpFromLoginFlow} from './resendOtpFromLoginFlow';
import {setProfileValue} from '../../../user-profile/store/reducers/UserProfileReducer';
import {sendTokenToServerAction} from '../../../notification/store/async-actions/SendTokenToServerAction';
import { setUsernameForOtpScreen } from '../reducers/PasswordReducer';

export const profileApiDetailsAction = createAsyncThunk<
  any,
  any,
  {state: RootState}
>('profile', async (data, thunkApi) => {
  const baseurl = thunkApi.getState().auth.baseUrl;
  console.log('baseurl in profileapicall ------>', baseurl);

  const {accessToken, FCMToken} = data;

  const options = {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    url: `${baseurl}/user/profile`,
  };

  const res = axios(options)
    .then(res => {
      console.log('🚀 ~ file: profileApiCall.ts:53 ~ > ~ res:', res);
      if (res.status === 201 || res.status === 200) {
        thunkApi.dispatch(stopLoader());
        if (res.data.data.emailVerified === true) {
          console.log(
            '🚀 ~ file: profileApiCall.ts:25 ~ > ~ FCMToken:',
            FCMToken,
          );
          // thunkApi.dispatch(sendTokenToServerAction(FCMToken));
          // thunkApi.dispatch(resetLoginFormValues());
          // thunkApi.dispatch(setProfileValue(res.data));
          // thunkApi.dispatch(setTokenInfo());
          // NavigationServiceImpl.getInstance().navToHomeScreen(
          //   thunkApi.dispatch,
          // );
          thunkApi.dispatch(showPayerPayeeModal())
        } else if (res.data.data.emailVerified === false) {
          thunkApi.dispatch(setUsernameForOtpScreen(thunkApi.getState().auth.loginFormValue.userName));
          thunkApi.dispatch(resendOtpFromLoginFlow());
        }
        // return res;
      }
    })
    .catch(err => {
      console.log('🚀 ~ file: profileApiCall.ts:59 ~ > ~ err:', err);
      thunkApi.dispatch(stopLoader());
    });
});

// export const profileApiDetailsAction = (action: any) => {
//     console.log("requestBody......****** **** " + JSON.stringify(action.payload.data.access_token));
//     // action.payload.data.access_token

//     const token = action.payload.data.access_token;
//     // const token = action.data.access_token;

//     console.log("token......" + token);

//     const options = {
//         method: 'GET',
//         headers: {
//             'content-type': 'application/json',
//             Authorization: `Bearer ${token}`
//         },
//         url: 'https://dev.api.baseURL.ai/user/profile',
//     };
//     //   return from(
//     const res = axios(options)
//         .then(res => {
//             console.log(
//                 'from anoter function',
//                 res,
//             );
//             if (res.status === 201 || res.status === 200) {
//                 return res;
//                 // NavigationServiceImpl.getInstance().navToHomeScreen(thunkApi.dispatch);
//                 // thunkApi.dispatch(resetLoginFormValues());
//             }
//         })
//         .catch(err => {
//             console.log(
//                 'from another function error',
//                 err,
//             );
//             // throw new Error(err?.response?.data?.message);
//             // return err?.response?.data?.message;
//         }
//         );

//     // return get(`/user/profile`, {
//     //     // baseURL: 'https://dev.chat.api.baseURL.ai/',
//     //     headers:{
//     //         Authorization
//     //     }

//     // })

// }
