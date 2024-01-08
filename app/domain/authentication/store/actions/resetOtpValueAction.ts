import {PasswordInteractorImpl} from '../interactors/PasswordInteractor';

export const resetOtpValueAction = (state: any) => {
  // console.log("under resend before")
  state.otpTab.resend = !state.otpTab.resend;
  // console.log("after resend");
  const initialOtpValue =
    PasswordInteractorImpl.getInstance().initialState().otpTab.otp;
  state.otpTab.otp = initialOtpValue;
};
