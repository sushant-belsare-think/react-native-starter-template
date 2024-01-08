import {IAuth} from '../../interfaces/IAuth';
import {PayloadAction} from '@reduxjs/toolkit';
import {AuthInteractorImpl} from '../interactors/AuthInteractor';
import {IKeyValue} from '../../../comman/interfaces/IKeyValue';

export const setSignupFormValuesAction = (
  state: IAuth | any,
  action: PayloadAction<IKeyValue>,
) => {
  state.signupFormValue[action.payload.key] = action.payload.value;
  // if (action.payload.key === 'password') {
  //   AuthInteractorImpl.getInstance().checkPasswordValidation(
  //     state,
  //     action.payload.value,
  //   );
  // } else
  if (action.payload.key === 'firstName') {
    AuthInteractorImpl.getInstance().checkFirstNameValidation(
      state,
      action.payload.value,
    );
  } else if (action.payload.key === 'lastName') {
    AuthInteractorImpl.getInstance().checkLastNameValidation(
      state,
      action.payload.value,
    );
  }else if (action.payload.key === 'userName') {
    AuthInteractorImpl.getInstance().checkEmailValidation(
      state,
      action.payload.value,
    );
  }  
  else if (action.payload.key === 'businessName') {
    AuthInteractorImpl.getInstance().checkBusinessValidation(
      state,
      action.payload.value,
    );
  }
  else if (action.payload.key === 'businessType') {
    AuthInteractorImpl.getInstance().checkBusinessType(
      state,
      action.payload.value,
    );
  }
  else if (action.payload.key === 'password') {
    AuthInteractorImpl.getInstance().checkSignUpPasswordValidation(
      state,
      action.payload.value,
    );
  } else if (action.payload.key === 'confirmPassword') {
    AuthInteractorImpl.getInstance().checkSignUpConfirmPasswordValidation(
      state,
      action.payload.value,
    );
  } else if (action.payload.key === 'isagree') {
    AuthInteractorImpl.getInstance().checkSignUpIsAgree(
      state,
      action.payload.value,
    );
  }
};
