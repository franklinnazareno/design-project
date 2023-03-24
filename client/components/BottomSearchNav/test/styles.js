import { ScaledSheet } from 'react-native-size-matters';
import colors from '../../assets/themes/colors';

var deviceWidth = Dimensions.get('window').width;

export default ScaledSheet.create ({



      container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e5e5e5",
      },
      headerText: {
        fontSize: 30,
        textAlign: "center",
        margin: 10,
        color: 'white',
        fontWeight: "bold"
      },
      firstView: {
        width: deviceWidth,
        backgroundColor: '#F44336',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
      },
      secondView: {
        width: deviceWidth,
        backgroundColor: '#9C27B0',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
      },
      thirdView: {
        width: deviceWidth,
        backgroundColor: '#3F51B5',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
      },
      forthView: {
        width: deviceWidth,
        backgroundColor: '#009688',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
      },
      boxloader:{
        marginTop:1,
        flex:1,
        
        
      }
})