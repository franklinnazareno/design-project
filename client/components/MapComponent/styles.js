import { ScaledSheet } from 'react-native-size-matters';
import colors from '../../assets/themes/colors';
import {Dimensions} from 'react-native';
var deviceHeight = Dimensions.get('window').width;


export default ScaledSheet.create ({
    Mapsize:{
        height:'100@s',
        flex:'1@s'
    },
    map:{
        height: '100%'
    }
})