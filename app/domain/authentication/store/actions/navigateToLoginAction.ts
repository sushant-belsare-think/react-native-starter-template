import {createAsyncThunk} from '@reduxjs/toolkit';
import {AuthInteractorImpl} from '../interactors/AuthInteractor';
import {RootState} from '../../../../lib';
import {AUTH_REDUCER} from '../../constants/StoreConstant';

export const navigateToLoginAction = createAsyncThunk<
  any,
  void,
  {state: RootState}
>(AUTH_REDUCER + '/NavToLogin', async (_, thunkApi) => {
  const $tokenData: any = AuthInteractorImpl.getInstance().navToLogin(
    thunkApi.getState().auth,
    thunkApi.dispatch,
  );
 
});

