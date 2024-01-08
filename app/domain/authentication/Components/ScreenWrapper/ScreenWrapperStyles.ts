import {Dimensions, StyleSheet} from 'react-native';

const {height, width} = Dimensions.get('screen');
export const ScreenWrapperstyles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white',
    borderRadius: 22,
    position: 'absolute',
    width: '100%',
    // height: '66%',
    bottom: 0,
    padding: 16,
    paddingTop: 30,
    top: height * 0.321,
  },
});
