import {from, map} from 'rxjs';
import {post, put} from '../../../../config/ApiConfigs';

export interface PasswordRepository {
  handleOTPToSignupVerification(otpState: any): any;
  handleOTPToForgotVerification(requestObject: any): any;
  handleForgotPassword(passwordState: any): any;
  handleSignupOtpResend(OtpState: any): any;
  handleResetPassword(passwordState: any): any;
}

export class PasswordRepositoryImpl implements PasswordRepository {
  handleForgotPassword(requestObject: any) {
    console.log('log......' + JSON.stringify(requestObject));
    return from(post(this.generateForgetPassURl(), requestObject)).pipe(
      map(res => {
        console.log(
          'inside forgot otp resend repo......' + JSON.stringify(res),
        );
        return res;
      }),
    );
  }

  handleSignupOtpResend(requestObject: any) {
    console.log('inside repo...-------------' + JSON.stringify(requestObject));

    return from(post(this.generateSignupResendOtp(), requestObject)).pipe(
      map(res => {
        console.log('inside response...-----------' + JSON.stringify(res));
        return res;
      }),
    );
  }

  handleOTPToSignupVerification(requestObject: any) {
    return from(post(this.generateSubmitOtpURL(), requestObject)).pipe(
      map(res => res),
    );
  }

  handleOTPToForgotVerification(requestObject: any): any {
    return from(
      post(this.generateSubmitOtpURLToVerifySignup(), requestObject),
    ).pipe(map(res => res));
  }

  handleResetPassword(requestObject: any) {
    console.log('Object -------------- ' + JSON.stringify(requestObject));
    return from(put(this.generateResetPassURl(), requestObject)).pipe(
      map(res => {
        console.log('res........from repo..' + JSON.stringify(res));
        return res;
      }),
    );
  }

  generateForgetPassURl() {
    return 'user/forgot-password';
  }

  generateSubmitOtpURL() {
    return 'user/verify/email';
  }

  generateSubmitOtpURLToVerifySignup() {
    return '/user/verify/password-otp';
  }

  generateSignupResendOtp() {
    return 'user/resend-otp';
  }

  generateResetPassURl() {
    return 'user/change-password';
  }

  private static INSTANCE: PasswordRepository;
  static getInstance(): PasswordRepository {
    if (this.INSTANCE) {
      return this.INSTANCE;
    }
    this.INSTANCE = new PasswordRepositoryImpl();
    return this.INSTANCE;
  }
}
