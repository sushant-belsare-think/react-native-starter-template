import React, {useState} from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import Loader from '../../comman/components/Loader/Loader';

const Tax1099Screen = ({route, navigation}: any) => {
  const [loading, setLoading] = useState(false);
  const loginUrl = route?.params;

  const onNavigationStateChange = (payload: any) => {
    if (payload?.url?.includes('mobile/tax1099?')) {
      const text = payload?.url;
      const myArray = text.split('code=');
      const myArray2 = myArray[1].split('&scope=');
      const id = myArray2[0];
      const myArray3 = myArray2[1].split('&state=');
      const myArray4 = myArray3[1].split('&session_state=');
      const stateId = myArray4[0];
      console.log(id, '   ************   ', stateId);
      navigation.replace('Signin', {id, stateId});
      setLoading(false);
    }
  };

  return (
    <>
      <StatusBar backgroundColor={'grey'} />
      <WebView
        source={{uri: loginUrl}}
        style={styles.container}
        incognito={true}
        onNavigationStateChange={onNavigationStateChange}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
      />
      {loading && <Loader />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Tax1099Screen;
