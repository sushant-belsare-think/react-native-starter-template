import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '../../../assets/colors';
import {heights} from '../constants/dimensionConstant';

const {height, width} = Dimensions.get('screen');

export const OnBoardingFirstScreenStyle = StyleSheet.create({
  container: {
    height: height,
    width: width,
    // flex : 1,
    backgroundColor: colors.green,
    position: 'relative',
    alignItems: 'center'
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
    height: height * 0.005,
    
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
  imageView: {
    paddingHorizontal: heights.Onboarding_first_Horizontal_padding,
    paddingVertical: heights.Onboarding_first_Vertical_padding,
    flex: 1,
  },
});
