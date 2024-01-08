import {IAuth} from '../../interfaces/IAuth';
import {AuthInteractorImpl} from '../interactors/AuthInteractor';

export const submitFirstNameValidationAction = (state: IAuth) => {
  AuthInteractorImpl.getInstance().submitFirstNameValidation(state);
};
