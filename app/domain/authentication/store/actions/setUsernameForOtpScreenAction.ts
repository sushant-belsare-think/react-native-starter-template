export const setUsernameForOtpScreenAction = (state: any, action : any)=> {
    state.otpTab.email = action.payload;
}