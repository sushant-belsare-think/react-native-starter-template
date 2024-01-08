import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../../../lib';
import { PASSWORD_REDUCER } from '../../constants/StoreConstant';
import { PasswordInteractorImpl } from '../interactors/PasswordInteractor';
import { NavigationServiceImpl } from '../../../comman/store/services/NavigationServiceImpl';
import { Alert } from 'react-native';
import { lastValueFrom } from 'rxjs';
import { resetOtpResponseData, setOtpErrorforForgotPassword, setOtpSuccessMessage } from '../reducers/PasswordReducer';
import { setTokenInfo } from '../reducers/AuthReducer';

export const SubmitSignupVerificationOtpAction = createAsyncThunk<
  void,
  any,
  { state: RootState }
>(PASSWORD_REDUCER + '/otp', async (showModal, thunkApi) => {
  try {
    // console.log("showmodal from action"+showModal);
    
    const data =
      PasswordInteractorImpl.getInstance().handleOTPToSignupVerification(
        thunkApi.getState().password,
        thunkApi.dispatch,
      );

    const response: any = await lastValueFrom(data);

    if (response.code === 'OK') {
      console.log('Successfully created');
      // thunkApi.dispatch(resetOtpResponseData());
      if(showModal === 'login')
      {
        thunkApi.dispatch(setTokenInfo());
      }
      thunkApi.dispatch(setOtpSuccessMessage())
      NavigationServiceImpl.getInstance().navToLogin(thunkApi.dispatch);
    } else {
      Alert.alert('Failed', response?.response?.data?.message);
      // console.log("invalid otp ..... "+error?.response?.data?.message)
    }
  } catch (error) {
    console.log("error from login otp ........ "+JSON.stringify(error));
    
    thunkApi.dispatch(setOtpErrorforForgotPassword(error?.response?.data?.message))
    // Alert.alert('Failed', error?.response?.data?.message);
    // console.log("invalid otp ..... "+error?.response?.data?.message)
  }
});
