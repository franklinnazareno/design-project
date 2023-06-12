import { ScaledSheet } from 'react-native-size-matters';
import {Dimensions} from 'react-native';
import colors from '../../../../assets/themes/colors';
var deviceWidth = Dimensions.get('window').width;

export default ScaledSheet.create ({
  // progressBox:{
  //   flex: 1,
  //   flexWrap:'wrap',
  //   backgroundColor: 'red',
  //   alignSelf:'center',
  //   alignItems:'center',
  //   marginBottom:'4@s',
  //   justifyContent: 'center',
  // },
  Mainprogress:{
    flex:1,
    flexWrap:'wrap',
    flexDirection:'row',
    justifyContent:'space-evenly'
  },
  // progresspadding:{
  //   paddingVertical: '1@s',
  //   paddingHorizontal: '3@s',
  //   marginLeft:'1@s',
  // },
  // progresspaddingMAIN:{
  //   paddingLeft:'10@s',
  // },
  progressContent:{
    flex:1,
    flexWrap:'wrap',
    height:'100%',
    width:deviceWidth,
    backgroundColor: colors.white,
    alignSelf:'center',
    alignItems:'center',
    flexDirection:'row',
    padding:'10@s',
    marginBottom:'2@s'
  },
  modalContent:{
    backgroundColor: '#fff', 
    borderRadius: '10@s', 
    padding: '20@s', 
    height: '100@s', 
    elevation:'10@s'
  },
  modaltext:{
    textAlign:'justify'
  }
});