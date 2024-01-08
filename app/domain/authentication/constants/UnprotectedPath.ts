import {
  CHANGE_PASSWORD,
  RESEND_OTP,
  VERIFY_EMAIL,
  VERIFY_PASSWORD_OTP,
} from '../../../constant/paths';

const patches = {
  // these are patches that don't require token
  [VERIFY_EMAIL]: VERIFY_EMAIL,
  [VERIFY_PASSWORD_OTP]: VERIFY_PASSWORD_OTP,
  [RESEND_OTP]: RESEND_OTP,
  [CHANGE_PASSWORD]: CHANGE_PASSWORD,
};
export default patches;
