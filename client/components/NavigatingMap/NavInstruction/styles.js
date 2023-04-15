import { ScaledSheet } from 'react-native-size-matters';

import {Dimensions} from 'react-native';
import colors from '../../../assets/themes/colors';
var deviceHeight = Dimensions.get('window').width;


export default ScaledSheet.create ({
      ButtonView: {
        height:deviceHeight,
        backgroundColor: 'red',
      },
      
      btnContainer: {
        // borderTopLeftRadius:'100@s',
        // borderTopRightRadius:'100@s',
        //display: "flex",
        borderRadius:'10@s',
        alignSelf: "center",
        alignItems:'flex-start',
        height: '80@s',
        width:'300@s',
        padding: '10@s',
        backgroundColor:colors.white,
        marginTop:'-790@s',
        elevation:'10@s',
        flexDirection: 'row',
      },
      navtext: {
        textAlign:'center',
        alignSelf: "center",
        // color:colors.white,
        fontWeight:'bold',
        fontSize:'15@s',
        marginTop:'-2@s'
      },
      navtext2: {
        textAlign:'center',
        alignSelf: "center",
        // color:colors.white,
        // fontWeight:'bold',
        fontSize:'15@s',
        marginTop:'-2@s'
      },
      icon: {
        alignSelf: 'center', 
        fontSize: 50,
        marginRight: 5
      }
})