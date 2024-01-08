import {IAuth} from '../../interfaces/IAuth';
import {AuthInteractorImpl} from '../interactors/AuthInteractor';

export const ResetLoginFormValuesAction = (state: IAuth) => {
  const initialLoginFormvalues =
    AuthInteractorImpl.getInstance().initialState().loginFormValue;
  state.loginFormValue = initialLoginFormvalues;
};
