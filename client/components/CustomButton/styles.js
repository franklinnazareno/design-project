
import { ScaledSheet } from 'react-native-size-matters';
import colors from '../../../assets/theme/colors';

export default ScaledSheet.create ({
    wrapper:{
        height:'42@s',
        width:'300@s',
        paddingHorizontal:'5@s',
        marginVertical: '5@s',
        borderRadius:'10@s',
        alignItems:'center',
        justifyContent:'space-evenly',
        alignSelf:'center',
        marginTop:-1,
    },

    textInput:{
        flex: 1,
        backgroundColor: 'red',   
    },

    loaderSection:{
        flexDirection: 'row',
        
    },

    error:{
        color:colors.danger,
        paddingTop: 4,
        fontSize: 12,
    }
});