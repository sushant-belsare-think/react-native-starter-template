import {createAsyncThunk} from '@reduxjs/toolkit';
import {takeLatest} from 'redux-saga/effects';
import {AuthInteractorImpl} from '../interactors/AuthInteractor';
import {RootState} from '../../../../lib';
import {lastValueFrom} from 'rxjs';
import {AUTH_REDUCER} from '../../constants/StoreConstant';
import {NavigationServiceImpl} from '../../../comman/store/services/NavigationServiceImpl';
import {IAction} from '../../../../config/ReduxHelperConfig';
import {SUBMIT_SIGNUP} from '../../constants/action';
import {resetSignupFormValues} from '../reducers/AuthReducer';
import {setUsernameValue} from '../reducers/PasswordReducer';

export const SubmitSignupAction = createAsyncThunk<
  any,
  void,
  {state: RootState}
>(AUTH_REDUCER + '/signup', async (_, thunkApi) => {
  const $tokenData: any = AuthInteractorImpl.getInstance().handleSignup(
    thunkApi.getState().auth,
    thunkApi.dispatch,
  );
  const det: any = await lastValueFrom($tokenData);
  console.log('🚀 ~ file: SubmitSignUpAction.ts:22 ~ > ~ det:', det);
  if (det.status === 200 || det.status === 201) {
    thunkApi.dispatch(
      setUsernameValue(thunkApi.getState().auth.signupFormValue.userName),
    );
  }
  return lastValueFrom($tokenData);
});

function* SubmitLoginSaga({}: IAction) {}

function* SubmitLoginWatcher() {
  yield takeLatest(SUBMIT_SIGNUP.request, SubmitLoginSaga);
}

export default SubmitSignupAction;
