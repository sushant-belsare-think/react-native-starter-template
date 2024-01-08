export const addOTPIdAction = (state: any, action: any) => {
  // console.log("Action paylad ************* "+action.payload)
  state.otpTab.otpId = action.payload;
};
