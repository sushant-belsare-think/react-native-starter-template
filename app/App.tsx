import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from './domain/authentication/screens/SplashScreen';
import * as React from 'react';
import {StatusBar} from 'react-native';
import { NavigationContainer, NavigationContainerRef, useNavigation } from '@react-navigation/native';
import OnBoardingFirstScreen from './domain/authentication/screens/OnBoardingFirstScreen';
import OnBoardingSecondScreen from './domain/authentication/screens/OnBoardingSecondScreen';
import OnBoardingThirdScreen from './domain/authentication/screens/OnBoardingThirdScreen';
import {String} from './domain/authentication/constants/String';
import OnBoardingCarousel from './domain/authentication/screens/OnboardingCarousel';
import {NavigationServiceImpl} from './domain/comman/store/services/NavigationServiceImpl';
import { linking } from './utils/linking';


const Stack = createNativeStackNavigator();
const App = (): JSX.Element => {

  return (
    <>
      <NavigationContainer
       linking={linking}
        ref={nav => {
          NavigationServiceImpl.getInstance().setNavigationContainerComponent(
            nav,
          );
        }}>
        <StatusBar translucent={true} backgroundColor={'transparent'} />
        <Stack.Navigator initialRouteName="SplashScreen">
          <Stack.Screen
            name="SplashScreen"
            options={{headerShown: false}}
            component={SplashScreen}
          />
          <Stack.Screen
            name={String.OnBoardingCarousel}
            component={OnBoardingCarousel}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={String.OnBoardingFirstScreen}
            component={OnBoardingFirstScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={String.OnBoardingSecondScreen}
            component={OnBoardingSecondScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={String.OnBoardingThirdScreen}
            component={OnBoardingThirdScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
