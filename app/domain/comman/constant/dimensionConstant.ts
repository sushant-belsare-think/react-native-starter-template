import {Dimensions} from 'react-native';

const {height} = Dimensions.get('window');

export const dimension = {
  onboarding_first_marginTop1: height * 0.03,
  onboarding_first_marginTop2: height * 0.02,
  onboarding_button_margin: height * 0.05,
  onboarding_button_height: height * 0.063,
};
