import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../../../../lib';
import {AUTH_REDUCER} from '../../constants/StoreConstant';
import {NavigationServiceImpl} from '../../../comman/store/services/NavigationServiceImpl';
import {
  addOTPIdToReducerAction,
  setForgotPasswordError,
  setUsernameValue,
} from '../reducers/PasswordReducer';
import {lastValueFrom} from 'rxjs';
import {AuthInteractorImpl} from '../interactors/AuthInteractor';

export const SubmitLoginNotVerifyAction = createAsyncThunk<
  void,
  void,
  {state: RootState}
>(AUTH_REDUCER + '/verify_username_from_login', async (_, thunkApi) => {
  try {
    const data = AuthInteractorImpl.getInstance().UsernameNotVerify(
      thunkApi.getState().auth,
      thunkApi.dispatch,
    );

    const response: any = await lastValueFrom(data);

    if (response.code === 'OK') {
      NavigationServiceImpl.getInstance().navToOTPScreenFromLogin(
        thunkApi.dispatch,
      );
    }
  } catch (error: any) {
    thunkApi.dispatch(setForgotPasswordError(error?.response?.data?.message));
  }
});
