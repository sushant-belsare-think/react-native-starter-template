import {
  ImageBackground,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Check from 'react-native-vector-icons/Octicons';
import CheckBox from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../../assets/colors';
import { ImagePath } from '../constants/ImagePathConstant';
import { String } from '../constants/String';
import { SignUpScreenStyle } from '../styles/SignUpScreenStyle';
import InputBox from '../Components/InputBox/InputBox';
import SignUpFooter from '../Components/SignUpFooter/SignUpFooter';
import Button from '../../comman/components/Button/Button';
import ErrorText from '../Components/ErrorText/ErrorText';
import { useDispatch } from 'react-redux';
import {
  cancleErrorComponent,
  cancleErrorTextForSignup,
  resetIsFromDeepLink,
  resetSignupFormValues,
  setSignupFormValues,
} from '../store/reducers/AuthReducer';
import { useSelectors } from '../../../lib/redux/Selectors';
import { RootState, useAppSelector } from '../../../lib';
import axios from 'axios';
import Loader from '../../comman/components/Loader/Loader';
import SubmitSignupAction from '../store/async-actions/SubmitSignUpAction';
import { Modal } from 'react-native-paper';
import { OtpScreenStyle } from '../styles/OtpScreenStyle';
import { navigateToLoginAction } from '../store/actions/navigateToLoginAction';
import { useIsFocused } from '@react-navigation/native';
import { InputBoxStyle } from '../Components/InputBox/InputBoxStyle';
import { heights } from '../constants/dimensionConstant';
import ErrorComponent from '../Components/ErrorComponent/ErrorComponent';
import Video from 'react-native-video';
import FastImage from 'react-native-fast-image';
import { DropDown } from '../Components/Dropdown/Dropdown';

const SignUpScreen = ({ navigation }: any) => {
  const authSelector = useAppSelector((state: RootState) => state.auth);
  const [checkTerm, setCheckTerm] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const loading = useAppSelector((state: RootState) => state.auth.loading);
  const showModal = useAppSelector(
    (state: RootState) => state.auth.signupFormValue.showModal,
  );
  const [modal, setModal] = useState(false);
  const { height, width } = Dimensions.get('screen');

  const [selected, setSelected] = useState<any>('INDIVIDUAL');

  const dispatch = useDispatch();

  const { auth } = useSelectors();


  useEffect(() => {
    // dispatch(resetSignupFormValues());
    // console.log("Selected---",selected)
  }, [selected]);

  const isError = useAppSelector(
    (state: RootState) => state.auth.signupFormValue.isError,
  );
  const numberSymbol = auth.signupFormValue.isValidPassword.NumberSymbol;
  const lowerUpperCase =
    auth.signupFormValue.isValidPassword.LowerCase_UpperCase;
  const max_char = auth.signupFormValue.isValidPassword.max_Character;
  const confirmValidation = auth.signupFormValue.isValidConfirmPassword;
  const isValidPassword = auth.signupFormValue.isValidPassword.isValidPassword;

  const fName = useAppSelector(
    (state: RootState) => state.auth.signupFormValue.firstName,
  );
  const lName = useAppSelector(
    (state: RootState) => state.auth.signupFormValue.lastName,
  );
  const email = useAppSelector(
    (state: RootState) => state.auth.signupFormValue.userName,
  );
  const Password = useAppSelector(
    (state: RootState) => state.auth.signupFormValue.password,
  );
  const conPassword = useAppSelector(
    (state: RootState) => state.auth.signupFormValue.confirmPassword,
  );
  const agree = useAppSelector(
    (state: RootState) => state.auth.signupFormValue.isAgree,
  );
  const business = useAppSelector(
    (state: RootState) => state.auth.signupFormValue.businessName,
  );
  const isFromDeepLink = useAppSelector((state: RootState) => state.auth.isFromDeepLink)
  const businessType = useAppSelector(
    (state: RootState) => state.auth.signupFormValue.businessType,
  );

  const isFocuse = useIsFocused();

  useEffect(() => {
    !isFromDeepLink && dispatch(resetSignupFormValues());
  }, [isFocuse]);

  useEffect(() => {
    isFromDeepLink && setSelected(businessType)
    return () => {
      dispatch(resetSignupFormValues())
      dispatch(resetIsFromDeepLink())
    }
  }, [])

  const {
    isValidFirstName,
    isValidLastName,
    isValidUserName,
    isValidConfirmPassword,
    password,
    isAgreeValidate,
    isValidBusinessName,
  } = auth.signupFormValue;

  const storedPass = (val: string) => {
    setNewPassword(val);
    dispatch(setSignupFormValues({ key: 'password', value: val }));
  };

  const checkTerms = () => {
    setCheckTerm(!checkTerm);
    dispatch(setSignupFormValues({ key: 'isagree', value: agree }));
  };

  const navigateHandle = () => {
    // setModal(true);
    dispatch(SubmitSignupAction());
  };

  const handleModal = () => {
    dispatch(resetSignupFormValues());
    dispatch(navigateToLoginAction());

    // setModal(false);
    // navigation.navigate('OtpScreen', { showModal: true });
  };

  const changeNewPass = (val: string) => {
    dispatch(setSignupFormValues({ key: 'confirmPassword', value: val }));
  };

  const firstNameValidate = (val: string) => {
    dispatch(setSignupFormValues({ key: 'firstName', value: val }));
  };
  const lastNameValidate = (val: string) => {
    dispatch(setSignupFormValues({ key: 'lastName', value: val }));
  };
  const EmailValidate = (val: string) => {
    dispatch(setSignupFormValues({ key: 'userName', value: val }));
  };

  const BusinessValidate = (val: string) => {
    dispatch(setSignupFormValues({ key: 'businessName', value: val }));
  };

  const BusinessType = (val: string) => {
    dispatch(setSignupFormValues({ key: 'businessType', value: val }));
  };
  // const removeError = () => {
  //   dispatch(cancleErrorTextForSignup());
  // }

  if (isError !== '') {
    setTimeout(() => {
      dispatch(cancleErrorTextForSignup());
    }, 2000);
  }
  const dropdownData = [
    { key: 'INDIVIDUAL', value: 'Individual' },
    { key: 'BUSINESS', value: 'Business' },
  ];

  return (
    <>
      <View style={SignUpScreenStyle.containerRoot}>
        <View style={SignUpScreenStyle.topImageWrapper}>
          <Text style={SignUpScreenStyle.topImageText}>{String.Heading}</Text>
          <Text style={SignUpScreenStyle.continueText}>{String.subHeading}</Text>
        </View>
        <View style={{backgroundColor:colors.green,flex:1,marginBottom:20}}>
        <Image
          source={ImagePath.newSignUpImage}
          style={SignUpScreenStyle.imageBg}
        />
        </View>
      </View>
      <View style={SignUpScreenStyle.wrapper}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={
            Platform.OS === 'ios' ? heights.height * 0.3 : 0
          }
          style={{ flex: 1 }}>
          <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
            <DropDown
              text="Select Company Type"
              data={dropdownData}
              setSelectedItem={setSelected}
              onPress={BusinessType}
            />
            <>
              <InputBox
                // error={isValidFirstName === ''}
                label={String.firstName}
                onChange={firstNameValidate}
                value={fName}
                style={
                  isValidFirstName === ''
                    ? InputBoxStyle.marginBottom
                    : InputBoxStyle.marginBottonWithError
                }
              />
              {isValidFirstName === '' ? null : (
                <ErrorText ErrorMessage={isValidFirstName} />
              )}
              <InputBox
                // error={isValidLastName === ''}
                label={String.lastName}
                onChange={lastNameValidate}
                value={lName}
                style={
                  isValidLastName === ''
                    ? InputBoxStyle.marVertical
                    : InputBoxStyle.marginTop
                }
              />
              {isValidLastName === '' ? null : (
                <ErrorText ErrorMessage={isValidLastName} />
              )}
            </>
            {selected === 'BUSINESS' || businessType === 'BUSINESS' ? (
              <>
                <InputBox
                  label={String.business}
                  onChange={BusinessValidate}
                  value={business}
                  style={
                    isValidBusinessName === ''
                      ? InputBoxStyle.marVertical
                      : InputBoxStyle.marginTop
                  }
                // style={{marginBottom:0}}
                />
                {isValidBusinessName === '' ? null : (
                  <ErrorText ErrorMessage={isValidBusinessName} />
                )}
              </>
            ) : (
              <></>
            )}
            <InputBox
              // error={isValidUserName === ''}
              label={String.email}
              onChange={EmailValidate}
              value={email}
              style={
                isValidUserName === ''
                  ? InputBoxStyle.marVertical
                  : InputBoxStyle.marginTop
              }
              editable={!isFromDeepLink}
              contentStyle={isFromDeepLink && { color: 'grey' }}
            />
            {isValidUserName === '' ? null : (
              <ErrorText ErrorMessage={isValidUserName} />
            )}

            <View>
              <InputBox
                // error={isValidPassword === ''}
                label={String.newPassword}
                onChange={(val: string) => storedPass(val)}
                secureTextEntry={true}
                value={password}
                style={
                  isValidUserName === ''
                    ? InputBoxStyle.marVertical
                    : InputBoxStyle.marginTop
                }
              />
            </View>

            {isValidPassword === '' && newPassword.length > 0 && (
              <View>
                <View style={SignUpScreenStyle.iconAlignment}>
                  {numberSymbol === false && (
                    <Icon2 name={'exclamationcircleo'} color={'#DB5656'} />
                  )}
                  {numberSymbol && <Check name="check" color={colors.green} />}
                  <Text
                    style={[
                      SignUpScreenStyle.iconTextStyle,
                      numberSymbol && SignUpScreenStyle.iconTextColor,
                    ]}>
                    {String.numberSymbol}
                  </Text>
                </View>
                <View style={SignUpScreenStyle.iconMargin}>
                  {lowerUpperCase === false && (
                    <Icon2 name={'exclamationcircleo'} color={'#DB5656'} />
                  )}
                  {lowerUpperCase && (
                    <Check name="check" color={colors.green} />
                  )}
                  <Text
                    style={[
                      SignUpScreenStyle.iconTextStyle,
                      lowerUpperCase && SignUpScreenStyle.iconTextColor,
                    ]}>
                    {String.lowerUpperCase}
                  </Text>
                </View>
                <View style={SignUpScreenStyle.iconAlignment}>
                  {max_char === false && (
                    <Icon2 name={'exclamationcircleo'} color={'#DB5656'} />
                  )}
                  {max_char && <Check name="check" color={colors.green} />}
                  <Text
                    style={[
                      SignUpScreenStyle.iconTextStyle,
                      max_char && SignUpScreenStyle.iconTextColor,
                    ]}>
                    {String.maxCharacters}
                  </Text>
                </View>
              </View>
            )}
            {isValidPassword === '' ? null : (
              <ErrorText ErrorMessage={isValidPassword} />
            )}
            <View>
              <InputBox
                label={String.confirmPassword}
                onChange={changeNewPass}
                secureTextEntry={true}
                // error={isValidConfirmPassword === ''}
                value={conPassword}
                style={
                  isValidConfirmPassword === ''
                    ? InputBoxStyle.marVertical
                    : InputBoxStyle.marginTop
                }
              />
              {isValidConfirmPassword === '' ? null : (
                <ErrorText ErrorMessage={isValidConfirmPassword} />
              )}
            </View>
            <View
              style={
                isAgreeValidate === ''
                  ? SignUpScreenStyle.checkBox
                  : SignUpScreenStyle.checkBoxError
              }>
              <TouchableOpacity onPress={checkTerms}>
                <CheckBox
                  name={
                    agree ? 'checkbox-marked-outline' : 'checkbox-blank-outline'
                  }
                  size={20}
                  color={checkTerm ? colors.green : colors.grey}
                />
              </TouchableOpacity>
              <Text style={SignUpScreenStyle.termsAndCondition}>
                {String.termsCondition1}
              </Text>
              <TouchableOpacity>
                <Text style={SignUpScreenStyle.termsAndConditionTouch}>
                  {String.termsCondition2}
                </Text>
              </TouchableOpacity>
              <Text style={SignUpScreenStyle.termsAndConditionNonTouch}>
                {String.termsCondition3}
              </Text>
              <TouchableOpacity>
                <Text style={SignUpScreenStyle.termsAndConditionTouch}>
                  {String.termsCondition4}
                </Text>
              </TouchableOpacity>
            </View>
            {isAgreeValidate === '' ? null : (
              <ErrorText ErrorMessage={isAgreeValidate} />
            )}
            <View style={SignUpScreenStyle.marginBottom30}>
              <Button
                text={String.SignUp}
                onpress={navigateHandle}
                touchableStyle={SignUpScreenStyle.Loginbutton}
                textStyle={SignUpScreenStyle.LoginbuttonText}
              />
            </View>
            <View style={SignUpScreenStyle.marginVertical30}>
              <SignUpFooter
                normalText={String.FooterNonTouchable}
                touchableText={'Sign In'}
                navigateTo={'Signin'}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
      // visible={true}
      // style={OtpScreenStyle.modalMain}
      >
        <View style={OtpScreenStyle.modalScreenMain}>
          <View style={OtpScreenStyle.modalWhiteBox}>
            <View style={OtpScreenStyle.modalWrapper}>
              {/* <Image source={ImagePath.modalScreenImage}/> */}
              {/* <Image
                source={ImagePath.modalScreenGif}
                style={{width: height * 0.09, height: height * 0.09}}
              /> */}
              {Platform.OS === 'ios' ? (
                <Video
                  source={ImagePath.successIos}
                  style={{ width: height * 0.09, height: height * 0.09 }}
                  resizeMode="contain"
                  volume={10}
                />
              ) : (
                <FastImage
                  style={{ width: height * 0.09, height: height * 0.09 }}
                  source={ImagePath.modalScreenGif}
                  resizeMode={FastImage.resizeMode.contain}
                  onLoadStart={() => {
                    // console.log('On start gif....');
                  }}
                  onLoadEnd={() => {
                    // console.log('on load end.....');
                  }}
                />
              )}
              <Text style={OtpScreenStyle.modalHeadText}>
                {String.SignupModalHead}
              </Text>
              <View>
                <Text style={OtpScreenStyle.modalSubText}>
                  {String.SignupModalSubText}
                </Text>
              </View>
            </View>
            <Button
              text={String.SignupModalButton}
              onpress={handleModal}
              touchableStyle={[SignUpScreenStyle.Loginbutton]}
              textStyle={SignUpScreenStyle.LoginbuttonText}
            />
          </View>
        </View>
      </Modal>
      <View style={{position: 'absolute'}}>
        <Image
          source={ImagePath.signUpLogo}
          style={SignUpScreenStyle.imageSize}
        />
      </View>
      {isError !== '' &&
        isError !== 'source.subscribe is not a function' &&
        isError !== 'undefined is not a function' &&
        !isError.includes('undefined is not a function') &&
        !isError.includes('subscribe is not a function') && (
          <ErrorComponent message={isError} />
        )}
      {loading && <Loader />}
    </>
  );
};

export default SignUpScreen;
