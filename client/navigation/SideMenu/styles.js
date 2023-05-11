import { ScaledSheet } from 'react-native-size-matters';
import colors from '../../assets/themes/colors';
import { Dimensions } from 'react-native';
var deviceheight = Dimensions.get('window').height;

export default ScaledSheet.create ({

logoImage:{
    height: '100@s',
    width: '200@s',
    marginTop:'5@s',
    alignSelf:'center',
    
},
items: {
    flexDirection:'row',
    justifyContent:'flex-start',
    alignSelf:'center',
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
    height:deviceheight * 1.15 ,
    width:'255@s',
    alignSelf:'center',
    
},
});