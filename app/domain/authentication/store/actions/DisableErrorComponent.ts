import { AuthInteractorImpl } from '../interactors/AuthInteractor';
import { PasswordInteractorImpl } from '../interactors/PasswordInteractor';

export const DisableErrorComponent = (state: any) => {
    const initialOtpValue =
        AuthInteractorImpl.getInstance().initialState().loginFormValue.isError
    state.loginFormValue.isError = initialOtpValue;
};

export const DisableErrorComponentForSignup = (state: any) => {
    const initialOtpValue =
        AuthInteractorImpl.getInstance().initialState().signupFormValue.isError;
    state.signupFormValue.isError = initialOtpValue;
};