import { ScaledSheet } from 'react-native-size-matters';
import colors from '../../assets/themes/colors';



export default ScaledSheet.create ({
    Mapsize:{
        height:'800@s',
        flex:'1@s'
    },
    map:{
        height: '100%'
    },
    modalContent:{
        backgroundColor: '#fff', 
        borderRadius: '10@s', 
        padding: '20@s', 
        height: '200@s', 
        elevation:'10@s'
      },
})