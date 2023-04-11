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
        justifyContent: "center",
        height: '80@s',
        width:'300@s',
        backgroundColor:colors.white,
        marginTop:'-790@s',
        elevation:'10@s'
      },
      navtext: {
        textAlign:'center',
        // color:colors.white,
        fontWeight:'bold',
        fontSize:'15@s',
        marginTop:'-2@s'
      },
      navtext2: {
        textAlign:'center',
        // color:colors.white,
        // fontWeight:'bold',
        fontSize:'15@s',
        marginTop:'-2@s'
      },
      
})