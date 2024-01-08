export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';
export const REQUEST = 'REQUEST';
export const START = 'START';
export const RESET = 'RESET';

export interface IActionTypes {
  request: string;
  start: string;
  success: string;
  failure: string;
  reset: string;
}

export interface IAction {
  type: string;
  payload?: any;
  response?: any;
}

export interface IActions {
  request: (payload?: object) => IAction;
  start?: (payload?: object) => IAction;
  success?: (payload?: object, response?: any) => IAction;
  failure?: (payload?: object, response?: any) => IAction;
  reset?: (payload?: object) => IAction;
}

export const createActionTypes = (type: string): IActionTypes => ({
  request: `${type}/${REQUEST}`,
  start: `${type}/${START}`,
  success: `${type}/${SUCCESS}`,
  failure: `${type}/${FAILURE}`,
  reset: `${type}/${RESET}`,
});

export const createAction =
  (type: string): Function =>
  (payload?: object): IAction => ({
    type,
    payload,
  });

export const makeActionByTypes = (
  actionTypes: IActionTypes | any,
): IActions => {
  const keys = Object.keys(actionTypes);
  return keys.reduce((previousValue: IActions | any, key: string) => {
    previousValue[key] = createAction(actionTypes[key]);
    return previousValue;
  }, {});
};
