import {IAuth} from '../../interfaces/IAuth';
import {AuthInteractorImpl} from '../interactors/AuthInteractor';

export const resetAuthReducerAction = (state: IAuth) => {
  const initialState = AuthInteractorImpl.getInstance().initialState();

  state.loginFormValue = initialState.loginFormValue;
  state.signupFormValue = initialState.signupFormValue;
  state.token = initialState.token;
  state.loading = false;
  state.role = initialState.role;
  // state.isError = initialState.isError;
  // state.isFromDeepLink = initialState.isFromDeepLink;
  // state.canclePrompt = initialState.canclePrompt;

  // state.baseUrl = initialState.baseUrl;
  // state.authbaseUrl = initialState.authbaseUrl;
  // state.rasabaseUrl = initialState.rasabaseUrl;
  // state.selectedEnv = initialState.selectedEnv;
};
