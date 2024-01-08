import {Dimensions, Platform, StyleSheet} from 'react-native';
import {fontType} from '../../../assets/fontType';
import {colors} from '../../../assets/colors';
import {heights} from '../constants/dimensionConstant';

const {height, width} = Dimensions.get('screen');

export const SignUpScreenStyle = StyleSheet.create({
  containerRoot: {
    flex: 1,
  },
  marginBottom30: {
    marginBottom: 0,
  },
  marginVertical30: {
    marginTop: 15,
    marginBottom: Platform.OS === 'android' ? 15 : 20,
  },
  checkBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkBoxError: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  imageBg: {
    flex: 1,
    width: width * 0.51,
    position: 'absolute',
    top: height * 0.023,
    right : 25,
    height: height * 0.22,
  },
  wrapper: {
    backgroundColor: 'white',
    borderRadius: 22,
    width: '100%',
    bottom: 0,
    padding: 16,
    paddingBottom: 0,
    // paddingTop: 25,
    position: 'absolute',
    top: height * 0.28,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'flex-start',
  },
  containerNew: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'flex-start',
    padding: 16,
  },
  headerView: {
    marginVertical: 12,
    marginTop: 40,
    width: '100%',
    flexDirection: 'row',
  },
  headerText: {
    fontSize: 24,
    color: colors.black,
    fontFamily: fontType.outfit700,
    justifyContent: 'flex-start',
  },
  textInputEmail: {
    backgroundColor: colors.white,
    width: '100%',
    marginVertical: 12,
  },
  textInputPass: {
    backgroundColor: colors.white,
    width: '100%',
    marginTop: 12,
  },
  Loginbutton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 8,
    backgroundColor: colors.green,
    width: '100%',
    marginVertical: 8,
  },
  LoginbuttonText: {
    color: colors.white,
    letterSpacing: 1,
    fontSize: 14,
    fontFamily: fontType.outfit700,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 8,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.green,
    width: '100%',
    marginVertical: 12,
  },
  buttonText: {
    color: colors.green,
    // fontWeight: '700',
    fontFamily: fontType.outfit700,
  },
  forgotView: {
    marginTop: 4,
    flexDirection: 'row-reverse',
    marginBottom: 12,
  },
  forgotText: {
    color: colors.grey,
    fontFamily: fontType.outfit700,
  },
  signUpView: {
    justifyContent: 'center',
    // alignItems: 'center',
    // position: 'absolute',
    // bottom: 0,
    // width: '100%',
    // marginBottom: height * 0.03,
    flexDirection: 'row',
  },
  signUpTextfirst: {
    color: '#3A3A3A',
    fontFamily: fontType.outfit400,
    fontSize: 14,
  },
  signUpTextSecond: {
    color: colors.green,
    fontFamily: fontType.outfit500,
    fontSize: 14,
  },
  textBox: {
    fontFamily: fontType.outfit400,
    fontSize: 16,
  },
  iconTextStyle: {
    fontFamily: 'Outfit-Regular',
    fontSize: 10,
    marginLeft: height * 0.01,
    color: '#DB5656',
  },
  iconTextColor: {
    color: colors.green,
  },
  iconAlignment: {
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 5,
  },
  iconMargin: {
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'center',
    marginLeft: 5,
  },
  topImageWrapper: {
    width: '55%',
    justifyContent: 'flex-start',
    zIndex: 2,
    position: 'absolute',
    top: heights.height * 0.175,
    marginLeft: 15,
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
  passwordEye: {
    position: 'absolute',
    right: height * 0.025,
    top: height * 0.035,
  },
  termsAndCondition: {
    fontSize: 12,
    fontFamily: fontType.outfit400,
    paddingLeft: 10,
    color: '#898989',
  },
  termsAndConditionTouch: {
    fontSize: 12,
    fontFamily: fontType.outfit400,
    color: colors.green,
  },
  termsAndConditionNonTouch: {
    fontSize: 12,
    color: '#898989',
    fontFamily: fontType.outfit400,
  },
  errorText: {
    fontFamily: 'Outfit-Regular',
    fontSize: 12,
    marginLeft: height * 0.01,
    color: '#DB5656',
  },
  errortextView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
imageSize: {
  height: height * 0.055, 
  width: width * 0.280,
  top : height * 0.070,
  left : 12
  },
});
