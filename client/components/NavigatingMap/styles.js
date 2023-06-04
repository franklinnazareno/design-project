import { ScaledSheet } from 'react-native-size-matters';
import colors from '../../assets/themes/colors';
import { Dimensions } from 'react-native';

var imageWidth = Dimensions.width;
var imageHeight = Dimensions.height;

export default ScaledSheet.create ({
    Mapsize:{
        height:'800@s',
        flex:'1@s'
    },
    map:{
        height: '100%'
    },
    modalContent:{
        backgroundColor: 'white', 
        borderRadius: '10@s', 
        padding: '20@s', 
        height: '200@s', 
        elevation:'10@s',
        flexDirection: 'row',
      },
    modalContent2:{
        flex: 1,
        flexDirection: 'column',
        paddingLeft: '10@s',
        flexGrow: 1,
        justifyContent: 'space-around',
      },
    calloutContainer: {
        width: 250,
      },
      container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 5,
      },
      detailsContainer: {
        marginLeft: 10,
      },
      source: {
        fontWeight: 'bold',
        marginBottom: 5,
      },
      category: {
        marginBottom: 5,
      },
      description: {
        fontSize: 12,
        marginBottom: 10,
      },
      VoteView:{
        flexDirection: 'row', 
        alignSelf: 'center',
        alignItems:'center'
      },
      thumbpress:{
        flex: 1,
        alignItems: 'center', 
      },
      modaltext:{
        textAlign:'center',
        fontWeight: 'bold',
        fontSize: 12,
      },
      modaltext2:{
        marginTop: '5@s',
        textAlign:'center',
        fontWeight: 'bold',
        fontSize: 20,
      },
      image:{
        flex: 1,
        width: '100%',
        resizeMode: 'stretch',  
    },  
})