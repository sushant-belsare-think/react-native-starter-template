import {StyleSheet,Dimensions, Platform} from 'react-native';
import { colors } from '../../../../assets/colors';

const {height,width} = Dimensions.get('window');

export const SnackBarPopUpStyle = StyleSheet.create({
  ConnectivitySnackBar: {
    backgroundColor: colors.red,
    width: '100%',
    height: 48,
    flexDirection: 'row',
    justifyContent: 'center',
    // alignItems: 'center',
    paddingTop : 9,
    paddingBottom: 6,
    marginBottom: 60,
    top: Platform.OS === 'android' ? height - 12 : height - 40,
    left: 0,
    position: 'absolute',
    zIndex: 10000000,
  },
  Text: {
    color: colors.white,
  },
});