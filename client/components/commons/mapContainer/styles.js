import { ScaledSheet } from 'react-native-size-matters';

import {Dimensions} from 'react-native';
var deviceHeight = Dimensions.get('window').width;

export default ScaledSheet.create({
    wrapper:{
        
        height: '800@s',
        
        
    },
});