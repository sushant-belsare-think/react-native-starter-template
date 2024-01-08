import React, {useEffect, useState} from 'react';
import {View, Image, Text, Animated, StatusBar} from 'react-native';
import {splashScreenStyle} from '../styles/splashScreenStyles';
import {ImagePath} from '../constants/ImagePathConstant';
import {String} from '../constants/String';
import {RootState, useAppDispatch, useAppSelector} from '../../../lib';
import {NavigationServiceImpl} from '../../comman/store/services/NavigationServiceImpl';

import {defaultEnvChanger} from '../../../config/ApiConfigs';
import messaging from '@react-native-firebase/messaging';
import {clearProfileData} from '../../user-profile/store/reducers/UserProfileReducer';
import {resetAuthReducer} from '../store/reducers/AuthReducer';
import {resetChatHistory} from '../../chat/store/reducers/ChatReducer';
import DeviceInfo from 'react-native-device-info';

const SplashScreen = ({navigation}: Props) => {
  const organicUser = useAppSelector(
    (state: RootState) => state.auth.organicUser,
  );
  const accessToken = useAppSelector(
    (state: RootState) => state.auth.token.access_token,
  );

  const [version, setVersion] = useState('');

  async function registerForRemoteMessages() {
    try {
      await messaging().registerDeviceForRemoteMessages();
      console.log('Device registered for remote messages');
    } catch (error) {
      console.log('Error registering device for remote messages:', error);
    }
  }
  const dispatch = useAppDispatch();
  const anime = new Animated.Value(0);
  useEffect(() => {
    Animated.timing(anime, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: false,
    }).start();
    registerForRemoteMessages();
    setTimeout(() => {
      if (organicUser) {
        navigation.replace(String.OnBoardingCarousel);
      } else {
        // For development
        makeNavigationAccordingToAccessTokenStatus();
        // As expected by client flow
        // directGotoSigninScreenWithClearAllData();
      }
    }, 1400);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const makeNavigationAccordingToAccessTokenStatus = () => {
    if (accessToken === '') {
      navigation.replace('Signin');
    } else {
      NavigationServiceImpl.getInstance().navToHomeScreen(dispatch);
    }
  };

  const urlFromRedux = useAppSelector((state: RootState) => state.auth);
  useEffect(() => {
    defaultEnvChanger(urlFromRedux.baseUrl);
    let version2 = DeviceInfo.getVersion();
    setVersion(version2);
  }, []);

  const directGotoSigninScreenWithClearAllData = () => {
    dispatch(clearProfileData());
    dispatch(resetAuthReducer());
    dispatch(resetChatHistory());
    navigation.replace('Signin');
  };

  const animeStyle = {
    opacity: anime.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
  };

  return (
    <View style={splashScreenStyle.container}>
      <StatusBar translucent={true} barStyle={'dark-content'} />
      <View>
        {/* <Animated.View style={animeStyle}> */}
        <View style={splashScreenStyle.viewStyle}>
          <Image
            source={ImagePath.payeeLogo}
            style={splashScreenStyle.imgaeStyle}
          />
        </View>
        <View style={splashScreenStyle.versionTextContainer}>
          <Text
            style={
              splashScreenStyle.versionTextStyles
            }>{`Version No ${version}`}</Text>
        </View>
        {/* </Animated.View> */}
      </View>
    </View>
  );
};

type Props = {
  navigation: any;
};

export default SplashScreen;
