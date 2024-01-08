import { InstanceGetUtility } from '../../../../utils/InstanceGetUtility';

export interface SubmitForgotPasswordMailSendInterceptor {
    handlePending(state: any): void;
    handleRejected(state: any, action: any): void;
    handleFulfilled(state: any, action: any): void;
}

export class SubmitForgotPasswordMailSendInterceptorImpl implements SubmitForgotPasswordMailSendInterceptor {
    handlePending(state: any): void {
        state.forgotPass.loading = true;
    }
    handleRejected(state: any, action: any): void {
        console.log("interceptor//...."+JSON.stringify(action?.error?.message))
        state.forgotPass.loading = false;
        state.forgotPass.isError = action?.error?.message
    }
    handleFulfilled(state: any, action: any): void {
        state.forgotPass.loading = false;
    }

    private static INSTANCE: SubmitForgotPasswordMailSendInterceptor;
    static getInstance(): SubmitForgotPasswordMailSendInterceptor {
        this.INSTANCE = InstanceGetUtility.getInstance(
            SubmitForgotPasswordMailSendInterceptorImpl,
            this.INSTANCE,
        );
        return this.INSTANCE;
    }
}
