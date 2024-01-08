//import liraries
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {fontType} from '../../../../assets/fontType';

const EnvComponent = ({selectedEnv}: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textContainer}>{selectedEnv}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    zIndex: 99,
    position: 'absolute',
    top: '4%',
    width: '65%',
    left: '-14%',
    padding: 10,
    alignItems: 'center',
    transform: [{rotate: '-40deg'}],
    borderWidth: 2,
    borderColor: 'white',
  },
  textContainer: {
    color: 'white',
    fontFamily: fontType.outfit700,
    fontSize: 16,
  },
});

export default EnvComponent;
