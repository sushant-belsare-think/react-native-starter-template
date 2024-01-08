import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../../../../lib';
import {PASSWORD_REDUCER} from '../../constants/StoreConstant';
import {PasswordInteractorImpl} from '../interactors/PasswordInteractor';
import {NavigationServiceImpl} from '../../../comman/store/services/NavigationServiceImpl';
import {
  addOTPIdToReducerAction,
  resetForgotPasswordData,
  resetOtpResponseData,
  resetOtpValue,
  setSignupResendOtpError,
} from '../reducers/PasswordReducer';
import {Alert} from 'react-native';
import {lastValueFrom} from 'rxjs';

export const SubmitForgotpasswordResendOtpAction = createAsyncThunk<
  void,
  void,
  {state: RootState}
>(PASSWORD_REDUCER + '/forgotpasswordresendotp', async (_, thunkApi) => {
  try {
    const data = PasswordInteractorImpl.getInstance().forgotPasswordResendOtp(
      thunkApi.getState().password,
      thunkApi.dispatch,
    );

    const response: any = await lastValueFrom(data);

    if (response.code === 'OK') {
      // console.log("Successfully created")
      thunkApi.dispatch(resetOtpValue());
      thunkApi.dispatch(addOTPIdToReducerAction(response?.data?.otpId));
    } else {
      Alert.alert('Failed', response?.response?.data?.message);
    }
  } catch (error) {
    // Alert.alert('Failed', error?.response?.data?.message);
    thunkApi.dispatch(setSignupResendOtpError(error?.response?.data?.detail));
  }
});
