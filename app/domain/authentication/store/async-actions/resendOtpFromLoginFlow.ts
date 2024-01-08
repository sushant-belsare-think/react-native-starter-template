import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../../../../lib';
import {PASSWORD_REDUCER} from '../../constants/StoreConstant';
import {PasswordInteractorImpl} from '../interactors/PasswordInteractor';
import {
  resetOtpValue,
  setSignupResendOtpError,
} from '../reducers/PasswordReducer';
import {Alert} from 'react-native';
import {lastValueFrom} from 'rxjs';
import {NavigationServiceImpl} from '../../../comman/store/services/NavigationServiceImpl';

export const resendOtpFromLoginFlow = createAsyncThunk<
  void,
  void,
  {state: RootState}
>(PASSWORD_REDUCER + '/resendotp', async (_, thunkApi) => {
  try {
    const data = PasswordInteractorImpl.getInstance().loginResendOtp(
      thunkApi.getState(),
      thunkApi.dispatch,
    );

    const response: any = await lastValueFrom(data);
    console.log(
      '🚀 ~ file: resendOtpFromLoginFlow.ts:25 ~ > ~ response:',
      response,
    );

    if (response.code === 'OK') {
      console.log('Successfully created');
      thunkApi.dispatch(resetOtpValue());
      NavigationServiceImpl.getInstance().navToOTPScreenFromLogin(
        thunkApi.dispatch,
      );
    } else {
      Alert.alert('Failed', response?.response?.data?.message);
    }
  } catch (error) {
    console.log('error form resend .....  ' + error);
    // Alert.alert('Failed', error?.response?.data?.message);
    thunkApi.dispatch(setSignupResendOtpError(error?.response?.data?.detail));
  }
});
