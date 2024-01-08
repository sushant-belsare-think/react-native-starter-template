import {Dimensions, Platform, StyleSheet} from 'react-native';
import {fontType} from '../../../assets/fontType';
import { colors } from '../../../assets/colors';

const {height, width} = Dimensions.get('screen');

export const LogInScreenStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  imageBg: {
    flex: 1,
    width: width * 0.51,
    position: 'absolute',
    top: height * 0.04,
    right : 25,
    height: height * 0.22,
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
  signTextContainer : {
    position:'absolute',
    top:height * 0.21,
    left : 10
  },
  topImageText: {
    zIndex: 2,
    color: colors.white,
    fontSize: 32,
    // fontSize: 28,
    fontFamily: fontType.outfit500,
  },
  continueText : {
    color : '#ECE7E4',
    fontFamily : fontType.outfit400,
    fontSize : 16
  },
  textInputEmail: {
    marginBottom: 24,
  },
  textInputPass: {
    marginBottom: 4,
  },

  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 24,
  },
  line: {
    flex: 1,
    height: 1.5,
    backgroundColor: '#c2c2c2',
  },
  orText: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    fontWeight: 'bold',
    color: '#c2c2c2',
    fontFamily: 'Outfit-Regular',
  },
  touchableEye: {
    position: 'absolute',
    right: 18,
    top: 20,
  },
  forgotPassContainer: {
    alignItems: 'flex-end',
  },
  forgotPass: {
    color: '#898989',
    fontFamily: fontType.outfit400,
    fontSize: 14,
  },
  signInBtnContainer: {
    marginTop: 24,
  },
  dontHaveacContainer: {
    position: 'absolute',
    bottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  dontHaveAc: {
    color: 'black',
    fontFamily: 'Outfit-Regular',
  },
  signUpText: {
    color: '#0F9347',
    fontFamily: 'Outfit-Regular',
  },
  signUpFooterContainer : {
    alignSelf : 'center',
    position:'absolute',
    bottom:'0%',
  },
  modalMain: {
    backgroundColor: 'transparent',
    flex: 1,
  },
  modalTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalHeading: {
    color: colors.black,
    fontFamily: fontType.outfit500,
    fontSize: 22,
    marginVertical: 10,
  },
  modalDesc: {
    color: colors.black,
    fontFamily: fontType.outfit400,
  },
  modalScreenMain: {
    paddingBottom: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  modalWhiteBox: {
    alignSelf: 'center',
    width: '90%',
    backgroundColor: colors.white,
    alignItems: 'center',
    borderRadius: 16,
    padding: 15,
    paddingHorizontal: 20,
  },
  cancleIcon: { position: 'absolute', right: 10, top: 10 },
  buttons: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: colors.green,
    marginHorizontal: 5,
    width: '45%',
    alignItems: 'center',
  },
  buttonsRow: {
    marginTop: 20,
    flexDirection: 'row',
    marginVertical: 10,
    width: '100%',
    justifyContent: 'space-between',
  },
  buttonText: {
    color: 'white',
    fontFamily: fontType.outfit600,
    fontSize: 15,
  },
  imageSize: {
    height: Platform.OS === 'android' ? height * 0.055 : height * 0.055, 
    width: Platform.OS === 'android' ? width * 0.280 : width * 0.280,
    top : height * 0.080,
    left : 12
    },
});
