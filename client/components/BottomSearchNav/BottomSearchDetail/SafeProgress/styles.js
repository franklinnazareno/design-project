import { ScaledSheet } from 'react-native-size-matters';

import {Dimensions} from 'react-native';
import colors from '../../../../assets/themes/colors';
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').width;

export default ScaledSheet.create ({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e5e5e5",
  },
  headerText: {
    fontSize: '30@s',
    textAlign: "center",
    margin: '10@s',
    color: 'white',
    fontWeight: "bold"
  },
  firstView: {
    width: deviceWidth,
    alignSelf:'flex-start',
    alignSelf:'center',
    marginTop: '1@s',
    
  },
  secondView: {
    height:'100%',
    width:deviceWidth,
    backgroundColor: colors.white,
    borderRadius: '10@s',
    alignSelf:'center',
    marginTop: '1@s',
    flexGrow: 1,
  },
  thirdView: {
    width:deviceWidth,
    height:'100%',
    backgroundColor: colors.white,
    borderRadius: '10@s',
    alignSelf:'center',
    marginTop: '1@s',
    paddingLeft:0,
    flexGrow:1
    
  },
  forthView: {
    width: deviceWidth,
  },
  Current: {
    marginTop: '-10@s',
    width:'300@s',
    alignSelf:'center'
  },
    Destination: {
      marginTop: '-25@s',
      width:'300@s',
      alignSelf:'center',
  },
  boxloader:{
    marginTop:'-10@s',
    flex:1,
  },
  error: {
    color: 'red',
    fontSize: '16@s',
    alignSelf:'center'
  },
  intruction: {
    paddingHorizontal: '5@s',
    marginTop: '3@s',
  },
  
  progressBox:{
    height:'200@s',
    width:'350@s',
    backgroundColor: colors.white,
    borderRadius: '10@s',
    alignSelf:'center',
    marginTop: '1@s',
    alignItems:'center',
    flexDirection:'row',
    
    
        
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
    paddingVertical: '3@s',
    paddingHorizontal: '3@s',
    marginLeft:'1@s'
    
  },
  progresspaddingMAIN:{
    paddingLeft:'5@s',
    
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
    paddingHorizontal: '9@s'
    
  },
  modalContent:{
    backgroundColor: '#fff', 
    borderRadius: '10@s', 
    padding: '20@s', 
    height: '150@s', 
    elevation:'10@s'
  }
});