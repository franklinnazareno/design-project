import {StyleSheet} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import colors from '../../assets/themes/colors';

export default ScaledSheet.create ({

logoImage:{
    height: '150@s',
    width: '450@s',
    marginTop:'5@s',
    alignSelf:'center',
},
items: {
    flexDirection:'row',
    justifyContent:'flex-start',
    alignSelf:'center',
    // borderWidth: '2@s',
    // borderRadius: '10@s',
    width:'220@s',
    marginTop:'2@s',
    borderColor:colors.primary
},
itemsText: {
    fontSize:'15@s',
    paddingVertical:'10@s',
    paddingHorizontal:'1@s'
},
regImage:{
    height:'700@s',
    width:'400@s',
    flex:1,
    alignSelf:'center',
    
},
});