import {ImageBackground, Text, View, Image, Dimensions} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {BannerStyles as styles} from './BannerStyles';
import { ImagePath } from '../../constants/ImagePathConstant';

const Banner = ({image, text, back,onPress}: Props) => {

  const {height,width}=Dimensions.get('screen');

  const navigation = useNavigation();
  return (
    <View style={styles.mainContainer}>
      <ImageBackground source={image} style={styles.imageBg}>
        {back && (
          <View style={styles.imageBg}>
            <View style={styles.backIcon}>
              <Icon
                name="chevron-left"
                size={25}
                color="white"
                onPress={() => navigation.goBack()}
              />
            </View>
          </View>
        )}

        <View style={styles.bannerTextContainer}>
          <Text style={styles.bannerText} onPress={onPress}>{text}</Text>
        </View>
      </ImageBackground>
    </View>



  //   <View style={styles.mainContainer}>
  //   <ImageBackground source={ImagePath.background} style={styles.imageBg}>
  //     {back && (
  //       <View style={styles.imageBg}>
  //         <View style={styles.backIcon}>
  //           <Icon
  //             name="chevron-left"
  //             size={25}
  //             color="white"
  //             onPress={() => navigation.goBack()}
  //           />
  //         </View>
  //       </View>
  //     )}
  //     <View style={{position: 'absolute', right: 0, top: height * 0.07}}>
  //       <Image source={ImagePath.lock} style={{height: height * 0.2, width: height * 0.2}} />
  //     </View>
  //     <View style={styles.bannerTextContainer}>
  //       <Text style={styles.bannerText}>{text}</Text>
  //     </View>
  //   </ImageBackground>
  // </View>
  );
};

export default Banner;

type Props = {
  image: Object;
  text: string;
  back: boolean;
  onPress? : any
};
