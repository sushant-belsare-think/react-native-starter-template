import {createSlice} from '@reduxjs/toolkit';
import {PASSWORD_REDUCER} from '../../constants/StoreConstant';
import {PasswordInteractorImpl} from '../interactors/PasswordInteractor';
import {addEmailToGetOTPAndValidateAction} from '../actions/addEmailToGetOTPAndValidateAction';
import {resetForgotPasswordDataAction} from '../actions/resetForgotPasswordDataAction';
import {setOtpValuesAction} from '../actions/setOtpValuesAction';
import {setUsernameValueAction} from '../actions/setUsernameValueAction';
import {SubmitSignupResendOtpAction} from '../async-actions/SubmitSignupResendOtpAction';
import {SignupResendOtpInterceptorImpl} from '../interceptors/SignupResendOtpInterceptor';
import {SubmitOtpInterceptorImpl} from '../interceptors/SubmitOtpInterceptor';
import {setResetPasswordFormValuesAction} from '../actions/setResetPasswordFormValuesAction';
import {addOTPIdAction} from '../actions/addOTPIdAction';
import {resetOtpResponseDataAction} from '../actions/resetOtpResponseDataAction';
import {SubmitSignupVerificationOtpAction} from '../async-actions/SubmitSignupVerificationOtpAction';
import {SubmitForgotPassOtpAction} from '../async-actions/SubmitForgotPassOtpAction';
import {resetOtpValueAction} from '../actions/resetOtpValueAction';
import {SubmitForgotPasswordMailSendAction} from '../async-actions/SubmitForgotPasswordMailSendAction';
import {SubmitForgotPasswordMailSendInterceptorImpl} from '../interceptors/SubmitForgotPasswordMailSendInterceptor';
import {SubmitForgotPassOtpActionInterceptorImpl} from '../interceptors/SubmitForgotPassOtpInterceptor';
import {SubmitResetPasswordAction} from '../async-actions/SubmitResetPasswordAction';
import {SubmitResetPasswordInterceptorImpl} from '../interceptors/SubmitResetPasswordInterceptor';
import {SubmitForgotpasswordResendOtpAction} from '../async-actions/SubmitForgotpasswordResendOtpAction';
import {SubmitForgotpasswordResendOtpInterceptorImpl} from '../interceptors/SubmitForgotpasswordResendOtpInterceptor';
import {
  removeErrorForgotPasswordAction,
  setForgotPasswordErrorAction,
} from '../actions/setForgotPasswordErrorAction';
import {
  removeOtpErrorforForgotPasswordAction,
  setOtpErrorforForgotPasswordAction,
} from '../actions/setOtpErrorforForgotPasswordAction';
import {resetResetPasswordAction} from '../actions/resetResetPasswordAction';
import {
  removeOtpSuccessMessageAction,
  setOtpSuccessMessageAction,
} from '../actions/setOtpSuccessMessageAction';
import {
  removeSuccessOtpSuccessmessageLoginAction,
  successMessageCreatePasswordAction,
} from '../actions/successMessageCreatePasswordAction';
import {setSignupResendOtpErrorAction} from '../actions/setSignupResendOtpErrorAction';
import {
  removeSuccessMessageOnLoginAction,
  setSuccessMessageOnLoginAction,
} from '../actions/setSuccessMessageOnLoginAction';
import {
  removeErrorResetPasswordAction,
  setResetPasswordErrorAction,
} from '../actions/setResetPasswordErrorAction';
import { setUsernameForOtpScreenAction } from '../actions/setUsernameForOtpScreenAction';

const passwordInteractorImpl = PasswordInteractorImpl.getInstance();
const initialState = passwordInteractorImpl.initialState();
const signupResendOtpInterceptorImpl =
  SignupResendOtpInterceptorImpl.getInstance();
const submitOtpInterceptor = SubmitOtpInterceptorImpl.getInstance();
const submitForgotPasswordMailSendInterceptor =
  SubmitForgotPasswordMailSendInterceptorImpl.getInstance();
const submitForgotPassOtpActionInterceptor =
  SubmitForgotPassOtpActionInterceptorImpl.getInstance();
const submitResetPasswordInterceptor =
  SubmitResetPasswordInterceptorImpl.getInstance();
const submitForgotpasswordResendOtpInterceptor =
  SubmitForgotpasswordResendOtpInterceptorImpl.getInstance();

const passwordSlice = createSlice({
  name: PASSWORD_REDUCER,
  initialState,

  reducers: {
    addEmailToGetOTPAndValidate: (state: any, action) => {
      addEmailToGetOTPAndValidateAction(state, action);
    },
    addOTPIdToReducerAction: (state: any, action) => {
      addOTPIdAction(state, action);
    },
    resetForgotPasswordData: (state: any) => {
      resetForgotPasswordDataAction(state, initialState);
    },
    resetOtpResponseData: (state: any) => {
      resetOtpResponseDataAction(state, initialState);
    },
    otpScreenValues: (state: any, action) => {
      setOtpValuesAction(state, action);
    },
    setUsernameValue: (state: any, action) => {
      setUsernameValueAction(state, action);
    },
    setResetPasswordFormValues: (state: any, action) => {
      setResetPasswordFormValuesAction(state, action);
    },
    resetOtpValue: (state: any) => {
      resetOtpValueAction(state);
    },
    setForgotPasswordError: (state: any, action: any) => {
      setForgotPasswordErrorAction(state, action);
    },
    removeErrorForgotPassword: (state: any) => {
      removeErrorForgotPasswordAction(state);
    },
    setOtpErrorforForgotPassword: (state: any, action: any) => {
      setOtpErrorforForgotPasswordAction(state, action);
    },
    removeOtpErrorforForgotPassword: (state: any) => {
      removeOtpErrorforForgotPasswordAction(state);
    },
    setResetPasswordError: (state: any, action: any) => {
      setResetPasswordErrorAction(state, action);
    },
    removeErrorCreatePassword: (state: any) => {
      removeErrorResetPasswordAction(state);
    },
    resetCreatePasswordValue: (state: any) => {
      resetResetPasswordAction(state);
    },
    setOtpSuccessMessage: (state: any) => {
      setOtpSuccessMessageAction(state);
    },
    removeOtpSuccessMessage: (state: any) => {
      removeOtpSuccessMessageAction(state);
    },
    successMessageCreatePassword: (state: any) => {
      successMessageCreatePasswordAction(state);
    },
    removeSuccessOtpSuccessmessageLogin: (state: any) => {
      removeSuccessOtpSuccessmessageLoginAction(state);
    },
    setSignupResendOtpError: (state: any, action: any) => {
      setSignupResendOtpErrorAction(state, action);
    },
    setSuccessMessageOnLogin: (state: any) => {
      setSuccessMessageOnLoginAction(state);
    },
    removePasswordResetSuccessMessage: (state: any) => {
      removeSuccessMessageOnLoginAction(state);
    },
    setUsernameForOtpScreen: (state: any, action: any) => {
      setUsernameForOtpScreenAction(state,action);
    },
  },

  extraReducers: builder => {
    builder
      .addCase(SubmitSignupResendOtpAction.pending, (state: any) => {
        signupResendOtpInterceptorImpl.handlePending(state);
      })
      .addCase(
        SubmitSignupResendOtpAction.rejected,
        (state: any, action: any) => {
          signupResendOtpInterceptorImpl.handleRejected(state, action);
        },
      )
      .addCase(SubmitSignupResendOtpAction.fulfilled, (state: any) => {
        signupResendOtpInterceptorImpl.handleFulfilled(state);
      })
      .addCase(SubmitSignupVerificationOtpAction.pending, (state: any) => {
        submitOtpInterceptor.handlePending(state);
      })
      .addCase(SubmitSignupVerificationOtpAction.rejected, (state: any) => {
        submitOtpInterceptor.handleRejected(state);
      })
      .addCase(SubmitSignupVerificationOtpAction.fulfilled, (state: any) => {
        submitOtpInterceptor.handleFulfilled(state);
      })
      .addCase(SubmitForgotPasswordMailSendAction.pending, (state: any) => {
        submitForgotPasswordMailSendInterceptor.handlePending(state);
      })
      .addCase(
        SubmitForgotPasswordMailSendAction.rejected,
        (state: any, action: any) => {
          submitForgotPasswordMailSendInterceptor.handleRejected(state, action);
        },
      )
      .addCase(
        SubmitForgotPasswordMailSendAction.fulfilled,
        (state: any, action: any) => {
          submitForgotPasswordMailSendInterceptor.handleFulfilled(
            state,
            action,
          );
        },
      )
      .addCase(SubmitForgotPassOtpAction.pending, (state: any) => {
        submitForgotPassOtpActionInterceptor.handlePending(state);
      })
      .addCase(SubmitForgotPassOtpAction.rejected, (state: any) => {
        submitForgotPassOtpActionInterceptor.handleRejected(state);
      })
      .addCase(
        SubmitForgotPassOtpAction.fulfilled,
        (state: any, action: any) => {
          submitForgotPassOtpActionInterceptor.handleFulfilled(state, action);
        },
      )
      .addCase(SubmitResetPasswordAction.pending, (state: any) => {
        submitResetPasswordInterceptor.handlePending(state);
      })
      .addCase(SubmitResetPasswordAction.rejected, (state: any) => {
        submitResetPasswordInterceptor.handleRejected(state);
      })
      .addCase(
        SubmitResetPasswordAction.fulfilled,
        (state: any, action: any) => {
          submitResetPasswordInterceptor.handleFulfilled(state, action);
        },
      )
      .addCase(SubmitForgotpasswordResendOtpAction.pending, (state: any) => {
        submitForgotpasswordResendOtpInterceptor.handlePending(state);
      })
      .addCase(SubmitForgotpasswordResendOtpAction.rejected, (state: any) => {
        submitForgotpasswordResendOtpInterceptor.handleRejected(state);
      })
      .addCase(
        SubmitForgotpasswordResendOtpAction.fulfilled,
        (state: any, action: any) => {
          submitForgotpasswordResendOtpInterceptor.handleFulfilled(
            state,
            action,
          );
        },
      );
  },
});

const passwordReducer = passwordSlice.reducer;

export const {
  addEmailToGetOTPAndValidate,
  resetForgotPasswordData,
  setResetPasswordFormValues,
  addOTPIdToReducerAction,
  otpScreenValues,
  resetOtpResponseData,
  setUsernameValue,
  resetOtpValue,
  setForgotPasswordError,
  removeErrorForgotPassword,
  setOtpErrorforForgotPassword,
  removeOtpErrorforForgotPassword,
  setResetPasswordError,
  removeErrorCreatePassword,
  resetCreatePasswordValue,
  setOtpSuccessMessage,
  removeOtpSuccessMessage,
  successMessageCreatePassword,
  removeSuccessOtpSuccessmessageLogin,
  setSignupResendOtpError,
  setSuccessMessageOnLogin,
  removePasswordResetSuccessMessage,
  setUsernameForOtpScreen,
} = passwordSlice.actions;
export default passwordReducer;
