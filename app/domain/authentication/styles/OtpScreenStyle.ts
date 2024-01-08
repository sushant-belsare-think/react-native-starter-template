import {Dimensions, StyleSheet} from 'react-native';
import {fontType} from '../../../assets/fontType';
import {colors} from '../../../assets/colors';
import {heights} from '../constants/dimensionConstant';

const {height, width} = Dimensions.get('screen');

export const OtpScreenStyle = StyleSheet.create({
  cotainer: {
    flex: 1,
  },
  imageBg: {
    flex: 1,
    width: '100%',
    position: 'absolute',
    // top: height * 0.023,
    // right : 25,
    height: height * 0.27,
    backgroundColor : colors.green
  },
  martop: {marginTop: 20},
  marginVertical: {marginVertical: 10},
  borderStyleBase: {
    width: 30,
    height: 45,
  },
  otpSubText: {
    color: colors.new_grey,
    fontSize: 14,
    fontFamily: fontType.outfit400,
  },
  borderStyleHighLighted: {
    borderColor: colors.green,
  },
  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 2,
    color: '#B0B0B0',
  },
  underlineStyleHighLighted: {
    borderColor: colors.green,
  },
  topImageTextView: {
    width: height * 0.25,
    justifyContent: 'flex-start',
    zIndex: 2,
    position: 'absolute',
    top: height * 0.12,
    paddingLeft: height * 0.01,
  },
  topImageText: {
    marginLeft: 15,
    zIndex: 2,
    color: colors.white,
    fontSize: 32,
    fontFamily: fontType.outfit500,
  },
  topImageBackButton: {
    position: 'absolute',
    top: '15%',
    marginLeft: 15,
    width: '52%',
  },
  otpInputBox: {
    width: '80%',
    height: 100,
  },
  Otptext: {
    color: colors.new_grey,
    marginVertical: 10,
    // marginTop: 10
  },
  modalScreenMain: {
    paddingBottom: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'rgba(0, 0, 0, 0.3)',
    // width: heights.width,
    // height: "100%",
    width: heights.width,
    height: heights.height,
    borderRadius: 10,
    position: 'absolute',
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
  modalHeadText: {
    color: colors.black,
    fontSize: 20,
    marginTop: 20,
    marginBottom: 8,
    fontFamily: fontType.gilroy600,
    textAlign: 'center',
    lineHeight: 24,
  },
  modalSubText: {
    fontFamily: fontType.gilroy400,
    fontSize: 14,
    color: colors.black,
    textAlign: 'center',
    lineHeight: 18,
  },
  modalText: {color: 'black', fontFamily: fontType.gilroy600, fontSize: 14},
  modalMain: {backgroundColor: 'transparent', height: '100%', width: width},
  modalWrapper: {alignItems: 'center', marginBottom: 10},
  WrapperExtraStyle: {top: height * 0.24},
  buttonView: {marginBottom: 30},
  bottomTextView: {marginVertical: 5},
  OtpInputView: {alignItems: 'center'},
  gifStyle: {width: height * 0.09, height: height * 0.09},
  timerTextColor: {color: colors.green},
});
