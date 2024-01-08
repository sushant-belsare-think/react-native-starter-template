export const setSuccessMessageOnLoginAction = (state: any) =>{
    state.otpTab.OtpSuccessMessage = 'Password changed successfully'
}

export const removeSuccessMessageOnLoginAction = (state: any) => {
    state.otpTab.OtpSuccessMessage = ''
}