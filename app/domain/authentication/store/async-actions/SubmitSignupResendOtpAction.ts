import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../../../lib';
import { PASSWORD_REDUCER } from '../../constants/StoreConstant';
import { PasswordInteractorImpl } from '../interactors/PasswordInteractor';
import { resetOtpValue, setSignupResendOtpError } from '../reducers/PasswordReducer';
import { Alert } from 'react-native';
import { lastValueFrom } from 'rxjs';

export const SubmitSignupResendOtpAction = createAsyncThunk<
  void,
  void,
  { state: RootState }
>(PASSWORD_REDUCER + '/resendotp', async (_, thunkApi) => {
  try {
    const data = PasswordInteractorImpl.getInstance().signupResendOtp(
      thunkApi.getState().password,
      thunkApi.dispatch,
    );

    const response: any = await lastValueFrom(data);

    if (response.code === 'OK') {
      console.log("Successfully created")
      thunkApi.dispatch(resetOtpValue());
    } else {
      Alert.alert('Failed', response?.response?.data?.message);
    }
  } catch (error) {
    console.log("error form resend .....  "+error?.response?.data?.detail)
    // Alert.alert('Failed', error?.response?.data?.message);
    thunkApi.dispatch(setSignupResendOtpError(error?.response?.data?.detail))
  }
});
