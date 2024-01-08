import {StyleSheet} from 'react-native';
import {fontType} from '../../../../assets/fontType';

export const ButtonStyles = StyleSheet.create({
  buttonText: {
    fontFamily: fontType.outfit700,
    fontSize: 14,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 13,
    borderRadius: 8,
    borderWidth: 1,
  },
});
