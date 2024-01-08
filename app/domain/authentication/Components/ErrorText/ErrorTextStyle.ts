import {StyleSheet} from 'react-native';
import {heights} from '../../constants/dimensionConstant';
import {fontType} from '../../../../assets/fontType';
import {colors} from '../../../../assets/colors';

export const ErrorTextStyle = StyleSheet.create({
  errorText: {
    fontFamily: fontType.outfit400,
    fontSize: 12,
    marginLeft: heights.Error_Text_Margin,
    color: colors.red,
  },
  errortextView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
