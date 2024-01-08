import { PayloadAction } from '@reduxjs/toolkit';
import { InstanceGetUtility } from '../../../../utils/InstanceGetUtility';
import { IAuth } from '../../interfaces/IAuth';
import { IToken } from '../../interfaces/IToken';
import { Alert } from 'react-native';

export interface SignupResendOtpInterceptor {
    handlePending(state: any): void;
    handleRejected(state: any, action: any): void;
    handleFulfilled(state: any): void;
}

export class SignupResendOtpInterceptorImpl implements SignupResendOtpInterceptor {
    handlePending(state: any): void {
        state.otpTab.loading = true
    }
    handleRejected(state: any, action: any): void {
        state.otpTab.loading = false;
    }
    handleFulfilled(state: any): void {
        state.otpTab.loading = false;
    }
    private static INSTANCE: SignupResendOtpInterceptor;
    static getInstance(): SignupResendOtpInterceptor {
        this.INSTANCE = InstanceGetUtility.getInstance(
            SignupResendOtpInterceptorImpl,
            this.INSTANCE,
        );
        return this.INSTANCE;
    }
}
