import {Dimensions, StyleSheet} from 'react-native';
import {fontType} from '../../../../assets/fontType';

const {height, width} = Dimensions.get('screen');

export const BannerStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',

  },
  backIcon: {top: '20%', left: '5%'},
  imageBg: {
    flex: 1,
    width: '100%',
    position: 'absolute',
    top: 0,
    // backgroundColor: '#0F9347',
    height: height * 0.337,
  },
  bannerImageContainer: {
    position: 'absolute',
    top: 50,
    marginLeft: 20,
    width: '52%',
  },
  bannerTextContainer: {
    position: 'absolute',
    // top: 180,
    // top: height * 0.2,
    top: '55%',
    marginLeft: 20,
    width: '55%',
  },
  bannerText: {
    fontSize: 32,
    color: 'white',
    fontFamily: fontType.outfit500,
  },
  iconColor: {
    color: 'white',
  },
});
