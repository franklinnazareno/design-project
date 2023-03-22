import { ScaledSheet } from 'react-native-size-matters';
import colors from '../../assets/themes/colors';

export default ScaledSheet.create ({
    Current: {
        marginTop: '-5@s',
        width:'300@s',
        alignSelf:'center'
    },
    Destination: {
        marginTop: '-20@s',
        width:'300@s',
        alignSelf:'center'
    },
        flexView: {
        flex: 1,
        backgroundColor: "white",
      },
      modal: {
        justifyContent: "flex-end",
        margin: 0,
      },
      modalContent: {
        backgroundColor: colors.white,
        paddingTop: '12@s',
        paddingHorizontal: '12@s',
        borderTopRightRadius: '20@s',
        borderTopLeftRadius: '20@s',
        minHeight: '300@s',
        paddingBottom: '20@s',
      },
      center: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      barIcon: {
        width: '60@s',
        height: '5@s',
        backgroundColor:colors.primary,
        borderRadius: '3@s',
      },
      
      btnContainer: {
        borderTopLeftRadius:'100@s',
        borderTopRightRadius:'100@s',
        display: "flex",
        alignSelf: "center",
        justifyContent: "center",
        height: '35@s',
        width:'360@s',
        backgroundColor:colors.primary,
        
      },
      navtext: {
        alignSelf:'center',
        color:colors.white,
        fontWeight:'bold',
        fontSize:'20@s',
      },
      logoImage:{
        height: '200@s',
        width: '200@s',
        marginTop:'10@s',
        marginBottom: '10@s',
        alignSelf:'center',
      }
})