import { createSlice } from '@reduxjs/toolkit';
import { AUTH_REDUCER } from '../../constants/StoreConstant';
import { AuthInteractorImpl } from '../interactors/AuthInteractor';
import { SubmitLoginAction } from '../async-actions/SubmitLoginAction';
import { AuthInterceptorImpl } from '../interceptors/AuthInterceptor';
import { IAuth } from '../../interfaces/IAuth';
import { setLoginFormValuesAction } from '../actions/setLoginFormValuesAction';
import { resetAuthReducerAction } from '../actions/resetAuthReducerAction';
import { checkForUserNameValidationAction } from '../actions/checkForUserNameValidationAction';
import { setSignupFormValuesAction } from '../actions/setSignupFormValuesAction';
import { checkForLoginPasswordValidationAction } from '../actions/checkLoginPasswordValidationAction';
import SubmitSignupAction from '../async-actions/SubmitSignUpAction';
import { SignupInterceptorImpl } from '../interceptors/SignupInterceptor';
import { resetSignupFormValuesAction } from '../actions/resetSignupFormValuesAction';
import { setModalStateAction } from '../actions/setModalStateAction';
import { ResetLoginFormValuesAction } from '../actions/ResetLoginFormValuesAction';
import { submitFirstNameValidationAction } from '../actions/submitFirstNameValidationAction';
import { SubmitSignoutAction } from '../async-actions/SubmitSignoutAction';
import { SignoutInterceptorImpl } from '../interceptors/SignoutInteractor';
import { setTokenDataToReducerAction } from '../actions/setTokenDataToReducerAction';
import { setOtpValuesAction } from '../actions/setOtpValuesAction';
import {
  DisableErrorComponent,
  DisableErrorComponentForSignup,
} from '../actions/DisableErrorComponent';

import { profileApiDetailsAction } from '../async-actions/profileApiCall';
import { ProfileInterceptorImpl } from '../interceptors/ProfileInterceptor';
import { stopLoaderAction } from '../actions/StopLoaderAction';
// import {stopLoaderAndNavigateToOTPAction} from '../actions/stopLoaderAndNavigateToOTPAction';
import { setTokenInfoAction } from '../actions/setTokenInfoAction';
import { checkNetworkAction } from '../actions/checkNetworkAction';
import { setValuesFromDeepLinkAction } from '../actions/setValuesFromDeepLinkAction';
import { setRoleTax1099Action } from '../actions/setRoleTax1099Action';
import { setCancleValuesAction } from '../actions/setCancleValuesAction';
import { showPayerPayeeModalAction } from '../actions/showPayerPayeeModalAction';
import { hidePayerPayeeModalAction } from '../actions/hidePayerPayeeModalAction';
import { callProfileApiAction } from '../actions/callProfileApiAction';
import { pauseProfileApiAction } from '../actions/pauseProfileApiAction';
import { tempAccessTokenAction } from '../actions/tempAccessTokenAction';
import { cancleErrorComponentOnProfileScreenAction } from '../actions/cancleErrorComponentOnProfileScreenAction';

const authInteractorImpl = AuthInteractorImpl.getInstance();
const authInterceptorImpl = AuthInterceptorImpl.getInstance();
const signupInterceptor = SignupInterceptorImpl.getInstance();
const signoutInteractor = SignoutInterceptorImpl.getInstance();
const profileInterceptorImpl = ProfileInterceptorImpl.getInstance();
const initialState = authInteractorImpl.initialState();

const authSlice = createSlice({
  name: AUTH_REDUCER,
  initialState,

  reducers: {
    changeOrgainUserStatus: state => {
      state.organicUser = false;
    },
    setLoginFormValues: (state: any, action) => {
      setLoginFormValuesAction(state, action);
    },
    setSignupFormValues: (state: any, action) => {
      setSignupFormValuesAction(state, action);
    },
    resetLoginFormValues: state => {
      ResetLoginFormValuesAction(state);
    },
    resetAuthReducer: state => {
      resetAuthReducerAction(state);
    },
    setModalState: state => {
      setModalStateAction(state);
    },
    resetSignupFormValues: state => {
      resetSignupFormValuesAction(state);
    },
    checkForUserNameValidation: state => {
      checkForUserNameValidationAction(state);
    },
    checkForPasswordValidation: (state, action) => {
      checkForLoginPasswordValidationAction(state, action.payload);
    },
    setTokenDataToReducer: (state, action) => {
      setTokenDataToReducerAction(state, action);
    },
    checkFirstNameValidation: state => {
      submitFirstNameValidationAction(state);
    },
    cancleErrorComponent: (state: any) => {
      DisableErrorComponent(state);
    },
    cancleErrorTextForSignup: (state: any) => {
      DisableErrorComponentForSignup(state);
    },
    toProfileAction: (state: any, action: any) => {
      profileApiDetailsAction(action);
    },
    stopLoader: (state: any) => {
      stopLoaderAction(state);
    },
    startLoader: (state: any) => {
      state.loading = true;
    },
    setTokenInfo: (state: any) => {
      setTokenInfoAction(state);
    },

    setRole: (state: IAuth, action) => {
      state.role = action.payload;
    },
    setBaseUrl: (state: IAuth, action) => {
      state.baseUrl = action.payload;
    },
    setRasaBaseUrl: (state: IAuth, action) => {
      state.rasabaseUrl = action.payload;
    },
    setAuthBaseUrl: (state: IAuth, action) => {
      state.authbaseUrl = action.payload;
    },
    setAuthClientId: (state: IAuth, action) => {
      state.authClientId = action.payload;
    },
    setAuthClientSecret: (state: IAuth, action) => {
      state.authClientSecret = action.payload;
    },
    setEnv: (state: IAuth, action) => {
      state.selectedEnv = action.payload;
    },
    checkNetwork: (state: IAuth, action: any) => {
      checkNetworkAction(state, action);
    },
    setValuesFromDeepLink: (state: IAuth, action: any) => {
      setValuesFromDeepLinkAction(state, action)
    },
    resetIsFromDeepLink: (state: IAuth) => {
      state.isFromDeepLink = false
    },
    setRoleTax1099: (state: IAuth) => {
      setRoleTax1099Action(state);
    },
    setCancleValues: (state: IAuth, action: any) => {
      setCancleValuesAction(state, action);
    },
    showPayerPayeeModal: (state: IAuth) => {
      showPayerPayeeModalAction(state);
    },
    hidePayerPayeeModal: (state: IAuth) => {
      hidePayerPayeeModalAction(state);
    },
    callProfileApi: (state: IAuth) => {
      callProfileApiAction(state);
    },
    pauseProfileApi: (state: any) => {
      pauseProfileApiAction(state);
    },
    tempAccessToken: (state: any, action: any) => {
      tempAccessTokenAction(state, action)
    },
    cancleErrorComponentOnProfileScreen: (state: any) => {
      cancleErrorComponentOnProfileScreenAction(state);
    }
  },

  extraReducers: builder => {
    builder
      .addCase(SubmitLoginAction.pending, (state: IAuth) => {
        authInterceptorImpl.handlePending(state);
      })
      .addCase(SubmitLoginAction.rejected, (state: IAuth, action: any) => {
        authInterceptorImpl.handleRejected(state, action);
      })
      .addCase(SubmitLoginAction.fulfilled, (state: IAuth, action: any) => {
        authInterceptorImpl.handleFulfilled(state, action);
      })
      .addCase(SubmitSignupAction.pending, (state: IAuth) => {
        signupInterceptor.handlePending(state);
      })
      .addCase(SubmitSignupAction.rejected, (state: IAuth, action: any) => {
        signupInterceptor.handleRejected(state, action);
      })
      .addCase(SubmitSignupAction.fulfilled, (state: IAuth, action: any) => {
        signupInterceptor.handleFulfilled(state, action);
      })
      .addCase(SubmitSignoutAction.pending, (state: IAuth) => {
        signoutInteractor.handlePending(state);
      })
      .addCase(SubmitSignoutAction.rejected, (state: IAuth, action: any) => {
        signoutInteractor.handleRejected(state, action);
      })
      .addCase(SubmitSignoutAction.fulfilled, (state: IAuth, action: any) => {
        signoutInteractor.handleFulfilled(state, action);
      })
      .addCase(profileApiDetailsAction.pending, (state: IAuth) => {
        profileInterceptorImpl.handlePending(state);
      })
      .addCase(
        profileApiDetailsAction.rejected,
        (state: IAuth, action: any) => {
          profileInterceptorImpl.handleRejected(state, action);
        },
      )
      .addCase(
        profileApiDetailsAction.fulfilled,
        (state: IAuth, action: any) => {
          profileInterceptorImpl.handleFulfilled(state, action);
        },
      );
  },
});

const authReducer = authSlice.reducer;

export const {
  changeOrgainUserStatus,
  resetAuthReducer,
  resetLoginFormValues,
  setLoginFormValues,
  setSignupFormValues,
  checkForUserNameValidation,
  checkForPasswordValidation,
  setModalState,
  resetSignupFormValues,
  checkFirstNameValidation,
  setTokenDataToReducer,
  cancleErrorComponent,
  cancleErrorTextForSignup,
  toProfileAction,
  stopLoader,
  startLoader,
  setTokenInfo,
  setRole,
  setAuthClientId,
  setAuthClientSecret,
  setBaseUrl,
  setRasaBaseUrl,
  setAuthBaseUrl,
  setEnv,
  checkNetwork,
  setValuesFromDeepLink,
  resetIsFromDeepLink,
  setRoleTax1099,
  setCancleValues,
  showPayerPayeeModal,
  hidePayerPayeeModal,
  callProfileApi,
  pauseProfileApi,
  tempAccessToken,
  cancleErrorComponentOnProfileScreen,
} = authSlice.actions;
export default authReducer;
