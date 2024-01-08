import {PayloadAction} from '@reduxjs/toolkit';
import {InstanceGetUtility} from '../../../../utils/InstanceGetUtility';
import {IAuth} from '../../interfaces/IAuth';
import {IToken} from '../../interfaces/IToken';
import {Alert} from 'react-native';

export interface SignupAuthInterceptor {
  handlePending(state: IAuth): void;
  handleRejected(state: IAuth, action: any): void;
  handleFulfilled(state: IAuth, action: PayloadAction<IToken>): void;
}

export class SignupInterceptorImpl implements SignupAuthInterceptor {
  handlePending(state: IAuth): void {
    state.loading = true;
  }
  handleRejected(state: IAuth, action: any): void {
    state.loading = false;
    state.signupFormValue.isError = action?.error?.message;

    // const errorMessage = action?.error?.message;
    // if (action?.error?.name !== 'TypeError') {
    //   Alert.alert('Failed', errorMessage, [
    //     {
    //       text: 'ok',
    //       onPress: () => {},
    //     },
    //   ]);
    // }
  }
  handleFulfilled(state: IAuth, action: PayloadAction<IToken>): void {
    state.loading = false;
    state.signupFormValue.showModal = true;
  }
  private static INSTANCE: SignupAuthInterceptor;
  static getInstance(): SignupAuthInterceptor {
    this.INSTANCE = InstanceGetUtility.getInstance(
      SignupInterceptorImpl,
      this.INSTANCE,
    );
    return this.INSTANCE;
  }
}
