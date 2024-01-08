import {PayloadAction} from '@reduxjs/toolkit';
import {InstanceGetUtility} from '../../../../utils/InstanceGetUtility';
import {IAuth} from '../../interfaces/IAuth';
import {IToken} from '../../interfaces/IToken';

export interface ProfileInterceptor {
  handlePending(state: IAuth): void;
  handleRejected(state: IAuth, action: any): void;
  handleFulfilled(state: IAuth, action: PayloadAction<IToken>): void;
}

export class ProfileInterceptorImpl implements ProfileInterceptor {
  handlePending(state: IAuth): void {
    // console.log("profile interceptor");
    
    // state.loading = true;
    state.loginFormValue.isError = '';
  }
  handleRejected(state: IAuth, action: any): void {
    state.loading = false;
    state.loginFormValue.isError = action?.error?.message;
    // console.log("error......."+action?.error?.message);
    
  }
  handleFulfilled(state: IAuth, action: PayloadAction<IToken>): void {
    state.loading = false;
    state.loginFormValue.isError = '';
    // state.token = action.payload.data;
  }
  private static INSTANCE: ProfileInterceptorImpl;
  static getInstance(): ProfileInterceptor {
    this.INSTANCE = InstanceGetUtility.getInstance(
        ProfileInterceptorImpl,
      this.INSTANCE,
    );
    return this.INSTANCE;
  }
}
