import {Observable} from 'rxjs';
import {IToken} from '../../interfaces/IToken';
import {AuthRepositoryImpl} from '../repositories/AuthRepository';
import {PasswordRepositoryImpl} from '../repositories/PasswordRepositoryImpl';

export interface AuthServices {
  setAccessToken(token: string): void;
  handleLogin(
    role: string,
    userName: string,
    password: string,
  ): Observable<IToken>;
  handleSignup(
    firstName: string,
    lastName: string,
    userName: string,
    password: string,
    businessName?: string,
    businessType?: string,
  ): Observable<IToken>;
  handleLogout(token: string): Observable<IToken>;
  UsernameNotVerify(authState: any): any;
  handleCanclePrompt(): any;
}

export class AuthServicesImpl implements AuthServices {
  constructor(
    private authRepository = AuthRepositoryImpl.getInstance(),
    private passwordRepo = PasswordRepositoryImpl.getInstance(),
  ) {}

  handleCanclePrompt(){
    return this.authRepository.handlegetCanclePrompt()
  }
  handleLogin(
    role: string,
    userName: string,
    password: string,
  ): Observable<IToken> {
    userName = userName.replace(/\s/g, '');
    return this.authRepository.handleLogin({role, userName, password});
  }
  handleSignup(
    firstName: string,
    lastName: string,
    userName: string,
    password: string,
    businessName?: string,
    businessType?: string,
  ): Observable<IToken> {
    firstName = firstName.replace(/\s/g, '');
    lastName = lastName.replace(/\s/g, '');

    return this.authRepository.handleSignup({
      firstName,
      lastName,
      userName,
      password,
      businessName,
      businessType,
    });
  }
  handleLogout(token: string): Observable<IToken> {
    console.log('logout service +++++++++ ' + {token});

    return this.authRepository.handleLogout({token});
  }

  UsernameNotVerify(authState: any): any {
    console.log(
      'Username from verify user from login flow.....' +
        authState.loginFormValue.userName,
    );
    return this.passwordRepo.handleForgotPassword({
      email: authState.loginFormValue.userName,
    });
  }

  setAccessToken(token: string): void {
    console.log(
      '🚀 ~ file: AuthService.ts:76 ~ AuthServicesImpl ~ setAccessToken ~ token:',
      token,
    );
    // user Repo here
  }

  private static INSTANCE: AuthServices;
  static getInstance(): AuthServices {
    if (this.INSTANCE) {
      return this.INSTANCE;
    }
    this.INSTANCE = new AuthServicesImpl();
    return this.INSTANCE;
  }
}
