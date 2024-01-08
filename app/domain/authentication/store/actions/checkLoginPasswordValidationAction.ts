import {IAuth} from '../../interfaces/IAuth';
import {AuthInteractorImpl} from '../interactors/AuthInteractor';

export const checkForLoginPasswordValidationAction = (
  state: IAuth,
  password: string,
) => {
  AuthInteractorImpl.getInstance().checkPasswordValidation(state, password);
};
