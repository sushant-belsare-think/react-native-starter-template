import {StyleSheet, Dimensions} from 'react-native';
import {fontType} from '../../../../assets/fontType';
import {colors} from '../../../../assets/colors';
import {dimension} from '../../../comman/constant/dimensionConstant';

const {height} = Dimensions.get('screen');

export const OnBoardingButtonStyle = StyleSheet.create({
  rootView: {
    height: dimension.onboarding_button_height,
    marginTop: dimension.onboarding_button_margin,
    // bottom: height * 0.01,
  },
  buttonStyle: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.white,
  },
  buttonText: {
    color: colors.white,
    fontFamily: fontType.outfit700,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  newButton: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: colors.green,
    borderColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  newButtonText: {
    color: colors.green,
    fontSize: 14,
    fontFamily: fontType.outfit700,
    letterSpacing: 1,
  },
});
