import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CreatePasswordScreenStyles as styles} from '../styles/CreatePasswordScreenStyles';
import {
  CONFIRM_PASSWORD,
  CREATEPASS_IMAGE,
  CREATE_NEW_PASSWORD,
  CREATE_PASS_INSTRUCTION,
  PASSWORD,
  RESET_PASSWORD,
} from '../constants/strings';
import Banner from '../Components/Banner/Banner';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import InputBox from '../Components/InputBox/InputBox';
import Button from '../Components/Buttoncomponent/Button';
import ErrorText from '../Components/ErrorText/ErrorText';
import {RootState, useAppDispatch, useAppSelector} from '../../../lib';
import {
  removeErrorCreatePassword,
  removeSuccessOtpSuccessmessageLogin,
  resetCreatePasswordValue,
  setResetPasswordFormValues,
} from '../store/reducers/PasswordReducer';
import {String} from '../constants/String';
import {SubmitResetPasswordAction} from '../store/async-actions/SubmitResetPasswordAction';
import Loader from '../../comman/components/Loader/Loader';
import ErrorComponent from '../Components/ErrorComponent/ErrorComponent';

const CreatePasswordScreen = () => {
  const resetPassSelector = useAppSelector(
    (state: RootState) => state.password.resetPass,
  );
  const otpid = useAppSelector(
    (state: RootState) => state.password.otpTab.otpId,
  );
  const loading = useAppSelector(
    (state: RootState) => state.password.resetPass.loading,
  );
  const isError = useAppSelector(
    (state: RootState) => state.password.resetPass.isError,
  );
  const successMessage = useAppSelector(
    (state: RootState) => state.password.otpTab.OtpSuccessMessage,
  );

  // console.log("Success from create....."+successMessage);
  const dispatch = useAppDispatch();

  if (isError !== '') {
    setTimeout(() => {
      dispatch(removeErrorCreatePassword());
    }, 2000);
  }

  useEffect(() => {
    if (successMessage !== '') {
      setTimeout(() => {
        dispatch(removeSuccessOtpSuccessmessageLogin());
      }, 2000);
    }
  }, [successMessage]);

  const isFocuse = useIsFocused();

  useEffect(() => {
    dispatch(resetCreatePasswordValue());
  }, [isFocuse]);

  return (
    <View style={styles.mainContainer}>
      <Banner image={CREATEPASS_IMAGE} text={CREATE_NEW_PASSWORD} back={true} />
      <View style={styles.wrapper}>
        <View
          style={resetPassSelector.password.length === 0 && {marginBottom: 5}}>
          <InputBox
            value={resetPassSelector.password}
            error={resetPassSelector.password.length > 0}
            label={PASSWORD}
            secureTextEntry={true}
            onChange={(text: string) => {
              dispatch(
                setResetPasswordFormValues({key: 'password', value: text}),
              );
            }}
          />
          {resetPassSelector.password.length > 0 && (
            <View>
              <ErrorText
                fontsize={10}
                ErrorMessage={String.numberSymbol}
                isSuccess={resetPassSelector.NumberSymbol}
              />
              <ErrorText
                fontsize={10}
                ErrorMessage={String.lowerUpperCase}
                isSuccess={resetPassSelector.LowerCase_UpperCase}
              />
              <ErrorText
                fontsize={10}
                ErrorMessage={String.maxCharacters}
                isSuccess={resetPassSelector.max_Character}
              />
            </View>
          )}
          {resetPassSelector.isValidPassword.length > 0 && (
            <ErrorText
              ErrorMessage={resetPassSelector.isValidPassword}
              isSuccess={false}
            />
          )}
        </View>
        <View style={{marginBottom: 15}}>
          <InputBox
            value={resetPassSelector.confirmPassword}
            label={CONFIRM_PASSWORD}
            error={!(resetPassSelector.isValidConfirmPassword.length > 0)}
            secureTextEntry={true}
            onChange={(text: string) => {
              dispatch(
                setResetPasswordFormValues({
                  key: 'confirmPassword',
                  value: text,
                }),
              );
            }}
          />
          {resetPassSelector.isValidConfirmPassword.length > 0 && (
            <ErrorText
              ErrorMessage={resetPassSelector.isValidConfirmPassword}
              isSuccess={false}
            />
          )}
        </View>
        <View>
          <View>
            <Button
              text={RESET_PASSWORD}
              disabled={true}
              onPress={() => {
                dispatch(SubmitResetPasswordAction());
                // navigation.navigate('Signin');
              }}
            />
          </View>
        </View>
      </View>
      {loading && <Loader />}
      {isError !== '' && <ErrorComponent message={isError} />}
      {successMessage !== '' && (
        <ErrorComponent message={successMessage} success={true} />
      )}
    </View>
  );
};

export default CreatePasswordScreen;
