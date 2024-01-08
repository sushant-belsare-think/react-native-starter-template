import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import { LogInScreenStyles as styles } from '../styles/LoginScreenStyles';

import {
  EMAIL,
  FORGOT_PASSWORD_SCREEN,
  PASSWORD,
  SIGNIN_IMAGE,
  SIGN_IN,
  SIGN_INTO_YOUR_AC,
  SIGN_IN_TAX1099,
} from '../constants/strings';
import { String } from '../constants/String';
import Banner from '../Components/Banner/Banner';
import ScreenWrapper from '../Components/ScreenWrapper/ScreenWrapper';
import Button from '../Components/Buttoncomponent/Button';
import ButtonOutlined from '../Components/ButtonOutlined/ButtonOutlined';
import SignUpFooter from '../Components/SignUpFooter/SignUpFooter';
import InputBox from '../Components/InputBox/InputBox';
import { getStore, useAppDispatch } from '../../../lib';

import {
  cancleErrorComponent,
  checkForPasswordValidation,
  checkForUserNameValidation,
  hidePayerPayeeModal,
  resetLoginFormValues,
  setLoginFormValues,
  setRoleTax1099,
  showPayerPayeeModal,
  startLoader,
  stopLoader,
  setRole,
  setTokenInfo,
  pauseProfileApi,
} from '../store/reducers/AuthReducer';
import { useAppSelector } from '../../../lib';
import { RootState } from '../../../lib';
import ErrorText from '../Components/ErrorText/ErrorText';
import Loader from '../../comman/components/Loader/Loader';
import ErrorComponent from '../Components/ErrorComponent/ErrorComponent';
import { useIsFocused } from '@react-navigation/native';
import { heights } from '../constants/dimensionConstant';
import {
  removeOtpSuccessMessage,
  removePasswordResetSuccessMessage,
  setUsernameForOtpScreen,
} from '../store/reducers/PasswordReducer';
import DevModal from '../Components/DevModal/DevModal';
import messaging from '@react-native-firebase/messaging';
import AccountSelectModal from '../Components/AccountSelectModal/AccountSelectModal';
import EnvComponent from '../Components/EnvComponent/EnvComponent';
import PushNotification from 'react-native-push-notification';
import { NavigationServiceImpl } from '../../comman/store/services/NavigationServiceImpl';
import { profileApiDetailsAction } from '../store/async-actions/profileApiCall';
import { setTokenDataToReducer } from '../store/reducers/AuthReducer';
import { getCanclePrompt } from '../store/async-actions/getCanclePrompt';
import { SubmitLoginAction } from '../store/async-actions/SubmitLoginAction';
import axios from 'axios';
import { resendOtpFromLoginFlow } from '../store/async-actions/resendOtpFromLoginFlow';
import { Modal } from 'react-native';
import { ImagePath } from '../constants/ImagePathConstant';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { resetChatHistory } from '../../chat/store/reducers/ChatReducer';
import { clearProfileData, setProfileValue } from '../../user-profile/store/reducers/UserProfileReducer';
import { colors } from '../../../assets/colors';
import { sendTokenToServerAction } from '../../notification/store/async-actions/SendTokenToServerAction';
import { SignUpScreenStyle } from '../styles/SignUpScreenStyle';

const LoginScreen = ({ navigation, route }: any) => {
  const [tapCount, setTapCount] = useState(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [FCMToken, setFCMToken] = useState('');
  const [profileData,setProfileData] = useState([]);
  const [showAcModal, setShowAcModal] = useState(false);
  // const [role, setRole] = useState('');
  const dispatch = useAppDispatch();
  const baseURL = getStore().getState().auth.baseUrl;
  const [url, setUrl] = useState('');
  const selectedEnv = useAppSelector(
    (state: RootState) => state.auth.selectedEnv,
  );
  const loading = useAppSelector((state: RootState) => state.auth.loading);
  const isError = useAppSelector(
    (state: RootState) => state.auth.loginFormValue.isError,
  );
  const isFocuse = useIsFocused();
  const successMessage = useAppSelector(
    (state: RootState) => state.password.otpTab.OtpSuccessMessage,
  );
  const env = useAppSelector((state: RootState) => state.auth.selectedEnv);
  const tempaccessToken = useAppSelector(
    (state: RootState) => state.auth.tempToken,
  );
  const payerPayeeModal = useAppSelector(
    (state: RootState) => state.auth.payerPayeeModal,
  );

  const profileApiCall =useAppSelector(
    (state: RootState) => state.auth.profileApiCall,
  )

  React.useEffect(() => {
    getToken();
    dispatch(stopLoader());
    // NotificationListener();
    requestUserPermission();
  }, []);

  useEffect(() => {
    console.log('+++++++', route);
    if (route.params !== undefined) {
      sendIdToServerToGetToken(route.params);
    }
  }, [route]);

  const sendIdToServerToGetToken = async (params: any) => {
    const code = params?.id;
    const state = params?.stateId;
    try {
      dispatch(startLoader());

      const ress = await fetch(
        `${baseURL}${'/user/tax1099/token?code=' + code + '&state=' + state}`,
        {
          method: 'GET',
          headers: {
            'REDIRECT-URL': url + '/mobile/tax1099',
          },
        },
      );
      const res = await ress.json();
      const response = res;
      console.log(
        '🚀 ~ file: LoginScreen.tsx:118 ~ sendIdToServerToGetToken ~ response:',
        response,
      );
      const profileApiRequestData = {
        accessToken: res?.data?.access_token,
        FCMToken: FCMToken,
      };
      dispatch(profileApiDetailsAction(profileApiRequestData));
      dispatch(setTokenDataToReducer(res?.data));
      dispatch(setRoleTax1099());
      dispatch(stopLoader());
    } catch (err) {
      console.log('🚀 ~ file: LoginScreen.tsx:96 ~ getTax1099Url ~ err:', err);
      dispatch(stopLoader());
    }
  };

  useEffect(() => {
    if (env === 'dev') {
      setUrl('https://dev.thepayee.ai');
    } else if (env === 'qa') {
      setUrl('https://qa.thepayee.ai');
    } else if (env === 'stage') {
      setUrl('https://stage.thepayee.ai');
    } else if (env === 'prod') {
      setUrl('https://thepayee.ai');
    }
  }, [env]);

  useEffect(() => {
    if (profileApiCall) {
      // const { accessToken, FCMToken } = data;

      const options = {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${tempaccessToken}`,
        },
        url: `${baseURL}/user/profile`,
      };

      const res = axios(options)
        .then(res => {
          console.log('🚀 ~ file: profileApiCall.ts:53 ~ > ~ res:', res);
          if (res.status === 201 || res.status === 200) {
            dispatch(stopLoader());
            if (res.data.data.emailVerified === true) {
              console.log(
                '🚀 ~ file: profileApiCall.ts:25 ~ > ~ FCMToken:',
                FCMToken,
              );
              // thunkApi.dispatch(sendTokenToServerAction(FCMToken));
              // thunkApi.dispatch(resetLoginFormValues());
              // thunkApi.dispatch(setProfileValue(res.data));
              // thunkApi.dispatch(setTokenInfo());
              // NavigationServiceImpl.getInstance().navToHomeScreen(
              //   thunkApi.dispatch,
              // );
              dispatch(pauseProfileApi())
              setProfileData(res.data);
              dispatch(showPayerPayeeModal())
            } else if (res.data.data.emailVerified === false) {
              dispatch(setUsernameForOtpScreen(getStore().getState().auth.loginFormValue.userName));
              //getStore().getState().auth.baseUrl;
              dispatch(resendOtpFromLoginFlow());
            }
            // return res;
          }
        })
        .catch(err => {
          console.log('🚀 ~ file: profileApiCall.ts:59 ~ > ~ err:', err);
          dispatch(pauseProfileApi())
          dispatch(stopLoader());
        });
    }
  }, [profileApiCall])

  const getTax1099Url = async () => {
    try {
      dispatch(startLoader());
      const ress = await fetch(`${baseURL}${'/user/tax1099/login'}`, {
        method: 'GET',
        headers: {
          'REDIRECT-URL': url + '/mobile/tax1099',
        },
      });
      const res = await ress.json();
      const loginUrl = res?.data?.loginUrl;
      NavigationServiceImpl.getInstance().navToTax1099(dispatch, loginUrl);
      dispatch(stopLoader());
    } catch (err) {
      console.log('🚀 ~ file: LoginScreen.tsx:96 ~ getTax1099Url ~ err:', err);
      dispatch(stopLoader());
    }
  };

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      const token = await messaging().getToken();
      console.log('FCM Token:', token);
      setFCMToken(token);
    }
  }

  const getToken = async () => {
    try {
      await requestUserPermission();

      const token = await messaging().getToken();

      PushNotification.getChannels(function (channel_ids) {
        console.log(channel_ids);
      });
      console.log('FCM Token:', token);
    } catch (error) {
      console.log('Error retrieving FCM token:', error);
    }
  };

  const NotificationListener = () => {
    messaging().onMessage(async remoteMessage => {
      console.log(
        'Foreground notification handle.................' +
        JSON.stringify(remoteMessage.data),
      );
      let data = JSON.stringify(remoteMessage?.data?.employee);
      data = JSON.parse(data);
      console.log('🚀 ~ file: LoginScreen.tsx:200 ~ messaging ~ data:', data);
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Background notification handle.................',
        remoteMessage.notification,
      );
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Quit state notification handle.................',
            remoteMessage.notification,
          );
        }
      });
  };

  React.useEffect(() => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });
  }, []);

  useEffect(() => {
    dispatch(resetLoginFormValues());
  }, [isFocuse, dispatch]);

  const loginFormValueSelector = useAppSelector(
    (state: RootState) => state.auth.loginFormValue,
  );

  useEffect(() => {
    if (isError !== '') {
      setTimeout(() => {
        dispatch(cancleErrorComponent());
      }, 2000);
    }
  }, [dispatch, isError]);

  useEffect(() => {
    if (successMessage !== '') {
      setTimeout(() => {
        dispatch(removeOtpSuccessMessage());
        dispatch(removePasswordResetSuccessMessage());
      }, 2000);
    }
  }, [dispatch, successMessage]);

  useEffect(() => {
    if (tapCount === 5) {
      // console.log('tapcount', tapCount);
      setShowModal(true);
      setTapCount(0);
    }
  }, [tapCount]);

  const Error =
    isError !== '' &&
    isError !== "Cannot read property 'subscribe' of undefined" &&
    isError !== "Cannot read properties of undefined (reading 'subscribe')" &&
    isError !== 'Request failed with status code 401' &&
    isError !== "Cannot read properties of undefined (reading 'data')";

  // console.log(Error);

  const handleTap = () => {
    setTapCount(prevCount => prevCount + 1);
  };

  return (
    <View style={styles.mainContainer}>
      {selectedEnv !== 'prod' && <EnvComponent selectedEnv={selectedEnv} />}
      <View style={{backgroundColor:colors.green,flex:1,marginBottom:20}}>
      {/* <Banner
        image={SIGNIN_IMAGE}
        text={SIGN_INTO_YOUR_AC}
        back={false}
        onPress={handleTap}
      /> */}
        <View style={styles.signTextContainer}>
            <Text style={styles.topImageText} onPress={handleTap}>Sign In</Text>
            <Text style={styles.continueText}>Please Sign In to continue</Text>
        </View>
       <Image
          source={ImagePath.newSignUpImage}
          style={styles.imageBg}
        />
      </View>

      <ScreenWrapper>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={
            Platform.OS === 'ios' ? heights.height * 0.35 : 0
          }
          style={[styles.mainContainer]}>
          <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
            <View style={{ height: heights.height * 0.56 }}>
              <InputBox
                error={!loginFormValueSelector.isValidUserName}
                label={EMAIL}
                value={loginFormValueSelector.userName}
                onChange={(text: string) => {
                  dispatch(setLoginFormValues({ key: 'userName', value: text }));
                }}
              />
              {loginFormValueSelector.isValidUserName && (
                <ErrorText ErrorMessage={'Please enter your email.'} />
              )}
              <View>
                <InputBox
                  error={!loginFormValueSelector.isValidPassword}
                  label={PASSWORD}
                  value={loginFormValueSelector.password}
                  secureTextEntry={true}
                  onChange={(text: string) => {
                    dispatch(
                      setLoginFormValues({ key: 'password', value: text }),
                    );
                  }}
                />
                {loginFormValueSelector.isValidPassword && (
                  <ErrorText ErrorMessage={'Please enter your password'} />
                )}
              </View>

              <View style={styles.forgotPassContainer}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(FORGOT_PASSWORD_SCREEN);
                    // navigation.navigate('CreatePassword');
                  }}>
                  <Text style={styles.forgotPass}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.signInBtnContainer}>
                <Button
                  disabled={true}
                  text={SIGN_IN}
                  onPress={() => {
                    // dispatch(SubmitLoginAction({role: '', FCMToken: FCMToken}));
                    if (
                      loginFormValueSelector.userName === '' ||
                      loginFormValueSelector.password === ''
                    ) {
                      dispatch(checkForUserNameValidation());
                      dispatch(
                        checkForPasswordValidation(
                          loginFormValueSelector.password,
                        ),
                      );
                    } else {
                      // setShowAcModal(true);
                      dispatch(
                        SubmitLoginAction({ role: '', FCMToken: FCMToken }),
                      );
                    }
                  }}
                />
              </View>
              <View style={styles.lineContainer}>
                <View style={styles.line} />
                <Text style={styles.orText}>OR</Text>
                <View style={styles.line} />
              </View>
              <ButtonOutlined
                onPress={() => {
                  getTax1099Url();
                }}
                color="#0F9347"
                text={SIGN_IN_TAX1099}
              />
              <View style={styles.signUpFooterContainer}>
                <SignUpFooter
                  normalText={String.dontHaveAnAccount}
                  touchableText={String.FooterTouchable}
                  navigateTo={'SignUpScreen'}
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ScreenWrapper>
      {Error === true && <ErrorComponent message={isError} />}
      {successMessage !== '' && (
        <ErrorComponent message={successMessage} success={true} />
      )}

      {loading && <Loader />}
      {showModal && <DevModal setShow={setShowModal} visible={showModal} />}
      <Modal
        animationType="slide"
        transparent={true}
        visible={payerPayeeModal}
        // visible={show}
        style={styles.modalMain}>
        <TouchableWithoutFeedback onPress={() => {
          // setShow(false)
          dispatch(hidePayerPayeeModal())
          dispatch(resetChatHistory());
          dispatch(clearProfileData());
        }}>
          <View style={styles.modalScreenMain}>
            <TouchableWithoutFeedback>
              <View style={styles.modalWhiteBox}>
                <TouchableOpacity
                  onPress={() => {
                    dispatch(hidePayerPayeeModal());
                    dispatch(resetChatHistory());
                    dispatch(clearProfileData());
                  }
                  }
                  style={styles.cancleIcon}>
                  <Icon
                    name={String.closeIcon}
                    color={colors.light_grey}
                    size={24}
                  />
                </TouchableOpacity>
                <View style={styles.modalTextContainer}>
                  <Image source={ImagePath.accounttype} />
                  <Text style={styles.modalHeading}>Welcome to Payee!</Text>
                  <Text style={styles.modalDesc}>
                    To access your account, please choose one of{' '}
                  </Text>
                  <Text style={styles.modalDesc}>the following login options.</Text>
                </View>
                <View style={styles.buttonsRow}>
                  <TouchableOpacity
                    style={styles.buttons}
                    onPress={() => {
                      dispatch(setRole('Payer'));
                      // dispatch(setTokenInfo());
                      NavigationServiceImpl.getInstance().navToHomeScreen(
                        dispatch
                      );
                      dispatch(sendTokenToServerAction(FCMToken));
                      dispatch(resetLoginFormValues());
                      dispatch(setProfileValue(profileData));
                      dispatch(setTokenInfo());
                      dispatch(hidePayerPayeeModal())
                    }}>
                    <Text style={styles.buttonText}>PAYER</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.buttons}
                    onPress={() => {
                      dispatch(setRole('Recipient'));
                      // dispatch(setTokenInfo());
                      NavigationServiceImpl.getInstance().navToHomeScreen(
                        dispatch
                      );
                      dispatch(hidePayerPayeeModal())
                      dispatch(sendTokenToServerAction(FCMToken));
                      dispatch(resetLoginFormValues());
                      dispatch(setProfileValue(profileData));
                      dispatch(setTokenInfo());
                    }}>
                    <Text style={styles.buttonText}>PAYEE</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <View style={{position: 'absolute'}}>
        <Image
          source={ImagePath.signUpLogo}
          style={styles.imageSize}
        />
      </View>
    </View>
  );
};

export default LoginScreen;
