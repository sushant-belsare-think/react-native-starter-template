import React, {useState} from 'react';
import {
  Dimensions,
  FlatList,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {fontType} from '../../../../assets/fontType';
import {colors} from '../../../../assets/colors';
import { RootState, useAppSelector } from '../../../../lib';
const {height} = Dimensions.get('screen');



export const DropDown = ({text, data, setSelectedItem, onPress}: Props) => {
  const [selected, setSelected] = useState<any>(data[0].value);
  const [showModal, setShowModal] = useState(false);
  const businessType =  useAppSelector(
    (state: RootState) => state.auth.signupFormValue.businessType,
  );
  
  const isFromDeepLink = useAppSelector((state:RootState)=>state.auth.isFromDeepLink)
  
  const renderItem = ({item}: any) => {
    const choosen =
      item.key === selected ? {color: 'black'} : {color: '#898989'};
    const chooseBackColor =
      item.key === selected
        ? {backgroundColor: '#0F934714', borderColor: '#0F934714'}
        : {backgroundColor: 'white', borderColor: '#E7E7E7'};
    const iconColor = item.key === selected ? '#0F9347' : '#D0D0D0';
    return (
      <TouchableOpacity
        onPress={() => {
          setSelected(item.key);
          setShowModal(false);
          setSelectedItem(item.key);
          onPress(item.key);
        }}
        style={[style.modalDesign, chooseBackColor]}>
        <Text style={[style.choosenDesign, choosen]}>{item.value}</Text>
        <Icon name="checkmark-circle" size={20} color={iconColor} />
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={style.messageContainer}>
        <TouchableOpacity
          onPress={() => setShowModal(true)}
          disabled={isFromDeepLink}
          style={style.covering}>
          <Text style={style.smallText}>{'Company Type'}</Text>
          <Text style={[style.selectedColor,isFromDeepLink && {color:colors.grey}]}>
            {
             isFromDeepLink ? businessType?.charAt(0).toUpperCase() + businessType?.slice(1).toLowerCase() : 
            selected.charAt(0).toUpperCase() + selected.slice(1).toLowerCase()
            }
          </Text>
          <Icon name="chevron-down" size={20} color={'black'} />
        </TouchableOpacity>
        <Modal animationType="slide" transparent={true} visible={showModal}>
          <StatusBar translucent backgroundColor="rgba(0, 0, 0, 0.3)" />
          <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
            <View style={[style.modalContainer]}>
              <TouchableWithoutFeedback>
                <View style={style.modalSubContainer}>
                  <TouchableOpacity
                    onPress={() => setShowModal(false)}
                    style={style.modalShow}
                  />
                  <Text style={style.dropTitle}>{text}</Text>
                  <View>
                    <FlatList
                      style={style.flatStyle}
                      data={data}
                      renderItem={renderItem}
                    />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </>
  );
};

const style = StyleSheet.create({
  messageStyle: {
    fontFamily: fontType.outfit400,
    color: 'black',
    fontSize: 14,
  },
  choosenDesign: {
    fontFamily: fontType.outfit400,
    color: '#898989',
    fontSize: 18,
  },
  buttonContainer: {
    borderColor: '#0F9347',
    backgroundColor: '#0F9347',
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 5,
  },
  buttonText: {
    color: 'white',
    fontFamily: fontType.outfit700,
    letterSpacing: 1,
    fontSize: 14,
  },
  flatStyle: {maxHeight: '95%'},
  dropTitle: {
    marginVertical: 10,
    fontFamily: fontType.outfit500,
    fontSize: 22,
    color: '#3A3A3A',
  },
  modalShow: {
    height: 4,
    width: 30,
    backgroundColor: '#B0B0B0',
    alignSelf: 'center',
    borderRadius: 20,
    marginBottom: 20,
  },
  modalSubContainer: {
    maxHeight: '45%',
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
  },
  modalDesign: {
    marginBottom: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#E7E7E7',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#0F934714',
  },
  modalContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    height: '100%',
    justifyContent: 'flex-end',
  },
  bind: {
    color: 'white',
    fontFamily: fontType.outfit700,
    letterSpacing: 1,
    fontSize: 14,
  },
  choose: {
    marginTop: 15,
    borderColor: '#0F9347',
    backgroundColor: '#0F9347',
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 5,
  },
  selectedColor: {
    color: colors.black,
    fontFamily: fontType.outfit400,
    fontSize: 17,
  },
  smallText: {
    paddingHorizontal: 5,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: '150%',
    color: '#B0B0B0',
    fontSize: 10,
    left: '3%',
  },
  covering: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 15,
    borderColor: '#B0B0B0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    alignItems: 'center',
  },
  messageContainer: {
    backgroundColor: 'white',
    // padding: 15,
    marginBottom: 15,
    // marginTop: 5,
    borderRadius: 16,
    // width: height * 0.35,
    width: '100%',
  },
});

type Props = {
  text: string;
  data: any;
  setSelectedItem: any;
  onPress: any;
};
