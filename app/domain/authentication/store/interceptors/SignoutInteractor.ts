import {PayloadAction} from '@reduxjs/toolkit';
import {InstanceGetUtility} from '../../../../utils/InstanceGetUtility';
import {IAuth} from '../../interfaces/IAuth';
import {IToken} from '../../interfaces/IToken';
import {Alert} from 'react-native';

export interface SignoutAuthInterceptor {
  handlePending(state: IAuth): void;
  handleRejected(state: IAuth, action: any): void;
  handleFulfilled(state: IAuth, action: PayloadAction<IToken>): void;
}

export class SignoutInterceptorImpl implements SignoutAuthInterceptor {
  handlePending(state: IAuth): void {
    state.loading = true;
  }
  handleRejected(state: IAuth, action: any): void {
    state.loading = false;
    state.isError =  action?.error?.message;
  }
  handleFulfilled(state: IAuth, action: PayloadAction<IToken>): void {
    state.loading = false;
    // state.signupFormValue.showModal = true;
  }
  private static INSTANCE: SignoutAuthInterceptor;
  static getInstance(): SignoutAuthInterceptor {
    this.INSTANCE = InstanceGetUtility.getInstance(
      SignoutInterceptorImpl,
      this.INSTANCE,
    );
    return this.INSTANCE;
  }
}
