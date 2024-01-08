import {IAuth} from '../../interfaces/IAuth';
import {AuthInteractorImpl} from '../interactors/AuthInteractor';

export const checkForUserNameValidationAction = (state: IAuth) => {
  AuthInteractorImpl.getInstance().checkUserNameValidation(state);
};
