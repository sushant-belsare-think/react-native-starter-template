import {Observable, from, map} from 'rxjs';
import {ILoginRequest} from '../../interfaces/ILoginRequest';
import {IToken} from '../../interfaces/IToken';
import qs from 'qs';
import axios from 'axios';
import {ISignupRequest} from '../../interfaces/ISignupRequest';
import {ILogoutRequest} from '../../interfaces/ILogoutRequest';
import {getStore} from '../../../../lib';
import { get } from '../../../../config/ApiConfigs';
export interface AuthRepository {
  setAccessToken(token: string): void;
  handleLogin(loginRequestData: ILoginRequest): Observable<IToken>;
  handleSignup(signupRequestData: ISignupRequest): Observable<IToken>;
  handleLogout(token: ILogoutRequest): Observable<IToken>;
  handlegetCanclePrompt(): any;
}

export class AuthRepositoryImpl implements AuthRepository {

  handlegetCanclePrompt(): any {
    return get("/user/cancel-prompt")
  }

  handleLogin(loginRequestData: ILoginRequest): Observable<any> {
    const auth = getStore().getState().auth;
    const data = {
      username: loginRequestData.userName,
      password: loginRequestData.password,
      grant_type: 'password',
      client_id: auth.authClientId,
      client_secret: auth.authClientSecret,
    };

    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        //  'X-USER-CONTEXT' : loginRequestData.role
      },
      data: qs.stringify(data),
      // url: 'https://dev.auth.thepayee.ai/realms/development/protocol/openid-connect/token',
      url: `${auth.authbaseUrl}/protocol/openid-connect/token`,
    };
    console.log("**************************** 000inside login   *********************"+JSON.stringify(options));
    

    return from(
      axios(options)
        .then(res => {
          if (res.status === 200) {
            return res;
          }
        })
        .catch(err => {
          console.log(
            '🚀 ~ file: AuthRepository.ts:42 ~ AuthRepositoryImpl ~ handleLogin ~ error:',
            err,
          );
          throw new Error(err.response.data.error_description);
        }),
    ).pipe(map(response => response));
  }

  handleSignup(signupRequestData: ISignupRequest): Observable<any> {
    let data = null;
    if (signupRequestData.businessType === 'INDIVIDUAL') {
      data = {
        firstName: signupRequestData.firstName,
        lastName: signupRequestData.lastName,
        email: signupRequestData.userName,
        password: signupRequestData.password,
      };
    } else if (signupRequestData.businessType === 'BUSINESS') {
      data = {
        firstName: signupRequestData.firstName,
        lastName: signupRequestData.lastName,
        email: signupRequestData.userName,
        password: signupRequestData.password,
        companyType: signupRequestData.businessType,
        businessName: signupRequestData.businessName,
      };
    }
    const baseURL = getStore().getState().auth.baseUrl;

    const options = {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      data: data,
      // url: 'https://dev.api.baseURL.ai/user/signup',
      url: `${baseURL}/user/signup`,
    };
    return from(
      axios(options)
        .then(res => {
          console.log(
            '🚀 ~ file: AuthRepository.ts:58 ~ AuthRepositoryImpl ~ axios ~ res:',
            res,
          );
          if (res.status === 201 || res.status === 200) {
            return res;
          }
        })
        .catch(err => {
          console.log(
            '🚀 ~ file: AuthRepository.ts:63 ~ AuthRepositoryImpl ~ axios ~ err:',
            err,
          );
          throw new Error(err?.response?.data?.message);
          // return err?.response?.data?.message;
        }),
    );
  }

  handleLogout(token: ILogoutRequest): Observable<any> {
    const auth = getStore().getState().auth;
    const data = {
      client_id: auth.authClientId,
      refresh_token: token.token,
      client_secret: auth.authClientSecret,
    };
    const options = {
      method: 'POST',
      headers: {'content-type': 'application/x-www-form-urlencoded'},
      data: data,
      // url: 'https://dev.auth.thepayee.ai/realms/development/protocol/openid-connect/logout',
      url: `${auth.authbaseUrl}/protocol/openid-connect/logout`,
    };

    console.log('inside logout repo************');

    return from(
      axios(options).then(res => {
        console.log('***************inside*********' + JSON.stringify(res));

        if (res.status === 204) {
          return res;
        }
      }),
    );
  }

  generateUrlToLogin(url: string) {
    return url + 'enter the url';
  }

  setAccessToken(token: string): void {}

  private static INSTANCE: AuthRepository;
  static getInstance(): AuthRepository {
    if (this.INSTANCE) {
      return this.INSTANCE;
    }
    this.INSTANCE = new AuthRepositoryImpl();
    return this.INSTANCE;
  }
}
