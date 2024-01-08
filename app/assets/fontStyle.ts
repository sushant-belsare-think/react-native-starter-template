import {TextStyle} from 'react-native';
import {fontSize} from './fontSizes';
import {fontType} from './fontType';
import {colors} from './colors';

interface IFontStyle {
  smallLatoFont: TextStyle;
  mediumLatoFont: TextStyle;
  largeLatoFont: TextStyle;
  headingLatoFont: TextStyle;
}

export const fontStyle: IFontStyle = {
  smallLatoFont: {
    fontSize: fontSize.separatorText,
    fontFamily: fontType.outfit100,
    color: colors.white,
  },
  mediumLatoFont: {
    fontSize: fontSize.normalLabel,
    fontFamily: fontType.outfit100,
    color: colors.white,
  },
  largeLatoFont: {
    fontSize: fontSize.textInputValue,
    fontFamily: fontType.outfit100,
    color: colors.white,
  },
  headingLatoFont: {
    fontSize: fontSize.headingLabel,
    fontFamily: fontType.outfit100,
    color: colors.white,
  },
};
