export const setSignupResendOtpErrorAction = (state: any, action: any) => {
  // console.log("eeror from action * ********** *" + JSON.stringify(action.payload))
  state.otpTab.isError = action.payload;
};
