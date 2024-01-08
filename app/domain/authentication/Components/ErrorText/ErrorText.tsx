import {View, Text} from 'react-native';
import React from 'react';
import Icon2 from 'react-native-vector-icons/AntDesign';
import {ErrorTextStyle} from './ErrorTextStyle';
import Check from 'react-native-vector-icons/Octicons';
import {colors} from '../../../../assets/colors';

const ErrorText = ({ErrorMessage, isSuccess, fontsize}: Props) => {
  return (
    <View style={ErrorTextStyle.errortextView}>
      {isSuccess ? (
        <Check name="check" color={colors.green} />
      ) : (
        <Icon2 name={'exclamationcircleo'} color={'#DB5656'} />
      )}
      <Text
        style={[
          ErrorTextStyle.errorText,
          {
            color: isSuccess ? 'green' : 'red',
            fontSize: fontsize ? fontsize : 12,
          },
        ]}>
        {ErrorMessage}
      </Text>
    </View>
  );
};

export default ErrorText;

type Props = {
  ErrorMessage: string | null;
  isSuccess?: boolean;
  fontsize?: number;
};
