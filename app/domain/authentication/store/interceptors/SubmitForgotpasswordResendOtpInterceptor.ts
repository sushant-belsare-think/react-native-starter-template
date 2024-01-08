import { InstanceGetUtility } from '../../../../utils/InstanceGetUtility';

export interface SubmitForgotpasswordResendOtpInterceptor {
    handlePending(state: any): void;
    handleRejected(state: any): void;
    handleFulfilled(state: any, action: any): void;
}

export class SubmitForgotpasswordResendOtpInterceptorImpl implements SubmitForgotpasswordResendOtpInterceptor {
    handlePending(state: any): void {
        state.forgotPass.loading = true;
    }
    handleRejected(state: any): void {
        state.forgotPass.loading = false;
    }
    handleFulfilled(state: any, action: any): void {
        state.forgotPass.loading = false;
    }

    private static INSTANCE: SubmitForgotpasswordResendOtpInterceptor;
    static getInstance(): SubmitForgotpasswordResendOtpInterceptor {
        this.INSTANCE = InstanceGetUtility.getInstance(
            SubmitForgotpasswordResendOtpInterceptorImpl,
            this.INSTANCE,
        );
        return this.INSTANCE;
    }
}
