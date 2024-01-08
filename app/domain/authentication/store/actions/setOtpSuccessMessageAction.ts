export const setOtpSuccessMessageAction = (state: any) =>{
    state.otpTab.OtpSuccessMessage = 'OTP Verification is Successful'
}

export const removeOtpSuccessMessageAction = (state: any) => {
    state.otpTab.OtpSuccessMessage = ''
}