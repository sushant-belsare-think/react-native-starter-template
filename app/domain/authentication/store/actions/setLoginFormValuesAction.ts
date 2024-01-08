import {IKeyValue} from '../../../comman/interfaces/IKeyValue';
import {IAuth} from '../../interfaces/IAuth';
import {AuthInteractorImpl} from '../interactors/AuthInteractor';
import {PayloadAction} from '@reduxjs/toolkit';

export const setLoginFormValuesAction = (
  state: IAuth | any,
  action: PayloadAction<IKeyValue>,
) => {
  state.loginFormValue[action.payload.key] = action.payload.value;
  AuthInteractorImpl.getInstance().setLoginFormValues(state, action.payload);
  // if (action.payload.key === 'password') {
  //   AuthInteractorImpl.getInstance().checkPasswordValidation(
  //     state,
  //     action.payload.value,
  //   );
  // }
};
