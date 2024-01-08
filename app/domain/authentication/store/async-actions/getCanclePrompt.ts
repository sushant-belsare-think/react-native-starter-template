import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../../../../lib';
import {PASSWORD_REDUCER} from '../../constants/StoreConstant';
import {PasswordInteractorImpl} from '../interactors/PasswordInteractor';
import {NavigationServiceImpl} from '../../../comman/store/services/NavigationServiceImpl';
import {Alert} from 'react-native';
import {lastValueFrom} from 'rxjs';
import {
  resetOtpResponseData,
  setOtpErrorforForgotPassword,
  successMessageCreatePassword,
} from '../reducers/PasswordReducer';
import { AuthInteractorImpl } from '../interactors/AuthInteractor';
import { setCancleValues } from '../reducers/AuthReducer';

export const getCanclePrompt = createAsyncThunk<
  void,
  void,
  {state: RootState}
>(PASSWORD_REDUCER + '/cancle-prompt', async (_, thunkApi) => {
  try {
    console.log("before res from cancle");
    
    const data =
      await AuthInteractorImpl.getInstance().handlegetCanclePrompt();
    console.log("after res from cancle"+JSON.stringify(data));
    
    if (data?.code === 'OK') {
        thunkApi.dispatch(setCancleValues(data?.data))
    }
  } catch (error) {
    console.log(error);
    
  }
});
