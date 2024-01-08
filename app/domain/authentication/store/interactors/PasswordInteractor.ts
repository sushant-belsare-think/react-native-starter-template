import { AppDispatch } from '../../../../lib';
import { PasswordServicesImpl } from '../services/PasswordServicesImpl';
import { AuthInteractorImpl } from './AuthInteractor';

export interface PasswordInteractor {
  initialState(): any;
  validateEmailToSendOTP(passwordState: any, email: string): void;
  handleForgotPassword(passwordState: any, dispatch: AppDispatch): any;
  handleOTPToSignupVerification(OtpState: any, dispatch: AppDispatch): any;
  handleOTPToForgotVerification(OtpState: any): any;
  signupResendOtp(OtpState: any, dispatch: AppDispatch): any;
  loginResendOtp(OtpState: any, dispatch: AppDispatch): any;
  forgotPasswordResendOtp(OtpState: any, dispatch: AppDispatch): any;
  handleResetPassword(passwordState: any, dispatch: AppDispatch): any;
  checkResetPasswordValidation(state: any, password: string): any;
  checkResetConfirmPasswordValidation(state: any, confirmPassword: string): any;
}

export class PasswordInteractorImpl implements PasswordInteractor {
  constructor(
    private authInteractor = AuthInteractorImpl.getInstance(),
    private passwordService = PasswordServicesImpl.getInstance(),
  ) { }

  handleForgotPassword(passwordState: any): any {
    if (passwordState.forgotPass.email.length === 0) {
      passwordState.forgotPass.emailError = 'Please enter the email';
    } else {
      return this.passwordService.handleForgotPassword(
        passwordState.forgotPass,
      );
    }
  }

  handleOTPToSignupVerification(OtpState: any) {
    return this.passwordService.handleOTPToSignupVerification(OtpState);
  }

  handleOTPToForgotVerification(OtpState: any) {
    return this.passwordService.handleOTPToForgotVerification(OtpState);
  }

  signupResendOtp(OtpState: any) {
    return this.passwordService.signupResendOtp(OtpState.otpTab);
  }

  loginResendOtp(OtpState: any) {
    OtpState.password.otpTab.email = OtpState.auth.loginFormValue.userName
    return this.passwordService.loginResendOtp(OtpState.auth);
  }
  forgotPasswordResendOtp(OtpState: any) {
    return this.passwordService.forgotPasswordResendOtp(OtpState);
  }
  handleResetPassword(passwordState: any): any {
    return this.passwordService.handleResetPassword(passwordState);
  }

  initialState() {
    return {
      forgotPass: {
        email: '',
        emailError: '',
        loading: false,
        isError: '',
      },
      otpTab: {
        otp: '',
        email: '',
        otpError: false,
        loading: false,
        otpId: '',
        isError: '',
        resend: false,
        OtpSuccessMessage: '',
      },
      resetPass: {
        password: '',
        confirmPassword: '',
        isValidPassword: '',
        isValidConfirmPassword: '',
        NumberSymbol: false,
        LowerCase_UpperCase: false,
        max_Character: false,
        loading: false,
        isError: '',
      },
    };
  }

  validateEmailToSendOTP(passwordState: any, email: string): void {
    passwordState.forgotPass.email = email;
    passwordState.forgotPass.emailError =
      this.authInteractor.checkForSIGNUPEmailValidation(email);
  }

  checkResetPasswordValidation(state: any, password: string): void {
    state.resetPass.isValidPassword =
      this.authInteractor.submitForPasswordValidation(password);
    state.resetPass.NumberSymbol =
      this.authInteractor.checkForSIGNUPPasswordNumberSymbol(password);
    state.resetPass.LowerCase_UpperCase =
      this.authInteractor.checkForSIGNUPPasswordLowerCase_UpperCase(password);
    state.resetPass.max_Character =
      this.authInteractor.checkForSIGNUPPasswordMax_Char(password);

    if (state.resetPass.confirmPassword.length > 0) {
      state.resetPass.isValidConfirmPassword =
        this.authInteractor.checkForignUpConfirmPasswordValidation(
          password, state.resetPass.confirmPassword
        )
    }
  }

  checkResetConfirmPasswordValidation(
    state: any,
    confirmPassword: string,
  ): void {
    state.resetPass.isValidConfirmPassword =
      this.authInteractor.checkForignUpConfirmPasswordValidation(
        confirmPassword,
        state.resetPass.password,
      );
  }

  private static INSTANCE: PasswordInteractor;
  static getInstance(): PasswordInteractor {
    if (this.INSTANCE) {
      return this.INSTANCE;
    }
    this.INSTANCE = new PasswordInteractorImpl();
    return this.INSTANCE;
  }
}
