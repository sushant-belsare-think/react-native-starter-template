import {createAsyncThunk} from '@reduxjs/toolkit';
import {AuthInteractorImpl} from '../interactors/AuthInteractor';
import {RootState} from '../../../../lib';
import {AUTH_REDUCER} from '../../constants/StoreConstant';

export const RefreshToSignInAsyncAction: any = createAsyncThunk<
  void,
  void,
  {state: RootState}
>(AUTH_REDUCER + '/logout', async (_, thunkApi) => {
  AuthInteractorImpl.getInstance().RefreshToSignInAndLogout(
    thunkApi.getState().auth,
    thunkApi.dispatch,
  );
});
