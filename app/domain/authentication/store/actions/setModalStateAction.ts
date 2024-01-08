import { IAuth } from '../../interfaces/IAuth';
import { AuthInteractorImpl } from '../interactors/AuthInteractor';

export const setModalStateAction = (state: IAuth) => {
    state.signupFormValue.showModal = false;
};
