export const tempAccessTokenAction = (state: any, action: any) => {
    state.tempToken = action.payload;
}