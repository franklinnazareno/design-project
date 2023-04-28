import { ScaledSheet } from 'react-native-size-matters';
import colors from '../../assets/themes/colors';

export default ScaledSheet.create ({
    regImage:{
      height:'650@s',
      width:'360@s',
      flex:'1@s',
      alignSelf:'center', 
    },
    preferenceDetails: {
      backgroundColor: colors.white,
      padding: '5@s',
      marginTop:'20@s',
      marginBottom: '1@s',
      borderRadius: '10@s',
      height:'500@s',
      width:'320@s',
      alignSelf:'center'
    },
    subPreferenceDetails: {
      marginLeft: '15@s',
    },
    preferenceRow: {
      marginTop:'10@s',
      marginBottom:'10@s',
      alignItems:'stretch',
      paddingHorizontal:'10@s',
      flexDirection:'row-reverse',
      justifyContent:'space-between'
    },
    preferenceName: {
      marginLeft: '10@s',
      fontSize: '16@s',
      fontWeight: 'bold',
    },
    title: {
      fontSize: '18@s',
      fontWeight: 'bold',
      marginBottom: '10@s',
    },
    saveButton: {
      backgroundColor: colors.primary,
      borderRadius: '5@s',
      width:'90@s',
      padding: '10@s',
      marginTop: '20@s',
      alignSelf: 'center',
    },
    saveButtonText: {
      color: colors.white,
      fontSize: '16@s',
      fontWeight: 'bold',
      alignSelf:'center'
    },
    success: {
      marginTop:'5@s',
      alignSelf:'center',
    },
    toastContainer: {
        height: '100%'
    }
});
