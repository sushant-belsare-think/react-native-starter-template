import {Dimensions, StyleSheet} from 'react-native';
import {fontType} from '../../../assets/fontType';

const {height} = Dimensions.get('screen');

export const ForgotPasswordScreenStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  marginTop5: {marginBottom: 5},
  imageBg: {
    flex: 1,
    width: '100%',
    position: 'absolute',
    top: 0,
    backgroundColor: '#0F9347',
    height: height * 0.34,
  },
  wrapper: {
    backgroundColor: 'white',
    borderRadius: 22,
    position: 'absolute',
    width: '100%',
    height: '66%',
    bottom: 0,
    padding: 16,
    paddingTop: 40,
    top: height * 0.321,
  },
  textInputEmail: {
    marginBottom: 18,
  },
  marginBottom20: {marginBottom: 20},
  marginBottom10: {marginBottom: 10},
  instructionTextContainer: {
    marginBottom: 25,
  },
  instructionText: {
    color: '#898989',
    fontFamily: fontType.outfit400,
    fontSize: 14,
  },
});
