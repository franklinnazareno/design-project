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
        borderRadius:'10@s',
        alignSelf: "center",
        alignItems:'flex-start',
        height: '80@s',
        width:'300@s',
        padding: '10@s',
        backgroundColor:colors.white,
        marginTop:'-750@s',
        elevation:'10@s',
        flexDirection: 'row',
      },
      FactorContainer: {
        borderRadius:'10@s',
        alignSelf: "center",
        height: '50@s',
        width:'250@s',
        paddingHorizontal: 15,
        backgroundColor:colors.white,
        marginTop:'-660@s',
        elevation:'10@s',
        flexDirection: 'row',
      },
      ReportContainer: {
        borderRadius:'10@s',
        alignSelf: "flex-end",
        height: '35@s',
        width:'35@s',
        paddingHorizontal: 12,
        backgroundColor:colors.primary,
        marginRight:'10@s',
        marginTop:'-600@s',
        elevation:'10@s',
        flexDirection: 'row',
      },
      navtext: {
        textAlign:'center',
        alignSelf: "center",
        fontWeight:'bold',
        fontSize:'15@s',
        marginTop:'-2@s'
      },
      navtext2: {
        textAlign:'center',
        alignSelf: "center",
        fontSize:'15@s',
        marginTop:'-2@s'
      },
      icon: {
        alignSelf: 'center', 
        fontSize: 50,
        marginRight: 5
      },
      factoricon: {
        alignSelf:'center',
        margin: 3,  
        backgroundColor:colors.primary, 
        borderRadius:30,
        height: 40, 
        width: 40, 
        },
      disabledicon: {
        alignSelf:'center',
        margin: 3,  
        backgroundColor: 'gray', 
        borderRadius:30,
        height: 40, 
        width: 40, 
        },
      Riskfactoricon: {
        alignSelf:'center',
        margin: 3,  
        backgroundColor:'red', 
        borderRadius:30,
        height: 40, 
        width: 40, 
        },
        iconfactors: {
          alignSelf: 'center', 
          fontSize: 20,
          paddingVertical: 8,
          color: colors.white
        },
        iconReport: {
          alignSelf: 'center', 
          fontSize: 20,
          paddingVertical: 5,
          color: colors.white
        },
      
})