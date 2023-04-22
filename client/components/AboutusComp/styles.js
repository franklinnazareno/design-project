import { ScaledSheet } from 'react-native-size-matters';
import colors from '../../assets/themes/colors';

export default styles = ScaledSheet.create({
    
    loginImage:{
        height: '610@s',
        width: '350@s',
        flex:1,
        alignSelf:'center',
    },
    aboutWrapper:{ 
        height:500,
        marginTop: '20@s', 
        flexWrap: 'wrap',
        flexDirection:'row', 
        alignSelf:'center' ,  
        padding:'15@s',
    },
    memberimage:{
        height:'150@s', 
        width:'140@s', 
        alignItems:'center', 
        backgroundColor: colors.white, 
        margin:'10@s', 
        paddingTop:'15@s', 
        borderRadius: '20@s',
        elevation: 20,
    },
    imagesize:{
        height:'95@s', 
        width:'95@s',
        borderRadius:'15@s'
    },
    namefont:{
        padding:'5@s',
        alignSelf:'center', 
        fontSize: 12
    }
})