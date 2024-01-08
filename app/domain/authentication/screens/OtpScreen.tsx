import React, {useEffect, useRef} from 'react';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {
  Alert,
  ImageBackground,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useState} from 'react';
import {OtpScreenStyle} from '../styles/OtpScreenStyle';
import {SignUpScreenStyle} from '../styles/SignUpScreenStyle';
import {ImagePath} from '../constants/ImagePathConstant';
import {String} from '../constants/String';
import Button from '../../comman/components/Button/Button';
import SignUpFooter from '../Components/SignUpFooter/SignUpFooter';
import {useDispatch} from 'react-redux';
import {
  otpScreenValues,
  removeOtpErrorforForgotPassword,
  resetOtpValue,
} from '../store/reducers/PasswordReducer';
import {RootState, useAppSelector} from '../../../lib';
import {SubmitSignupResendOtpAction} from '../store/async-actions/SubmitSignupResendOtpAction';
import Loader from '../../comman/components/Loader/Loader';
import {SubmitForgotPassOtpAction} from '../store/async-actions/SubmitForgotPassOtpAction';
import {SubmitSignupVerificationOtpAction} from '../store/async-actions/SubmitSignupVerificationOtpAction';
import {useIsFocused} from '@react-navigation/native';
import {SubmitForgotpasswordResendOtpAction} from '../store/async-actions/SubmitForgotpasswordResendOtpAction';
import ErrorComponent from '../Components/ErrorComponent/ErrorComponent';

const OtpScreen = ({navigation, route}: any) => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const otpref = useRef<any>(null);
  const {showModal} = route.params;
  // console.log("showmodal............" + showModal);

  const otp = useAppSelector((state: RootState) => state.password.otpTab.otp);
  const otpid = useAppSelector(
    (state: RootState) => state.password.otpTab.otpId,
  );
  const resend = useAppSelector(
    (state: RootState) => state.password.otpTab.resend,
  );

  const loading = useAppSelector(
    (state: RootState) => state.password.otpTab.loading,
  );
  const loadingPass = useAppSelector(
    (state: RootState) => state.password.forgotPass.loading,
  );

  // console.log("otpid...."+resend)

  const [otp2, setOtp] = useState('');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState(59);
  const [resendHandler, setResetHandler] = useState(false);

  const [otpError, setOtpError] = useState(false);

  useEffect(() => {
    setResetHandler(false);
    setMinutes('00');
    setSeconds(59);
  }, [otpid, resend]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        if (seconds > 10) {
          setSeconds(seconds - 1);
        } else {
          const sec = '0' + (seconds - 1);
          setSeconds(sec);
        }
      }

      if (seconds == '00') {
        if (minutes === '00') {
          console.log('upper');

          setResetHandler(true);
          clearInterval(interval);
        } else {
          console.log('under');

          setResetHandler(false);
          setSeconds(59);
          // setMinutes(00);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  const isFocuse = useIsFocused();
  useEffect(() => {
    dispatch(resetOtpValue());
  }, [isFocuse]);

  useEffect(() => {
    if (Platform.OS === 'android') {
      if (otpref.current !== null) {
        otpref.current.blurAllFields();
        setTimeout(() => {
          otpref.current.focusField(0);
        }, 300);
      }
    }
    if (Platform.OS === 'ios') {
      setTimeout(() => {
        otpref.current.bringUpKeyBoardIfNeeded();
        otpref.current.focusField(0);
      }, 500);
    }
  }, [otpref]);

  const handleText = () => {
    if (otp.length < 6) {
      setOtpError(true);
      setTimeout(() => {
        setOtpError(false);
      }, 2000);
    } else {
      if (showModal === 'signup' || showModal === 'login') {
        dispatch(SubmitSignupVerificationOtpAction(showModal));
      } else if (showModal === 'forgotPassword') {
        dispatch(SubmitForgotPassOtpAction());
        //   // dispatch(SubmitSignupOtpAction())
        //   // navigation.navigate(String.createPassword);
      } else if (showModal === 'login') {
        // dispatch()
      }
    }
  };
  const OtpHandle = (val: number) => {
    dispatch(otpScreenValues(val));
  };

  const handleModal = () => {
    setModal(false);
    navigation.navigate('Signin');
  };

  const resendHandle = () => {
    if (showModal === 'signup') {
      dispatch(SubmitSignupResendOtpAction());
    } else if (showModal === 'forgotPassword' || showModal === 'login') {
      dispatch(SubmitForgotpasswordResendOtpAction());
    }
  };

  const isError = useAppSelector(
    (state: RootState) => state.password.otpTab.isError,
  );

  if (isError !== '') {
    setTimeout(() => {
      dispatch(removeOtpErrorforForgotPassword());
    }, 2000);
  }

  // console.log("resewnd ......."+resendHandler);

  return (
    <>
      <View style={OtpScreenStyle.cotainer}>
        <View style={OtpScreenStyle.topImageTextView}>
          <Text style={OtpScreenStyle.topImageText}>{String.OTPHeadText}</Text>
        </View>
        <ImageBackground
          source={ImagePath.otpScreenImage}
          style={OtpScreenStyle.imageBg}>
          <View style={OtpScreenStyle.topImageBackButton}>
            <Icon
              name="chevron-left"
              size={25}
              color="white"
              onPress={() => navigation.goBack()}
            />
          </View>
        </ImageBackground>
      </View>
      <View
        style={[SignUpScreenStyle.wrapper, OtpScreenStyle.WrapperExtraStyle]}>
        <ScrollView bounces={false}>
          <Text style={OtpScreenStyle.otpSubText}>{String.OTPSubText}</Text>
          <View style={OtpScreenStyle.OtpInputView}>
            <OTPInputView
              style={OtpScreenStyle.otpInputBox}
              pinCount={6}
              ref={otpref}
              code={otp}
              onCodeChanged={OtpHandle}
              autoFocusOnLoad={false}
              keyboardAppearance="light"
              codeInputFieldStyle={OtpScreenStyle.underlineStyleBase}
              codeInputHighlightStyle={OtpScreenStyle.underlineStyleHighLighted}
            />
            {resendHandler ? (
              <View style={OtpScreenStyle.marginVertical}>
                <SignUpFooter
                  touchableHandle={resendHandle}
                  normalText={String.didntReceieveCode}
                  touchableText={String.resend}
                  // navigateTo={'SignUpScreen'}
                />
              </View>
            ) : (
              <Text style={OtpScreenStyle.Otptext}>
                {String.OTPTimer}{' '}
                <Text style={OtpScreenStyle.timerTextColor}>
                  {minutes + ':' + seconds}
                </Text>
              </Text>
            )}
          </View>

          <View style={OtpScreenStyle.buttonView}>
            <Button
              onpress={handleText}
              text={String.OTPButton}
              touchableStyle={SignUpScreenStyle.Loginbutton}
              textStyle={SignUpScreenStyle.LoginbuttonText}
            />
          </View>
          <View style={OtpScreenStyle.bottomTextView} />
          {/* <View style={OtpScreenStyle.martop}>
            <SignUpFooter
              touchableHandle={resendHandle}
              normalText={String.didntReceieveCode}
              touchableText={String.resend}
            // navigateTo={'SignUpScreen'}
            />
          </View> */}
        </ScrollView>
      </View>
      {isError !== '' && isError !== undefined && (
        <ErrorComponent
          message={isError}
          // disableHandle={removeError}
        />
      )}
      {loading && <Loader />}
      {loadingPass && <Loader />}
      {otpError && <ErrorComponent message={'Please fill all the fields'} />}
    </>
  );
};

export default OtpScreen;
