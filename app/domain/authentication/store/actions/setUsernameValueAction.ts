import { IAuth } from '../../interfaces/IAuth';
import { PayloadAction } from '@reduxjs/toolkit';
import { IKeyValue } from '../../../comman/interfaces/IKeyValue';

export const setUsernameValueAction = (
  state: IAuth | any,
  action: PayloadAction<IKeyValue>,
) => {
  state.otpTab.email = action.payload;
};
