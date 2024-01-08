import {SignUpPasswordValidation} from './ISignUpPasswordValidation';

export interface ISignupFormValue {
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  businessName : string;
  businessType : string;
  confirmPassword: string;
  isAgree: boolean;
  isValidBusinessName : string | null;
  isValidFirstName: string | null;
  isValidLastName: string | null;
  isValidUserName: string | null;
  isValidConfirmPassword: string | null;
  isValidPassword: SignUpPasswordValidation;
  isAgreeValidate: string | null;
  showModal: boolean;
  isError: string;
}
