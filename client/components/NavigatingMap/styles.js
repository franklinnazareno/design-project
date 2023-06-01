import { ScaledSheet } from 'react-native-size-matters';
import colors from '../../assets/themes/colors';



export default ScaledSheet.create ({
    Mapsize:{
        height:'800@s',
        flex:'1@s'
    },
    map:{
        height: '100%'
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
})