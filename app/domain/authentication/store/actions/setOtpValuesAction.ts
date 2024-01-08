import { IAuth } from '../../interfaces/IAuth';
import { PayloadAction } from '@reduxjs/toolkit';
import { AuthInteractorImpl } from '../interactors/AuthInteractor';
import { IKeyValue } from '../../../comman/interfaces/IKeyValue';

export const setOtpValuesAction = (
    state: IAuth | any,
    action: PayloadAction<IKeyValue>,
) => {
    state.otpTab.otp = action.payload;
}