import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../../../../lib';
import {PASSWORD_REDUCER} from '../../constants/StoreConstant';
import {PasswordInteractorImpl} from '../interactors/PasswordInteractor';
import {NavigationServiceImpl} from '../../../comman/store/services/NavigationServiceImpl';
import {
  addOTPIdToReducerAction,
  setForgotPasswordError,
  setUsernameValue,
} from '../reducers/PasswordReducer';
import {lastValueFrom} from 'rxjs';

export const SubmitForgotPasswordMailSendAction = createAsyncThunk<
  void,
  void,
  {state: RootState}
>(PASSWORD_REDUCER + '/forgot', async (_, thunkApi) => {
  try {
    const data = PasswordInteractorImpl.getInstance().handleForgotPassword(
      thunkApi.getState().password,
      thunkApi.dispatch,
    );

    const response: any = await lastValueFrom(data);

    if (response.code === 'OK') {
      thunkApi.dispatch(
        setUsernameValue(thunkApi?.getState()?.password?.forgotPass?.email),
      );
      thunkApi.dispatch(addOTPIdToReducerAction(response?.data?.otpId));
      NavigationServiceImpl.getInstance().navToOTPScreen(thunkApi.dispatch);
    } 
  } catch (error: any) {
    thunkApi.dispatch(setForgotPasswordError(error?.response?.data?.message))
  }
});
