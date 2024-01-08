import {
  createActionTypes,
  makeActionByTypes,
} from '../../../config/ReduxHelperConfig';
import {ACTIONS_PACKAGE} from '../../../constant/package';

const SUBMIT_LOGIN = createActionTypes(
  `${ACTIONS_PACKAGE}.SUBMIT_LOGIN_ACTION`,
);
const SUBMIT_SIGNUP = createActionTypes(
  `${ACTIONS_PACKAGE}.SUBMIT_SIGNUP_ACTION`,
);
const SUBMIT_LOGOUT = createActionTypes(
  `${ACTIONS_PACKAGE}.SUBMIT_SIGNOUT_ACTION`,
);

const submitLoginAction = makeActionByTypes(SUBMIT_LOGIN);
const submitSignUpAction = makeActionByTypes(SUBMIT_SIGNUP);
const submitSignOutAction = makeActionByTypes(SUBMIT_LOGOUT);

export {
  submitLoginAction,
  SUBMIT_LOGIN,
  submitSignUpAction,
  SUBMIT_SIGNUP,
  submitSignOutAction,
  SUBMIT_LOGOUT,
};
