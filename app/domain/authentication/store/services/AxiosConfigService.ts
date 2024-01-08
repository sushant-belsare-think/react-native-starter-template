import axios, {AxiosRequestConfig} from 'axios';
import {catchError, lastValueFrom, map, of} from 'rxjs';
import {BASE_URL_API} from '../../../../config';

export interface AxiosConfigService {
  configBaseUrl(): void;
  configInterceptorRequest(): void;
  configInterceptorResponse(disconnect: () => void): void;
}

export class AxiosConfigServiceImpl implements AxiosConfigService {
  private constructor(
    private foodListService = FoodListServiceImpl.getInstance(),
  ) {}

  private excludeUrlList = [
    '/login',
    '/i18n/bundle',
    'https://maps.googleapis.com/maps/api',
    'api/login',
  ];

  configBaseUrl(): void {
    axios.defaults.baseURL = BASE_URL_API;
  }

  private isExcludeUrl(url?: string): boolean {
    if (!url) {
      return false;
    }
    return this.excludeUrlList.some(urlFromList => urlFromList.startsWith(url));
  }

  private configHeaders(
    config: AxiosRequestConfig,
    token: string,
  ): AxiosRequestConfig {
    config.headers['x-auth-token'] = token;
    config.headers['Content-Type'] = 'application/json';
    return config;
  }

  configInterceptorRequest(): void {
    axios.interceptors.request.use(config => {
      if (this.isExcludeUrl(config.url) || !config) {
        return config;
      }

      const config$ = this.credentialService.get().pipe(
        map(credential => this.configHeaders(config, credential.token)),
        catchError(() => {
          return of(config);
        }),
      );

      return lastValueFrom(config$);
    });
  }
}
