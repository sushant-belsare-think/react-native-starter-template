import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import {colors} from '../../../../assets/colors';
import Button from '../Buttoncomponent/Button';
import {envChanger} from '../../../../config/ApiConfigs';
import {
  setAuthBaseUrl,
  setAuthClientId,
  setAuthClientSecret,
  setBaseUrl,
  setEnv,
  setRasaBaseUrl,
} from '../../store/reducers/AuthReducer';
import {RootState, useAppDispatch, useAppSelector} from '../../../../lib';

const DevModal = ({setShow, visible}: any) => {
  const dispatch = useAppDispatch();
  const selectedEnv = useAppSelector(
    (state: RootState) => state.auth.selectedEnv,
  );

  const getButtonStyle = (environment: string) => {
    if (environment === selectedEnv) {
      return styles.selectedButton;
    }
    return styles.buttons;
  };

  return (
    <View style={{flex: 1}}>
      <Modal
        animationType="slide"
        transparent={true}
        // visible={showModal}
        visible={visible}
        style={styles.modalMain}>
        <TouchableOpacity
          activeOpacity={0}
          onPress={() => setShow(false)}
          style={styles.modalScreenMain}>
          <View style={styles.modalWhiteBox}>
            <View style={styles.buttonsRow}>
              <TouchableOpacity
                style={getButtonStyle('dev')}
                onPress={() => {
                  envChanger('DEV');
                  setShow(false);
                  dispatch(setBaseUrl('https://dev.api.baseURL.ai'));
                  dispatch(setRasaBaseUrl('https://dev.chat.api.baseURL.ai/'));
                  dispatch(
                    setAuthBaseUrl(
                      'https://dev.auth.baseURL.ai/realms/development',
                    ),
                  );
                  dispatch(setAuthClientId('baseURL-dev'));
                  dispatch(
                    setAuthClientSecret('9APzdd5qynoNHxQ5AoO8rl8WpWd5tQlh'),
                  );
                  dispatch(setEnv('dev'));
                }}>
                <Text style={styles.buttonText}>Development</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={getButtonStyle('prod')}
                onPress={() => {
                  envChanger('PROD');
                  setShow(false);
                  dispatch(setBaseUrl('https://api.baseURL.ai'));
                  dispatch(setRasaBaseUrl('https://chat.api.baseURL.ai/'));
                  dispatch(setAuthBaseUrl('https://auth.baseURL.ai/'));
                  dispatch(setAuthClientId('baseURL-prod'));
                  dispatch(
                    setAuthClientSecret('9APzdd5qynoNHxQ5AoO8rl8WpWd5tQlh'),
                  );
                  dispatch(setEnv('prod'));
                }}>
                <Text style={styles.buttonText}>Production</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.buttonsRow}>
              <TouchableOpacity
                style={getButtonStyle('stage')}
                onPress={() => {
                  envChanger('STAGE');
                  setShow(false);
                  dispatch(setBaseUrl('https://stage.api.baseURL.ai'));
                  dispatch(
                    setRasaBaseUrl('https://stage.chat.api.baseURL.ai/'),
                  );
                  dispatch(
                    setAuthBaseUrl(
                      'https://stage.auth.baseURL.ai/realms/stage',
                    ),
                  );
                  dispatch(setAuthClientId('baseURL-stage'));
                  dispatch(
                    setAuthClientSecret('PPbz1aUrF1kG9GPqIRmjL5smsszSGSg7'),
                  );
                  dispatch(setEnv('stage'));
                }}>
                <Text style={styles.buttonText}>Stage</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={getButtonStyle('qa')}
                onPress={() => {
                  envChanger('QA');
                  setShow(false);
                  dispatch(setBaseUrl('https://qa.api.baseURL.ai'));
                  dispatch(setRasaBaseUrl('https://qa.chat.api.baseURL.ai/'));
                  dispatch(
                    setAuthBaseUrl('https://qa.auth.baseURL.ai/realms/qa'),
                  );
                  dispatch(setAuthClientId('baseURL-qa'));
                  dispatch(
                    setAuthClientSecret('MmdyoaCNGfvDAb9u2sWY93NgKKuSEYgJ'),
                  );
                  dispatch(setEnv('qa'));
                }}>
                <Text style={styles.buttonText} onPress={() => setShow(false)}>
                  QA
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default DevModal;

const styles = StyleSheet.create({
  modalMain: {
    backgroundColor: 'transparent',
    flex: 1,
  },
  modalScreenMain: {
    paddingBottom: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  modalWhiteBox: {
    alignSelf: 'center',
    width: '90%',
    backgroundColor: colors.white,
    alignItems: 'center',
    borderRadius: 16,
    padding: 15,
    paddingHorizontal: 20,
  },
  buttons: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: colors.green,
    marginHorizontal: 5,
    width: '45%',
    alignItems: 'center',
  },
  selectedButton: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: 'lightgreen',
    marginHorizontal: 5,
    width: '45%',
    alignItems: 'center',
  },
  buttonsRow: {
    flexDirection: 'row',
    marginVertical: 10,
    width: '100%',
    justifyContent: 'space-between',
  },
  buttonText: {
    color: 'white',
  },
});
