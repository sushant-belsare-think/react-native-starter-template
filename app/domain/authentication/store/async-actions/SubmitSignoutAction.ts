import {createAsyncThunk} from '@reduxjs/toolkit';
import {takeLatest} from 'redux-saga/effects';
import {AuthInteractorImpl} from '../interactors/AuthInteractor';
import {RootState} from '../../../../lib';
import {lastValueFrom} from 'rxjs';
import {SUBMIT_LOGIN} from '../../constants/action';
import {AUTH_REDUCER} from '../../constants/StoreConstant';
import {IAction} from '../../../../config/ReduxHelperConfig';
import {NavigationServiceImpl} from '../../../comman/store/services/NavigationServiceImpl';
import {resetAuthReducer, resetLoginFormValues} from '../reducers/AuthReducer';
import {RefreshToSignInAsyncAction} from '../actions/RefreshToSignInAsyncAction';
import {clearProfileData} from '../../../user-profile/store/reducers/UserProfileReducer';
import {resetChatHistory} from '../../../chat/store/reducers/ChatReducer';
import {removeTokenFromServerAction} from '../../../notification/store/async-actions/removeTokenFromServerAction';
import {resetHistory} from '../../../history/store/reducers/HistoryReducer';

export const SubmitSignoutAction = createAsyncThunk<
  any,
  void,
  {state: RootState}
>(AUTH_REDUCER + '/Signout', async (_, thunkApi) => {
  // console.log('Before logout....');
  const $tokenData: any = AuthInteractorImpl.getInstance().handleLogout(
    thunkApi.getState().auth,
    thunkApi.dispatch,
  );
  const det: any = await lastValueFrom($tokenData);
  console.log('🚀 ~ file: SubmitSignoutAction.ts:26 ~ > ~ det:', det);

  if (det.status === 204) {
    //  thunkApi.dispatch(removeTokenFromServerAction());
    thunkApi.dispatch(clearProfileData());
    thunkApi.dispatch(RefreshToSignInAsyncAction());
    thunkApi.dispatch(resetChatHistory());
    thunkApi.dispatch(resetHistory());
  }
  return lastValueFrom($tokenData);
});

// function* SubmitLoginSaga({}: IAction) {}

// function* SubmitLoginWatcher() {
//   yield takeLatest(SUBMIT_LOGIN.request, SubmitLoginSaga);
// }

// export default SubmitLoginWatcher;
