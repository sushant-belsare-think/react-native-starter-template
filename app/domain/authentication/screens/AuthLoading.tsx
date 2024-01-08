//import liraries
import React, {useEffect} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';

// create a component
const AuthLoading = () => {
  useEffect(() => {
    // dispatch()
  }, []);
  return (
    <View>
      <ActivityIndicator style={styleAuthLoading.loader} />
    </View>
  );
};

const styleAuthLoading = StyleSheet.create({
  loader: {
    height: '100%',
  },
});

export default AuthLoading;
