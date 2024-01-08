export const setOtpErrorforForgotPasswordAction = (state: any,action: any) => {
    const Value = action.payload;
    state.otpTab.isError = Value;
};

export const removeOtpErrorforForgotPasswordAction = (state: any) => {
state.otpTab.isError = '';
}
