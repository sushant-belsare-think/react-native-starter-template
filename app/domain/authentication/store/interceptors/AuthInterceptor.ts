import {PayloadAction} from '@reduxjs/toolkit';
import {InstanceGetUtility} from '../../../../utils/InstanceGetUtility';
import {IAuth} from '../../interfaces/IAuth';
import {IToken} from '../../interfaces/IToken';

export interface AuthInterceptor {
  handlePending(state: IAuth): void;
  handleRejected(state: IAuth, action: any): void;
  handleFulfilled(state: IAuth, action: PayloadAction<IToken>): void;
}

export class AuthInterceptorImpl implements AuthInterceptor {
  handlePending(state: IAuth): void {
    state.loading = true;
    state.loginFormValue.isError = '';
  }
  handleRejected(state: IAuth, action: any): void {
    state.loading = false;
    state.loginFormValue.isError = action?.error?.message;
    console.log('error.......' + action?.error?.message);
  }
  handleFulfilled(state: IAuth, action: PayloadAction<IToken>): void {
    state.loading = true;
    state.loginFormValue.isError = '';
    state.refData = action.payload.data;
  }
  private static INSTANCE: AuthInterceptorImpl;
  static getInstance(): AuthInterceptor {
    this.INSTANCE = InstanceGetUtility.getInstance(
      AuthInterceptorImpl,
      this.INSTANCE,
    );
    return this.INSTANCE;
  }
}
