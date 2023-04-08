import { ScaledSheet } from 'react-native-size-matters';
import colors from '../../assets/themes/colors';

export default ScaledSheet.create({
   
    Text:{
        marginTop: '1@s',
        width:'290@s',
        alignSelf:'center', 
    },
    loginImage:{
        height: '600@s',
        width: '350@s',
        flex:1,
        alignSelf:'center',
    },
    subText:{
        marginTop: '50@s',
        marginBottom:'1@s',
        fontSize:'17@s',
        textAlign:'center',
        paddingVertical: '1@s',
        fontWeight: 500    
    },
    saveButtonText: {
        color: colors.white,
        fontSize: '10@s',
        fontWeight: 'bold',
        alignSelf:'center',
    },
    saveButton: {
        backgroundColor: colors.primary,
        borderRadius: '5@s',
        width:'90@s',
        padding: '10@s',
        margin: '5@s',
        alignSelf: 'center',
    },
    error: {
    color: 'red',
    fontSize: '16@s',
    alignSelf:'center'
    },
    success: {
    color: 'green',
    fontSize: '16@s',
    alignSelf:'center'
    },
    Imageupload: {
        marginBottom: '8@s'
    }
});