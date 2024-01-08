import {StyleSheet, Dimensions} from 'react-native';
import {dimension} from '../../../comman/constant/dimensionConstant';
import {fontType} from '../../../../assets/fontType';
import {colors} from '../../../../assets/colors';

const {height} = Dimensions.get('screen');

export const TextComponentStyle = StyleSheet.create({
  root: {
    height: height * 0.16,
    marginTop: dimension.onboarding_first_marginTop1,
  },
  headText: {
    fontFamily: fontType.outfit500,
    fontSize: 20,
    color: colors.white,
    letterSpacing: 1,
  },
  subHeadText: {
    fontFamily: fontType.outfit500,
    fontSize: 19,
    color: colors.white,
    letterSpacing: 1,
  },
  normalText: {
    fontFamily: fontType.outfit300,
    fontSize: 12,
    color: colors.white,
    marginTop: dimension.onboarding_first_marginTop2,
    letterSpacing: 1,
  },
});
