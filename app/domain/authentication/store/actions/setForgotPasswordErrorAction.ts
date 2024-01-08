import { PasswordInteractorImpl } from '../interactors/PasswordInteractor';

export const setForgotPasswordErrorAction = (state: any,action: any) => {
    const Value = action.payload;
    state.forgotPass.isError = Value;
};

export const removeErrorForgotPasswordAction = (state: any) => {
    state.forgotPass.isError = '';
}
