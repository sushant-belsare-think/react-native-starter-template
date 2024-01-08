import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import { colors } from '../../../../assets/colors';
import Button from '../Buttoncomponent/Button';
import { envChanger } from '../../../../config/ApiConfigs';
import { fontType } from '../../../../assets/fontType';

import { ImagePath } from '../../constants/ImagePathConstant';
import { RootState, useAppDispatch, useAppSelector } from '../../../../lib';
import { SubmitLoginAction } from '../../store/async-actions/SubmitLoginAction';
import { hidePayerPayeeModal, setRole, setTokenInfo } from '../../store/reducers/AuthReducer';
import { IAuth } from '../../interfaces/IAuth';
import { NavigationServiceImpl } from '../../../comman/store/services/NavigationServiceImpl';
import { clearProfileData } from '../../../user-profile/store/reducers/UserProfileReducer';
import { resetChatHistory } from '../../../chat/store/reducers/ChatReducer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { String } from '../../constants/String';

const AccountSelectModal = ({ setShow, visible, FCMToken }: any) => {
  const dispatch = useAppDispatch();
  const payerPayeeModal = useAppSelector(
    (state: RootState) => state.auth.payerPayeeModal,
  );
  return (
    // <View>
    <Modal
      animationType="slide"
      transparent={true}
      visible={payerPayeeModal}
      // visible={show}
      style={styles.modalMain}>
      <TouchableWithoutFeedback onPress={() => {
        // setShow(false)
        dispatch(hidePayerPayeeModal())
        dispatch(resetChatHistory());
        dispatch(clearProfileData());
      }}>
        <View style={styles.modalScreenMain}>
          <TouchableWithoutFeedback>
            <View style={styles.modalWhiteBox}>
              <TouchableOpacity
                onPress={() => {
                  dispatch(hidePayerPayeeModal());
                  dispatch(resetChatHistory());
                  dispatch(clearProfileData());
                }
                }
                style={styles.cancleIcon}>
                <Icon
                  name={String.closeIcon}
                  color={colors.light_grey}
                  size={24}
                />
              </TouchableOpacity>
              <View style={styles.modalTextContainer}>
                <Image source={ImagePath.accounttype} />
                <Text style={styles.modalHeading}>Welcome to Payee!</Text>
                <Text style={styles.modalDesc}>
                  To access your account, please choose one of{' '}
                </Text>
                <Text style={styles.modalDesc}>the following login options.</Text>
              </View>
              <View style={styles.buttonsRow}>
                <TouchableOpacity
                  style={styles.buttons}
                  onPress={() => {
                    dispatch(setRole('Payer'));
                    // dispatch(setTokenInfo());
                    NavigationServiceImpl.getInstance().navToHomeScreen(
                      dispatch
                    );
                    dispatch(hidePayerPayeeModal())
                  }}>
                  <Text style={styles.buttonText}>PAYER</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.buttons}
                  onPress={() => {
                    dispatch(setRole('Recipient'));
                    // dispatch(setTokenInfo());
                    NavigationServiceImpl.getInstance().navToHomeScreen(
                      dispatch
                    );
                    dispatch(hidePayerPayeeModal())
                  }}>
                  <Text style={styles.buttonText}>PAYEE</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
    // </View>
  );
};

export default AccountSelectModal;

const styles = StyleSheet.create({
  modalMain: {
    backgroundColor: 'transparent',
    flex: 1,
  },
  modalTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalHeading: {
    color: colors.black,
    fontFamily: fontType.outfit500,
    fontSize: 22,
    marginVertical: 10,
  },
  modalDesc: {
    color: colors.black,
    fontFamily: fontType.outfit400,
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
  cancleIcon: { position: 'absolute', right: 10, top: 10 },
  buttons: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: colors.green,
    marginHorizontal: 5,
    width: '45%',
    alignItems: 'center',
  },
  buttonsRow: {
    marginTop: 20,
    flexDirection: 'row',
    marginVertical: 10,
    width: '100%',
    justifyContent: 'space-between',
  },
  buttonText: {
    color: 'white',
    fontFamily: fontType.outfit600,
    fontSize: 15,
  },
});
