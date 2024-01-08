import { PasswordRepositoryImpl } from '../repositories/PasswordRepositoryImpl';

export interface PasswordServices {
  handleForgotPassword(passwordState: any): any;
  handleOTPToSignupVerification(otpState: any): any;
  handleOTPToForgotVerification(otpState: any): any;
  signupResendOtp(OtpState: any): any;
  loginResendOtp(OtpState: any): any;
  forgotPasswordResendOtp(OtpState: any): any;
  handleResetPassword(passwordState: any): any;
}

export class PasswordServicesImpl implements PasswordServices {
  constructor(private passwordRepo = PasswordRepositoryImpl.getInstance()) { }

  handleForgotPassword(passwordState: any): any {
    if (passwordState.emailError === '') {
      return this.passwordRepo.handleForgotPassword({
        email: passwordState.email,
      });
    }
  }

  handleOTPToSignupVerification(otpState: any): any {
    console.log("login flow ************* "+otpState.otpTab.email);
    
    return this.passwordRepo.handleOTPToSignupVerification({
      email: otpState.otpTab.email,
      otp: otpState.otpTab.otp,
    });
  }

  handleOTPToForgotVerification(otpState: any): any {
    return this.passwordRepo.handleOTPToForgotVerification({
      otpId: otpState.otpTab.otpId,
      otp: otpState.otpTab.otp,
    });
  }

  signupResendOtp(OtpState: any): any {
    return this.passwordRepo.handleSignupOtpResend({
      email: OtpState.email,
    });
  }

  loginResendOtp(OtpState: any): any {
    
    console.log('**********login resend otp*********---' + OtpState.loginFormValue.userName);
    return this.passwordRepo.handleSignupOtpResend({
      email: OtpState.loginFormValue.userName,
    })
  }

  forgotPasswordResendOtp(OtpState: any): any {
    // console.log("inside forgot otp resend service"+OtpState.otpTab.email);
    return this.passwordRepo.handleForgotPassword({
      email: OtpState.otpTab.email,
    })
  }

  handleResetPassword(passwordState: any): any {
    console.log('+++++++++++', passwordState.resetPass);
    if (
      passwordState.resetPass.isValidPassword === '' ||
      passwordState.resetPass.isValidConfirmPassword === ''
    ) {
      console.log("otpId....-----" + JSON.stringify(passwordState));
      return this.passwordRepo.handleResetPassword({
        otpId: passwordState.otpTab.otpId,
        newPassword: passwordState.resetPass.password,
      });
    }
  }

  private static INSTANCE: PasswordServices;
  static getInstance(): PasswordServices {
    if (this.INSTANCE) {
      return this.INSTANCE;
    }
    this.INSTANCE = new PasswordServicesImpl();
    return this.INSTANCE;
  }
}
