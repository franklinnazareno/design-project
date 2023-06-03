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
        // flex:1,
        backgroundColor: 'white', 
        borderRadius: '10@s', 
        padding: '20@s', 
        height: '200@s', 
        elevation:'10@s',
        flexDirection: 'row',
      },
      modalContent2:{
        backgroundColor: 'white', 
        borderRadius: '10@s', 
        padding: '10@s', 
        height: '100@s',
        width: 150, 

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
      image: {
        width: 80,
        height: 80,
        resizeMode: 'cover',
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
        marginTop: 25,
        alignItems:'center'
        // alignSelf:'flex-end',
      },
      thumbpress:{ 
        backgroundColor: colors.white, 
        height: '60@s', 
        width: '60@s', 
        alignItems: 'center', 
        borderRadius: 10, 
        marginHorizontal: 1 
      },
      thumbpress2:{ 
        backgroundColor: colors.primary, 
        height: '60@s', 
        width: '60@s', 
        alignItems: 'center', 
        borderRadius: 10, 
        marginHorizontal: 1 
      },
      modaltext:{
        textAlign:'center',
        fontWeight: 'bold',
        fontSize:10,
      },
      modaltext2:{
        textAlign:'center',
        fontWeight: 'bold',
        fontSize:15,
      },
      image:{
        flex:1 ,
        width: '100%',
        height: undefined,
        resizeMode: 'stretch',
        
        
    },  
})