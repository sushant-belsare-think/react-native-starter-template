/* eslint-disable @typescript-eslint/no-shadow */
import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';

const PROD = 'https://api.baseURL.ai';
const DEV = 'https://dev.api.baseURL.ai';
const STAGE = 'https://stage.api.baseURL.ai';
const QA = 'https://qa.api.baseURL.ai';

let env = 'DEV';

const instance: AxiosInstance = axios.create({
  // baseURL: BASE_URL,
  // baseURL : 'https://dev.api.baseURL.ai',
  headers: {
    'Content-Type': 'application/json',
    
  },
  timeout: 16000,
});

export const envChanger = (string: string) => {
  env = string;
  switch (env) {
    case 'DEV':
      instance.defaults.baseURL = DEV;
      break;
    case 'PROD':
      instance.defaults.baseURL = PROD;
      break;
    case 'STAGE':
      instance.defaults.baseURL = STAGE;
      break;
    case 'QA':
      instance.defaults.baseURL = QA;
      break;
    default:
      instance.defaults.baseURL = DEV;
  }
};

export const defaultEnvChanger = (url: string) => {
  instance.defaults.baseURL = url;
};

const get = <R>(url: string, config?: AxiosRequestConfig): Promise<R> =>
  instance.get(url, config).then(({data}) => data);
const post = <D, R>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
): Promise<R> =>
  instance.post(url, data, config).then(res => {
    console.log('🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀', res);
    return res.data;
  });
const put = <D, R>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
): Promise<R> => instance.put(url, data, config).then(({data}) => data);
const _delete = <R>(url: string, config?: AxiosRequestConfig): Promise<R> =>
  instance.delete(url, config).then(({data}) => data);
const patch = <D, R>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
): Promise<R> => instance.patch(url, data, config).then(({data}) => data);

export {get, put, post, _delete, patch, instance};
