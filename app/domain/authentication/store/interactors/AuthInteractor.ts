import { Observable } from 'rxjs';
import { IAuth } from '../../interfaces/IAuth';
import { AuthServicesImpl } from '../services/AuthService';
import { IToken } from '../../interfaces/IToken';
import { RegEx } from '../../constants/RegEx';
import { String } from '../../constants/String';
import {
  checkForPasswordValidation,
  checkForUserNameValidation,
  setModalState,
  resetAuthReducer,
  checkFirstNameValidation,
} from '../reducers/AuthReducer';
import { AppDispatch } from '../../../../lib';
import { NavigationServiceImpl } from '../../../comman/store/services/NavigationServiceImpl';

export interface AuthInteractor {
  checkUserNameValidation(authState: IAuth): void;
  checkPasswordValidation(authState: IAuth, password: string): void;
  submitFirstNameValidation(authState: IAuth): void;
  setLoginFormValues(
    authState: IAuth,
    payload: { key: string; value: string },
  ): void;
  handleLogin(
    role: string,
    authState: IAuth,
    dispatch: AppDispatch,
  ): Observable<IToken> | boolean;
  handleSignup(
    authState: IAuth,
    dispatch: AppDispatch,
  ): Observable<IToken> | boolean;
  handleLogout(
    authState: IAuth,
    dispatch: AppDispatch,
  ): Observable<IToken> | boolean;

  navToLogin(authState: IAuth, dispatch: AppDispatch): void;
  navToOtp(authState: IAuth, dispatch: AppDispatch): void;

  submitForPasswordValidation(password: string): string | null;
  checkForSIGNUPPasswordNumberSymbol(password: string): boolean;
  checkForSIGNUPPasswordLowerCase_UpperCase(password: string): boolean;
  checkForSIGNUPPasswordMax_Char(password: string): boolean;
  checkForignUpConfirmPasswordValidation(
    confirmPassword: string,
    password: string,
  ): string | null;

  RefreshToSignInAndLogout(authState: IAuth, dispatch: AppDispatch): void;
  checkFirstNameValidation(authState: IAuth, firstName: string): void;
  checkLastNameValidation(authState: IAuth, lastName: string): void;

  checkBusinessValidation(authState: IAuth, businessName: string): void;
  checkBusinessType(authState: IAuth, businessType: string): void;

  checkEmailValidation(authState: IAuth, userName: string): void;
  checkSignUpPasswordValidation(authState: IAuth, password: string): void;
  checkSignUpConfirmPasswordValidation(
    authState: IAuth,
    confirmpassword: string,
  ): void;
  UsernameNotVerify(authState: IAuth, dispatch: AppDispatch): any;
  checkSignUpIsAgree(authState: IAuth, isagree: boolean): void;
  checkForSIGNUPEmailValidation(userName: string): string | null;
  handlegetCanclePrompt(): any;
  initialState(): IAuth;
}

export class AuthInteractorImpl implements AuthInteractor {
  constructor(
    private authServicesImpl = AuthServicesImpl.getInstance(),
    private NavServiceImpl = NavigationServiceImpl.getInstance(),
  ) { }

  handlegetCanclePrompt(): any {
    return this.authServicesImpl.handleCanclePrompt();
  }

  handleLogin(role: string, authState: IAuth, dispatch: AppDispatch): any {
    const loginFormValue = authState.loginFormValue;
    const { userName, password } = loginFormValue;
    if (userName === '' || password === '') {
      dispatch(checkForUserNameValidation());
      dispatch(checkForPasswordValidation(password));
    } else {
      // dispatch(showAcModal())
      return this.authServicesImpl.handleLogin(role, userName, password);
    }
  }

  UsernameNotVerify(authState: IAuth, dispatch: AppDispatch): any {
    const loginFormValue = authState.loginFormValue;
    const { userName, password } = loginFormValue;
    if (userName === '' || password === '') {
      dispatch(checkForUserNameValidation());
      dispatch(checkForPasswordValidation(password));
    } else {
      return this.authServicesImpl.UsernameNotVerify(authState);
    }
  }

  RefreshToSignInAndLogout(authState: IAuth, dispatch: AppDispatch): void {
    this.NavServiceImpl.resetNavToLogin(dispatch);
    dispatch(resetAuthReducer());
  }

  handleSignup(
    authState: IAuth,
    dispatch: AppDispatch,
  ): Observable<IToken> | boolean {
    const {
      firstName,
      lastName,
      userName,
      password,
      businessName,
      isValidBusinessName,
      businessType,
      confirmPassword,
      isValidFirstName,
      isValidLastName,
      isValidUserName,
      isValidPassword,
      isValidConfirmPassword,
      isAgreeValidate,
      isAgree,
    } = authState.signupFormValue;

    if (businessType === 'INDIVIDUAL') {
      if (
        firstName === '' ||
        lastName === '' ||
        userName === '' ||
        isAgree === false ||
        password === '' ||
        confirmPassword === ''
      ) {
        dispatch(checkFirstNameValidation());
      } else {
        if (
          isValidFirstName === '' &&
          isValidLastName === '' &&
          isValidUserName === '' &&
          isAgreeValidate === '' &&
          isAgree === true &&
          isValidPassword.LowerCase_UpperCase &&
          isValidPassword.NumberSymbol &&
          isValidPassword.max_Character &&
          isValidConfirmPassword === ''
        ) {
          return this.authServicesImpl.handleSignup(
            firstName,
            lastName,
            userName,
            password,
            businessName,
            businessType,
          );
        }
      }
    } else if (businessType === 'BUSINESS') {
      if (
        businessName === '' ||
        isAgree === false ||
        password === '' ||
        confirmPassword === ''
      ) {
        dispatch(checkFirstNameValidation());
      } else {
        if (
          isValidUserName === '' &&
          isAgreeValidate === '' &&
          isAgree === true &&
          isValidPassword.LowerCase_UpperCase &&
          isValidPassword.NumberSymbol &&
          isValidPassword.max_Character &&
          isValidConfirmPassword === ''

        ) {
          return this.authServicesImpl.handleSignup(
            firstName,
            lastName,
            userName,
            password,
            businessName,
            businessType,
          );
        }
      }
    }
    return false;
  }

  handleLogout(
    authState: IAuth,
    dispatch: AppDispatch,
  ): Observable<IToken> | boolean {
    const { refresh_token } = authState.token;
    console.log('refresh token.......');

    if (refresh_token) {
      return this.authServicesImpl.handleLogout(refresh_token);
    }
    return false;
  }

  checkUserNameValidation(authState: IAuth): void {
    const { userName } = authState.loginFormValue;
    authState.loginFormValue.isValidUserName =
      this.checkForLoginFormValueValidations(userName);
  }
  submitFirstNameValidation(authState: IAuth): void {
    const {
      firstName,
      lastName,
      userName,
      password,
      businessName,
      confirmPassword,
      businessType,
      isAgree,
    } = authState.signupFormValue;
    if (businessType === 'INDIVIDUAL') {
      authState.signupFormValue.isValidFirstName =
        this.submitForFirstNameValidation(firstName);

      authState.signupFormValue.isValidLastName =
        this.submitForLastNameValidation(lastName);

      authState.signupFormValue.isValidUserName =
        this.submitForUsernameValidation(userName);

      authState.signupFormValue.isValidPassword.isValidPassword =
        this.submitForPasswordValidation(password);

      authState.signupFormValue.isValidConfirmPassword =
        this.submitForPasswordValidation(confirmPassword);

      authState.signupFormValue.isAgreeValidate =
        this.submitForAgreeValidation(isAgree);
    } else if (businessType === 'BUSINESS') {
      console.log('business type======');

      authState.signupFormValue.isValidFirstName = '';

      authState.signupFormValue.isValidLastName = '';

      authState.signupFormValue.isValidUserName =
        this.submitForUsernameValidation(userName);

      authState.signupFormValue.isValidPassword.isValidPassword =
        this.submitForPasswordValidation(password);

      authState.signupFormValue.isValidConfirmPassword =
        this.submitForPasswordValidation(confirmPassword);

      authState.signupFormValue.isAgreeValidate =
        this.submitForAgreeValidation(isAgree);
    }
    authState.signupFormValue.isValidBusinessName =
      this.submitForValidBusName(businessName);
  }

  setLoginFormValues(
    authState: IAuth | any,
    payload: { key: string; value: string },
  ) {
    authState.loginFormValue[payload.key] = payload.value;
    if (payload.key === 'userName') {
      authState.loginFormValue.isValidUserName =
        this.checkForLoginFormValueValidations(payload.value);
    } else {
      authState.loginFormValue.isValidPassword =
        this.checkForLoginFormValueValidations(payload.value);
    }
  }

  checkPasswordValidation(authState: IAuth, password: string): void {
    authState.loginFormValue.isValidPassword =
      this.checkForPasswordValidations(password);
  }

  checkFirstNameValidation(authState: IAuth, firstName: string): void {
    authState.signupFormValue.isValidFirstName =
      this.checkForFirstNameValidation(firstName);
  }

  checkLastNameValidation(authState: IAuth, lastName: string): void {
    authState.signupFormValue.isValidLastName =
      this.checkForLastNameValidation(lastName);
  }

  checkBusinessValidation(authState: IAuth, businessName: string): void {
    authState.signupFormValue.isValidBusinessName =
      this.checkforBusinessValidation(businessName);
    // authState.signupFormValue.businessName = businessName
  }
  checkBusinessType(authState: IAuth, businessType: string): void {
    authState.signupFormValue.businessType = businessType;

    authState.signupFormValue.isValidFirstName = '';
    authState.signupFormValue.isValidLastName = '';
  }

  checkEmailValidation(authState: IAuth, userName: string): void {
    authState.signupFormValue.isValidUserName =
      this.checkForSIGNUPEmailValidation(userName);
  }

  checkSignUpPasswordValidation(authState: IAuth, password: string): void {
    authState.signupFormValue.isValidPassword.isValidPassword =
      this.submitForPasswordValidation(password);
    authState.signupFormValue.isValidPassword.NumberSymbol =
      this.checkForSIGNUPPasswordNumberSymbol(password);
    authState.signupFormValue.isValidPassword.LowerCase_UpperCase =
      this.checkForSIGNUPPasswordLowerCase_UpperCase(password);
    authState.signupFormValue.isValidPassword.max_Character =
      this.checkForSIGNUPPasswordMax_Char(password);
    if (authState.signupFormValue.confirmPassword.length > 0) {
      authState.signupFormValue.isValidConfirmPassword =
        this.checkForignUpConfirmPasswordValidation(
          password,
          authState.signupFormValue.confirmPassword,
        );
    }
  }

  checkSignUpConfirmPasswordValidation(
    authState: IAuth,
    password: string,
  ): void {
    authState.signupFormValue.isValidConfirmPassword =
      this.checkForignUpConfirmPasswordValidation(
        password,
        authState.signupFormValue.password,
      );
  }

  navToLogin(authState: IAuth, dispatch: AppDispatch): void {
    // dispatch(setModalState());
    this.NavServiceImpl.navToOTPfromSignup(dispatch);
  }

  navToOtp(authState: IAuth, dispatch: AppDispatch): void {
    dispatch(setModalState());
    this.NavServiceImpl.navToOtp(dispatch, 'Signup');
  }

  checkSignUpIsAgree(authState: IAuth, isagree: boolean): void {
    authState.signupFormValue.isAgree = this.checkForSignUpIsAgree(isagree);
    authState.signupFormValue.isAgreeValidate = '';
  }

  checkForPasswordValidations(password: string): boolean {
    return !(password.length > 0);
  }

  checkForLoginFormValueValidations(value: string): boolean {
    return !(value.length > 0);
  }
  submitForFirstNameValidation(firstName: string): string | null {
    return firstName.length === 0 ? 'Please enter first name' : '';
  }

  submitForLastNameValidation(lastName: string): string | null {
    return lastName.length === 0 ? 'Please enter last name' : '';
  }

  submitForAgreeValidation(isAgree: boolean): string | null {
    return isAgree ? '' : 'Please agree terms and services';
  }

  submitForValidBusName(businessName: string): string | null {
    return businessName.length > 0 ? '' : 'Please enter business name';
  }

  submitForUsernameValidation(userName: string): string | null {
    return userName.length === 0 ? 'Please enter email' : '';
  }

  submitForPasswordValidation(password: string): string | null {
    return password.length === 0 ? 'Please enter password' : '';
  }

  checkForFirstNameValidation(firstName: string): string | null {
    return firstName.length === 0
      ? ''
      : RegEx.NAME.test(firstName)
        ? ''
        : String.NameValidation;
  }

  checkForLastNameValidation(lastName: string): string | null {
    return lastName === ''
      ? ''
      : RegEx.NAME.test(lastName)
        ? ''
        : String.NameValidation;
  }

  checkforBusinessValidation(businessName: string): any {
    return '';
  }

  checkForSIGNUPEmailValidation(userName: string): string | null {
    return userName === ''
      ? ''
      : RegEx.EMAIL.test(userName)
        ? ''
        : String.EmailValidation;
  }

  checkForSIGNUPPasswordNumberSymbol(password: string): boolean {
    return RegEx.PASSWORD_NUMBER_SYMBOL.test(password) ? true : false;
  }

  checkForSIGNUPPasswordLowerCase_UpperCase(password: string): boolean {
    return RegEx.PASSWORD_LOWERCASE_UPPERCASE.test(password) ? true : false;
  }

  checkForSIGNUPPasswordMax_Char(password: string): boolean {
    return RegEx.PASSWORD_LENGTH.test(password) ? true : false;
  }

  checkForignUpConfirmPasswordValidation(
    confirmPassword: string,
    password: string,
  ): string | null {
    return confirmPassword === password ? '' : String.PasswordValidation;
  }

  checkForSignUpIsAgree(isagree: boolean): boolean {
    return !isagree;
  }

  initialState(): IAuth {
    return {
      loginFormValue: {
        userName: '',
        password: '',
        isValidUserName: false,
        isValidPassword: false,
        isError: '',
      },
      signupFormValue: {
        firstName: '',
        lastName: '',
        userName: '',
        password: '',
        confirmPassword: '',
        isAgree: false,
        businessName: '',
        businessType: 'INDIVIDUAL',
        isValidBusinessName: '',
        isValidFirstName: '',
        isValidLastName: '',
        isValidUserName: '',
        isValidPassword: {
          isValidPassword: '',
          NumberSymbol: false,
          LowerCase_UpperCase: false,
          max_Character: false,
        },
        isValidConfirmPassword: '',
        showModal: false,
        isAgreeValidate: '',
        isError: '',

      },
      token: {
        access_token: '',
        expires_in: 0,
        refresh_expires_in: 0,
        refresh_token: '',
        scope: '',
        session_state: '',
        token_type: '',
        loading: false,
      },
      refData: {
        access_token: '',
        expires_in: 0,
        refresh_expires_in: 0,
        refresh_token: '',
        scope: '',
        session_state: '',
        token_type: '',
        loading: false,
      },
      isError: '',
      loading: false,
      organicUser: true,
      role: '',
      baseUrl: 'https://stage.api.thepayee.ai',
      rasabaseUrl: 'https://stage.chat.api.thepayee.ai/',
      authbaseUrl: 'https://stage.auth.thepayee.ai/realms/stage',
      selectedEnv: 'stage',
      authClientId: 'payee-stage',
      authClientSecret: 'PPbz1aUrF1kG9GPqIRmjL5smsszSGSg7',
      connectionState: true,
      isFromDeepLink: false,
      canclePrompt: [],
      payerPayeeModal: false,
      profileApiCall: false,
      tempToken: '',
    };
  }

  private static INSTANCE: AuthInteractor;
  static getInstance(): AuthInteractor {
    if (this.INSTANCE) {
      return this.INSTANCE;
    }
    this.INSTANCE = new AuthInteractorImpl();
    return this.INSTANCE;
  }
}
