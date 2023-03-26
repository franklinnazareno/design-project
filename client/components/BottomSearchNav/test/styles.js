import { ScaledSheet } from 'react-native-size-matters';

import {Dimensions} from 'react-native';
import colors from '../../../assets/themes/colors';
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
    alignSelf:'flex-start'
  },
  secondView: {
    height:deviceHeight,
    width:'345@s',
    backgroundColor: colors.white,
    borderRadius: '10@s',
    alignSelf:'center',
    marginTop: '1@s'
  },
  thirdView: {
    width:'345@s',
    height:deviceHeight,
    backgroundColor: colors.white,
    borderRadius: '10@s',
    alignSelf:'center',
    marginTop: '1@s',
    paddingLeft:10,
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
  }
});