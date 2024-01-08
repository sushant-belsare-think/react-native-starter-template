import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {LoaderStyle} from './LoaderStyle';
import {colors} from '../../../../assets/colors';
import {Modal} from 'react-native-paper';

export const Loader = () => {
  return (
    <Modal visible={true}>
      <View style={LoaderStyle.loader}>
        <ActivityIndicator size="large" color={colors.green} />
      </View>
    </Modal>
  );
};

export default Loader;
