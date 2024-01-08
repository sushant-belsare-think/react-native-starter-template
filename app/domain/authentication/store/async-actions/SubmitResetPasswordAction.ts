import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../../../../lib';
import {PASSWORD_REDUCER} from '../../constants/StoreConstant';
import {PasswordInteractorImpl} from '../interactors/PasswordInteractor';
import {lastValueFrom} from 'rxjs';
import {NavigationServiceImpl} from '../../../comman/store/services/NavigationServiceImpl';
import {Alert} from 'react-native';
import {
  resetCreatePasswordValue,
  resetForgotPasswordData,
  resetOtpResponseData,
  setResetPasswordError,
  setSuccessMessageOnLogin,
} from '../reducers/PasswordReducer';

export const SubmitResetPasswordAction = createAsyncThunk<
  void,
  void,
  {state: RootState}
>(PASSWORD_REDUCER + '/reset', async (_, thunkApi) => {
  try {
    const data = PasswordInteractorImpl.getInstance().handleResetPassword(
      thunkApi.getState().password,
      thunkApi.dispatch,
    );

    const response: any = await lastValueFrom(data);
    // console.log(
    //   '🚀 ~ file: SubmitResetPasswordAction.ts:22 ~ > ~ response:',
    //   response,
    // );

    if (response.code === 'OK') {
      thunkApi.dispatch(resetOtpResponseData());
      thunkApi.dispatch(resetForgotPasswordData());
      thunkApi.dispatch(resetCreatePasswordValue());
      thunkApi.dispatch(setSuccessMessageOnLogin());

      console.log('log for reset *********');

      NavigationServiceImpl.getInstance().navToLogin(thunkApi.dispatch);
    } else {
      Alert.alert('Failed', response?.response?.data?.message);
    }
  } catch (error) {
    thunkApi;
    // Alert.alert('Failed', error?.response?.data?.detail);
    console.log(
      'error from create pass ********** ' +
        JSON.stringify(error?.response?.data),
    );
    const errorMessage = error?.response?.data?.detail
      ? error?.response?.data?.detail
      : error?.response?.data?.message;
    errorMessage && thunkApi.dispatch(setResetPasswordError(errorMessage));
  }
});
