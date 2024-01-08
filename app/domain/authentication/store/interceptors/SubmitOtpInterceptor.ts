import {InstanceGetUtility} from '../../../../utils/InstanceGetUtility';

export interface SubmitOtpInterceptor {
  handlePending(state: any): void;
  handleRejected(state: any): void;
  handleFulfilled(state: any): void;
}

export class SubmitOtpInterceptorImpl implements SubmitOtpInterceptor {
  handlePending(state: any): void {
    state.otpTab.loading = true;
  }
  handleRejected(state: any): void {
    state.otpTab.loading = false;
  }
  handleFulfilled(state: any): void {
    state.otpTab.loading = false;
  }

  private static INSTANCE: SubmitOtpInterceptor;
  static getInstance(): SubmitOtpInterceptor {
    this.INSTANCE = InstanceGetUtility.getInstance(
      SubmitOtpInterceptorImpl,
      this.INSTANCE,
    );
    return this.INSTANCE;
  }
}
