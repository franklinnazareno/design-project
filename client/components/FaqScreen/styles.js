import { StyleSheet } from "react-native";
import colors from "../../assets/themes/colors";


export default styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'center',
      backgroundColor: '#F5F5F5',
      padding: 20,
    },
    question: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'left'
    },
    answer: {
      fontSize: 16,
      marginBottom: 20,
    },
    divider: {
      borderBottomWidth: 1,
      borderBottomColor: '#CCCCCC',
      width: '100%',
      marginVertical: 20,
    },
    backButton: {
      width:'100%',
      backgroundColor: colors.primary,
      borderRadius: 5,
      padding: 10,
      alignSelf: 'flex-start',
    },
    backButtonText: {
      color: colors.white,
      fontSize: 16,
      fontWeight: 'bold',
      alignSelf:'center'
    },
  });