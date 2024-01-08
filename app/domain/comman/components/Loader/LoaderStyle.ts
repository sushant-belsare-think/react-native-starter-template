import {StyleSheet, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('screen');
export const LoaderStyle = StyleSheet.create({
  loader: {
    justifyContent: 'center',
    elevation: 2,
    alignItems: 'center',
    height: '100%',
    // flex: 1,
    width: width,
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
});
