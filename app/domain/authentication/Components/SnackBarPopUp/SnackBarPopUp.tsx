import {View, Text } from 'react-native';
import { SnackBarPopUpStyle as Styles} from './SnackBarPopUpStyle';
import { colors } from '../../../../assets/colors';

const SnackBarPopUp = ({value}: boolean) => {
    console.log("value............... "+JSON.stringify(value));
    
    return(
        <View style={[Styles.ConnectivitySnackBar, value ? {backgroundColor: colors.green} : {backgroundColor: colors.red}]}>
          <Text style={Styles.Text}>
            {value ? 'Back Online' : 'No Internet Connection'}
          </Text>
        </View>
    )
}

export default SnackBarPopUp;

