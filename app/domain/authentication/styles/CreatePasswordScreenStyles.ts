import {Dimensions, StyleSheet} from 'react-native';
import {fontType} from '../../../assets/fontType';

const {height, width} = Dimensions.get('screen');

export const CreatePasswordScreenStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  instructionWarning: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginLeft: 5,
  },
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
    marginBottom: 24,
  },
  instructionTextContainer: {
    marginBottom: 32,
  },
  instructionText: {
    color: '#DB5656',
    fontFamily: fontType.outfit400,
    fontSize: 10,
    marginLeft: 5,
  },
  touchableEye: {
    position: 'absolute',
    right: 18,
    top: 20,
  },
});
