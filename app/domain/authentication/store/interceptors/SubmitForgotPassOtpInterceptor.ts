import { InstanceGetUtility } from '../../../../utils/InstanceGetUtility';

export interface SubmitForgotPassOtpActionInterceptor {
    handlePending(state: any): void;
    handleRejected(state: any): void;
    handleFulfilled(state: any, action: any): void;
}

export class SubmitForgotPassOtpActionInterceptorImpl implements SubmitForgotPassOtpActionInterceptor {
    handlePending(state: any): void {
        state.forgotPass.loading = true;
    }
    handleRejected(state: any): void {
        state.forgotPass.loading = false;
    }
    handleFulfilled(state: any, action: any): void {
        state.forgotPass.loading = false;
    }

    private static INSTANCE: SubmitForgotPassOtpActionInterceptor;
    static getInstance(): SubmitForgotPassOtpActionInterceptor {
        this.INSTANCE = InstanceGetUtility.getInstance(
            SubmitForgotPassOtpActionInterceptorImpl,
            this.INSTANCE,
        );
        return this.INSTANCE;
    }
}
