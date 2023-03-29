import {StyleSheet} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import colors from '../../../assets/themes/colors';


export default ScaledSheet.create ({
    wrapper:{
        height:'100@s',
        borderWidth: '2@s',
        borderRadius: '10@s',
        paddingHorizontal:'5@s',
        marginTop: '5@s',
        width:'300@s',
        alignSelf:'center',
        backgroundColor:'white'
    },

    textInput:{
        flex: '1@s',
        width: '255@s',
        textAlignVertical: 'top'
        
        
    },

    inputContainer:{
        paddingVertical: '12@s',
        
        
    },

    error:{
        color:colors.danger,
        paddingTop: '4@s',
        fontSize: '12@s',
    }
});