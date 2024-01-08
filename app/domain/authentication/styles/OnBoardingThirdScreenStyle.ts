import {StyleSheet} from 'react-native';
import {heights} from '../constants/dimensionConstant';
import {colors} from '../../../assets/colors';

export const OnBoardingThirdScreenStyle = StyleSheet.create({
  container: {
    // flex: 1,
    height: heights.height,
    width: heights.width,
    alignItems: 'center',
    backgroundColor: colors.green,
  },
  imageStyle: {
    resizeMode: 'contain',
    height: heights.onboarding_first_image,
    width: '100%',
    borderRadius: 15,
  },
  main: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
    alignItems: 'center',
  },
  selectedDot: {
    backgroundColor: colors.white,
    height: 8,
    width: 8,
    borderRadius: 4,
    marginHorizontal: 6,
  },
  unselectedDots: {
    backgroundColor: colors.grey,
    height: 6,
    width: 6,
    borderRadius: 3,
    marginHorizontal: 6,
  },
  subRoot: {
    paddingHorizontal: 20,
    paddingVertical: heights.Onboarding_first_Vertical_padding,
    flex: 1,
  },
});
