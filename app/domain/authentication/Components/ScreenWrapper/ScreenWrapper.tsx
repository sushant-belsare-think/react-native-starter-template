import {View} from 'react-native';
import React from 'react';
import {ScreenWrapperstyles as styles} from './ScreenWrapperStyles';

const ScreenWrapper = ({children}: {children: React.ReactNode}) => {
  return <View style={styles.wrapper}>{children}</View>;
};

export default ScreenWrapper;
