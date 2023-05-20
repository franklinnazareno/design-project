import { ScaledSheet } from 'react-native-size-matters';
import colors from '../../assets/themes/colors';


export default ScaledSheet.create ({
    Mapsize:{
        height:'100@s',
        flex:'1@s'
    },
    map:{
        height: '100%'
    },
    CenterBox:{
        borderRadius:'30@s',
        alignSelf: 'center',
        padding: '-10@s',
        backgroundColor:colors.primary,
        marginTop:'-750@s',
        elevation:'10@s',
        flexDirection: 'row',
        marginLeft:'260@s',
      },
    ReCenter:{
        alignSelf:'center',
        margin: 3,  
        backgroundColor:colors.primary, 
        borderRadius:30,
        height: 50, 
        width: 50, 
   
      },
    Icon:{
        margin: 8 ,
        alignSelf: 'center'
    }
})