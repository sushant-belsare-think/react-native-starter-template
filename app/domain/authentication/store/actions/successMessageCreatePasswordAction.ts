export const successMessageCreatePasswordAction = (state: any) => {
  state.otpTab.OtpSuccessMessage = 'OTP Verification is Successful';
};

export const removeSuccessOtpSuccessmessageLoginAction = (state: any) => {
  // console.log("from remove action...***************");

  state.otpTab.OtpSuccessMessage = '';
};
