export const setResetPasswordErrorAction = (state: any, action: any) => {
  const Value = action.payload;
  state.resetPass.isError = Value;
};

export const removeErrorResetPasswordAction = (state: any) => {
  state.resetPass.isError = '';
};
