import { StyleSheet } from "react-native";
import { fontType } from "../../../assets/fontType";
import { colors } from "../../../assets/colors";
import { heights } from "../constants/dimensionConstant";
import { fontSize } from "../../../assets/fontSizes";
import { Dimensions } from "react-native";

const {height} = Dimensions.get('screen');

export const splashScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: 'center' 
    },
    viewStyle: {
        marginTop : height * 0.24,
        alignItems: 'center'
    },
    headTextStyle: {
        fontFamily: fontType.outfit400,
        color: colors.white,
        fontSize: 50
    },
    textStyle: {
        fontFamily: fontType.outfit500,
        color: colors.white,
        fontSize: 22,
     },
    imgaeStyle: {
        height: heights.splash_image_height,
        width: heights.spalsh_image_width,
    },
    innerView:{
        alignItems: 'center'
    },
    versionTextContainer : {
        marginTop : height * 0.52,
        alignItems : 'center',
    },
    versionTextStyles : {
        color: colors.grey,
        fontFamily: fontType.outfit400,
        fontSize: fontSize.normalLabel,
      }
})
