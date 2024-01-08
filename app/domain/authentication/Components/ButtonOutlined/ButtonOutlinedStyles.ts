import {StyleSheet} from 'react-native';
import {fontType} from '../../../../assets/fontType';

export const ButtonOutlinedstyles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 13,
    borderRadius: 8,
    borderColor: '#0F9347',
    borderWidth: 0.5,
  },
  buttonText: {
    color: '#0F9347',
    fontFamily: fontType.outfit600,
    fontSize: 14,
    letterSpacing : 1
  },
});
