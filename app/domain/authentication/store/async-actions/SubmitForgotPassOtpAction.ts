import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../../../../lib';
import {PASSWORD_REDUCER} from '../../constants/StoreConstant';
import {PasswordInteractorImpl} from '../interactors/PasswordInteractor';
import {NavigationServiceImpl} from '../../../comman/store/services/NavigationServiceImpl';
import {Alert} from 'react-native';
import {lastValueFrom} from 'rxjs';
import {
  resetOtpResponseData,
  setOtpErrorforForgotPassword,
  successMessageCreatePassword,
} from '../reducers/PasswordReducer';

export const SubmitForgotPassOtpAction = createAsyncThunk<
  void,
  void,
  {state: RootState}
>(PASSWORD_REDUCER + '/otp/signup', async (_, thunkApi) => {
  try {
    const data =
      PasswordInteractorImpl.getInstance().handleOTPToForgotVerification(
        thunkApi.getState().password,
      );

    const response: any = await lastValueFrom(data);
    // console.log(
    //   '🚀 ~ file: SubmitSignupOtpAction.ts:22 ~ > ~ response:',
    //   response,
    // );

    if (response.code === 'OK') {
      // console.log('Successfully created');
      // thunkApi.dispatch(resetOtpResponseData());
      thunkApi.dispatch(successMessageCreatePassword());
      NavigationServiceImpl.getInstance().navToCreatePassword(
        thunkApi.dispatch,
      );
    } else {
      Alert.alert('Failed22222', response?.response?.data?.message);
    }
  } catch (error) {
    thunkApi.dispatch(
      setOtpErrorforForgotPassword(error?.response?.data?.message),
    );
  }
});
