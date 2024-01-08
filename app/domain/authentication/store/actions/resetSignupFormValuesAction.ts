import {IAuth} from '../../interfaces/IAuth';
import {AuthInteractorImpl} from '../interactors/AuthInteractor';

export const resetSignupFormValuesAction = (state: IAuth) => {
  const initialLoginFormvalues =
    AuthInteractorImpl.getInstance().initialState().signupFormValue;
  state.signupFormValue = initialLoginFormvalues;
};