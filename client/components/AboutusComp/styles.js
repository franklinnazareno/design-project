import { ScaledSheet } from 'react-native-size-matters';
import colors from '../../assets/themes/colors';

export default styles = ScaledSheet.create({
    
    loginImage:{
        height: '690@s',
        width: '350@s',
        flex:1,
        alignSelf:'center',
    },
    aboutWrapper:{ 
        height:'70%',
        marginTop: '20@s', 
        flexWrap: 'wrap',
        alignSelf:'center' ,
        alignItems:'center'
    },
    memberimage:{
        height:'160@s', 
        width:'140@s', 
        alignItems:'center', 
        backgroundColor: colors.white, 
        margin:'10@s', 
        paddingTop:'15@s', 
        borderRadius: '20@s',
        elevation: 20,
    },
    imagesize:{
        height:'90@s', 
        width:'90@s',
        borderRadius:'15@s'
    },
    namefont:{
        padding:'3@s',
        alignSelf:'center', 
        fontSize: 10,
        fontWeight:'bold' 
    },
    namefont2:{
        alignSelf:'center',
        fontSize: 10,
        fontWeight:'bold' 
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems:'center',
    }
})