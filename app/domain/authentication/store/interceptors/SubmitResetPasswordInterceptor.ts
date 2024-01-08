import { InstanceGetUtility } from '../../../../utils/InstanceGetUtility';

export interface SubmitResetPasswordInterceptor {
    handlePending(state: any): void;
    handleRejected(state: any): void;
    handleFulfilled(state: any, action: any): void;
}

export class SubmitResetPasswordInterceptorImpl implements SubmitResetPasswordInterceptor {
    handlePending(state: any): void {
        state.resetPass.loading = true;
    }
    handleRejected(state: any): void {
        state.resetPass.loading = false;
    }
    handleFulfilled(state: any, action: any): void {
        state.resetPass.loading = false;
    }

    private static INSTANCE: SubmitResetPasswordInterceptor;
    static getInstance(): SubmitResetPasswordInterceptor {
        this.INSTANCE = InstanceGetUtility.getInstance(
            SubmitResetPasswordInterceptorImpl,
            this.INSTANCE,
        );
        return this.INSTANCE;
    }
}
