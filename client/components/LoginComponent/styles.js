import { ScaledSheet } from 'react-native-size-matters';
import colors from '../../assets/themes/colors';

export default styles = ScaledSheet.create({
    container: {
        margin: 20
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10
    },
    error: {
        color: 'red',
        fontSize: 16,
        paddingLeft:'10@s',
    },

    signupLink: {
        paddingLeft:'5@s',
        color:colors.blue,
        width:'140@s',
        alignSelf:'auto',
    },

    logoImage:{
        height: '150@s',
        width: '600@s',
        marginTop:'30@s',
        marginBottom: '100@s',
        alignSelf:'center',
        
    },
    loginImage:{
        height: '650@s',
        width: '350@s',
        flex:1,
        alignSelf:'center',
    },
    subText:{
        marginTop: '-70@s',
        marginBottom:'1@s',
        fontSize:'17@s',
        textAlign:'center',
        paddingVertical: '1@s',
        fontWeight: 500    
    },
    loginText:{
        marginTop: '-40@s',
        width:'290@s',
        alignSelf:'center', 
    },
    passText:{
        marginTop: '-20@s',
        width:'290@s',
        alignSelf:'center',
    },
    wrapper: {
        height:'42@s',
        width:'300@s',
        paddingHorizontal:'5@s',
        marginVertical: '5@s',
        borderRadius:'10@s',
        alignItems:'center',
        justifyContent:'space-evenly',
        alignSelf:'center',
        marginTop:'1@s',
    },
    buttonText:{
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.white
    }
})