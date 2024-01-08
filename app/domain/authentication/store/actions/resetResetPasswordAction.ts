import { PasswordInteractorImpl } from '../interactors/PasswordInteractor';

export const resetResetPasswordAction = (state: any) => {
  const initialResetPasswordvalues =
    PasswordInteractorImpl.getInstance().initialState().resetPass;
  state.resetPass = initialResetPasswordvalues;
};
