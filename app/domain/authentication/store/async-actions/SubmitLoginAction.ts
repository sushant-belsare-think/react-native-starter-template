import {createAsyncThunk} from '@reduxjs/toolkit';
import {takeLatest} from 'redux-saga/effects';
import {AuthInteractorImpl} from '../interactors/AuthInteractor';
import {RootState} from '../../../../lib';
import {lastValueFrom} from 'rxjs';
import {SUBMIT_LOGIN} from '../../constants/action';
import {AUTH_REDUCER} from '../../constants/StoreConstant';
import {IAction} from '../../../../config/ReduxHelperConfig';
import {profileApiDetailsAction} from './profileApiCall';
import { callProfileApi, tempAccessToken } from '../reducers/AuthReducer';

export const SubmitLoginAction = createAsyncThunk<any, any, {state: RootState}>(
  AUTH_REDUCER + '/login',
  async (data, thunkApi) => {
    const {role, FCMToken} = data;
    const $tokenData: any = AuthInteractorImpl.getInstance().handleLogin(
      role,
      thunkApi.getState().auth,
      thunkApi.dispatch,
    );
    const det: any = await lastValueFrom($tokenData);
    if (det.status === 200) {
      console.log("-------------------after login api call --------------------- "+JSON.stringify(det));
      
      // const profileApiRequestData = {
      //   accessToken: det.data.access_token,
      //   FCMToken: FCMToken,
      // };
      // thunkApi.dispatch(profileApiDetailsAction(profileApiRequestData));
      thunkApi.dispatch(tempAccessToken(det?.data.access_token))
      thunkApi.dispatch(callProfileApi())
    }

    return lastValueFrom($tokenData);
  },
);

function* SubmitLoginSaga({}: IAction) {}

function* SubmitLoginWatcher() {
  yield takeLatest(SUBMIT_LOGIN.request, SubmitLoginSaga);
}

export default SubmitLoginWatcher;
