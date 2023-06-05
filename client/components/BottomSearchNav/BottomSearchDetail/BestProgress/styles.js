import { ScaledSheet } from 'react-native-size-matters';
import {Dimensions} from 'react-native';
import colors from '../../../../assets/themes/colors';
var deviceWidth = Dimensions.get('window').width;


export default ScaledSheet.create ({
  progressBox:{
    height:'220@s',
    width:'350@s',
    backgroundColor: colors.white,
    alignSelf:'center',
    marginTop: '1@s',
    alignItems:'center',
    flexDirection:'row',
    marginBottom:'4@s',
    justifyContent: 'center',

  },
  progressBoxFast:{
    height:'200@s',
    width:deviceWidth,
    backgroundColor: colors.white,
    borderRadius: '10@s',
    alignSelf:'center',
    marginTop: '1@s',
    alignItems:'center',
    flexDirection:'row',
    justifyContent: 'center',
    
        
  },
  
  Mainprogress:{
    height:'150@s',
    width:'240@s',
    flexWrap:'wrap',
    paddingHorizontal:0,
    marginTop: '-15@s',
    flexDirection:'row', 
    alignItems:'center'
    
  },
  progresspadding:{
    paddingVertical: '1@s',
    paddingHorizontal: '3@s',
    marginLeft:'1@s',
    
    
    
  },
  progresspaddingMAIN:{
    paddingLeft:'10@s',
    
  },
  progressContent:{
    height:'200@s',
    width:deviceWidth,
    backgroundColor: colors.white,
    borderRadius: '10@s',
    alignSelf:'center',
    marginTop: '1@s',
    alignItems:'center',
    flexDirection:'row',
    paddingHorizontal: '9@s',
    marginBottom:'10@s'
    
    
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