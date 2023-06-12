import { ScaledSheet } from 'react-native-size-matters';
import colors from '../../assets/themes/colors';
import {Dimensions} from 'react-native';
var deviceWIDTH = Dimensions.get('window').width;


export default ScaledSheet.create ({
    Current: {
        marginTop: '1@s',
        width:'300@s',
        alignSelf:'center',
       
    },
    Destination: {
        marginTop: '-15@s',
        width:'300@s',
        alignSelf:'center',
       
    },
        flexView: {  
        flex: 1,
        backgroundColor: colors.white,
        
      },
      modal: {
        justifyContent: "flex-end",
        margin: 0,
        
      },
      modalContent: {
        backgroundColor: colors.white,
        paddingTop: '1@s',
        paddingHorizontal: '1@s',
        borderTopRightRadius: '20@s',
        borderTopLeftRadius: '20@s',
        minHeight: '400@s',
        paddingBottom: '1@s',
        elevation:'15@s'
        
        
        
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
        marginTop:'10@s',
        marginBottom:'10@s', 
      },
      ButtonView: {
        height:deviceWIDTH,
        backgroundColor: 'red',
      },
      
      btnContainer: {
        // borderTopLeftRadius:'100@s',
        // borderTopRightRadius:'100@s',
        //display: "flex",
        borderRadius:'20@s',
        alignSelf: "center",
        justifyContent: "center",
        height: '30@s',
        width:'300@s',
        backgroundColor:colors.primary,
        marginTop:'-790@s',
        elevation:'10@s'
      },
      navtext: {
        alignSelf:'center',
        color:colors.white,
        fontWeight:'bold',
        fontSize:'15@s',
        marginTop:'-2@s'
      },
      logoImage:{
        height: '200@s',
        width: '200@s',
        marginTop:'10@s',
        marginBottom: '10@s',
        alignSelf:'center',
      },
      error: {
        color: 'red',
        fontSize: 16,
        paddingLeft:'10@s',
      },
      instruction:{
        backgroundColor: '#dae1e3',
        padding: '5@s',
        marginTop:'5@s',
        marginBottom: '1@s',
        borderRadius: '10@s',
        height:'150@s',
        elevation:'15@s',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
      },
      instructText: {
        fontWeight:'5@s',
        fontSize:'16@s',
        
        
      },
      boxloader:{
        marginTop:'25@s',
        flex:'1@s',
        
        
      },
      safeBox: {
        backgroundColor: colors.primary,
        borderRadius: '20@s',
        width:'60@s',
        padding: '5@s',
        marginTop: '20@s',
        alignSelf: 'center',
        marginTop:'1@s',
        marginHorizontal: '2@s',
        
        
      },
      safetextBox:{
        color: colors.white,
        fontSize: '13@s',
        fontWeight: 'bold',
        alignSelf:'center'

      },
      safest:{
        flexDirection:'row',
        borderRadius:'20@s' ,
        height:'40@s',
        padding:'2@s' ,
        backgroundColor: colors.grey,
        alignSelf:'center',
        marginTop:'-100@s',
        paddingHorizontal: '5@s',
        opacity: 0.8,
        elevation: 10
      },
      recenter:{
        margin: '10@s', 
        alignSelf:'flex-end', 
        paddingVertical: '6@s', 
        backgroundColor: colors.primary, 
        borderRadius:'100@s',
        height: '40@s', 
        width: '40@s', 
        elevation: '10@s'
      },
      scroll:{
        flexDirection:'row',

      }
})