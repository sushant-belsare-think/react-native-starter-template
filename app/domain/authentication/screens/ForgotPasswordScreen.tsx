import { AppState, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { ForgotPasswordScreenStyles as styles } from '../styles/ForgotPasswordScreenStyles';
import {
  EMAIL,
  FORGOTPASS_IMAGE,
  FORGOT_PASS_INSTRUCTION,
  FORGOT_YOUR_PASS,
  SEND_OTP,
} from '../constants/strings';
import Button from '../Components/Buttoncomponent/Button';
import Banner from '../Components/Banner/Banner';
import InputBox from '../Components/InputBox/InputBox';
import { addEmailToGetOTPAndValidate, removeErrorForgotPassword, resetForgotPasswordData } from '../store/reducers/PasswordReducer';
import { RootState, useAppDispatch, useAppSelector } from '../../../lib';
import ErrorText from '../Components/ErrorText/ErrorText';
import { SubmitForgotPasswordMailSendAction } from '../store/async-actions/SubmitForgotPasswordMailSendAction';
import { useIsFocused } from '@react-navigation/native';
import Loader from '../../comman/components/Loader/Loader';
import OtpScreen from './OtpScreen';
import ErrorComponent from '../Components/ErrorComponent/ErrorComponent';

const ForgotPasswordScreen = () => {
  const dispatch = useAppDispatch();
  const focus = useIsFocused();
  const forgotPassSelector = useAppSelector(
    (state: RootState) => state.password.forgotPass,
  ); OtpScreen
  const loading = useAppSelector((state: RootState) => state.password.forgotPass.loading);

  useEffect(() => {
    dispatch(resetForgotPasswordData())
  }, [focus]);

  const isError = useAppSelector(
    (state: RootState) => state.password.forgotPass.isError,
  );

  const removeError=()=>{
    dispatch(removeErrorForgotPassword())
  }

  if(isError !== '')
  {
    setTimeout(()=>{
      dispatch(removeErrorForgotPassword())
    },2000)
  }

  // console.log("eeee  "+isErro)

  const passwordSelector = useAppSelector((state: RootState) => state.password);
  return (
    <View style={styles.mainContainer}>
      <Banner image={FORGOTPASS_IMAGE} text={FORGOT_YOUR_PASS} back={true} />
      <View style={styles.wrapper}>
        <View style={styles.instructionTextContainer}>
          <Text style={styles.instructionText}>{FORGOT_PASS_INSTRUCTION}</Text>
        </View>
        <View
          style={
            forgotPassSelector.emailError === ''
              ? styles.marginBottom20
              : styles.marginBottom10
          }>
          <InputBox
            error={!(forgotPassSelector.emailError === '')}
            label={EMAIL}
            value={forgotPassSelector.email}
            style={styles.marginTop5}
            onChange={email => {
              dispatch(addEmailToGetOTPAndValidate(email));
            }}
          />
          {forgotPassSelector.emailError && (
            <ErrorText ErrorMessage={forgotPassSelector.emailError} />
          )}
        </View>

        <View>
          <View>
            <Button
              text={SEND_OTP}
              onPress={() => {
                dispatch(SubmitForgotPasswordMailSendAction());
              }}
              disabled={true}
            />
          </View>
        </View>
      </View>
      {loading && <Loader />}
      {isError !== '' && isError !== undefined &&
      <ErrorComponent message={isError} 
      // disableHandle={removeError} 
      />
      }
    </View>
  );
};

export default ForgotPasswordScreen;
