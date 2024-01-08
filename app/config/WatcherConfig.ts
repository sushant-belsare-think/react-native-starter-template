import SubmitLoginWatcher from '../domain/authentication/store/async-actions/SubmitLoginAction';
import {all} from 'redux-saga/effects';
import SubmitSignupWatcher from '../domain/authentication/store/async-actions/SubmitSignUpAction';
import SubmitSignoutWatcher from '../domain/authentication/store/async-actions/SubmitSignoutAction';


export function* rootSaga() {
  yield all([SubmitLoginWatcher(),SubmitSignupWatcher(),SubmitSignoutWatcher()]);

}
