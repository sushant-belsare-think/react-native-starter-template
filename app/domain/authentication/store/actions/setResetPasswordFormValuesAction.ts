import {PasswordInteractorImpl} from '../interactors/PasswordInteractor';

export const setResetPasswordFormValuesAction = (state: any, action: any) => {
  state.resetPass[action.payload.key] = action.payload.value;
  if (action.payload.key === 'password') {
    PasswordInteractorImpl.getInstance().checkResetPasswordValidation(
      state,
      action.payload.value,
    );
  } else if (action.payload.key === 'confirmPassword') {
    PasswordInteractorImpl.getInstance().checkResetConfirmPasswordValidation(
      state,
      action.payload.value,
    );
  }
};
