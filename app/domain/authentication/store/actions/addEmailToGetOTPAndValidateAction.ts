import {PasswordInteractorImpl} from '../interactors/PasswordInteractor';

export const addEmailToGetOTPAndValidateAction = (state: any, action: any) => {
  PasswordInteractorImpl.getInstance().validateEmailToSendOTP(
    state,
    action.payload,
  );
};
