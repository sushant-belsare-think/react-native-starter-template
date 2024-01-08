import {View, Text} from 'react-native';
import React from 'react';
import {TextComponentStyle} from './TextComponentStyle';
import {TextComponent} from '../../../comman/interfaces/TextComponent';

const TexComponent = ({headText, normalText}: TextComponent) => {
  return (
    <View style={TextComponentStyle.root}>
      <Text style={TextComponentStyle.headText}>{headText}</Text>
      {/* <Text style={TextComponentStyle.subHeadText}>{subHeadText}</Text> */}
      <Text style={TextComponentStyle.normalText}>{normalText}</Text>
    </View>
  );
};

export default TexComponent;
