import { IAuth } from "../../interfaces/IAuth"

export const setValuesFromDeepLinkAction = (state :IAuth,action:any) => {
    console.log('action from setValuesFromDeepLink', action.payload)
    state.signupFormValue.userName = action.payload.email
    state.signupFormValue.businessType = action.payload.companyType
    state.isFromDeepLink = true
} 