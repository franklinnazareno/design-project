import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useLogin } from '../hooks/useLogin'
import { useNavigation } from '@react-navigation/native';
import Input from '../components/inputs';
import CustomButton from '../components/CustomButton';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login, error, isLoading} = useLogin()
  const [isSecureEntry, setIsSecureEntry] = useState (true)
  const navigation = useNavigation();

  const handleSubmit = async () => {
    console.log("handleSubmit called");
    await login(email, password)
    console.log("login function called");
  console.log("error message:", error);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Log In</Text>

      <Text>Email address:</Text>
      <Input
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      
      <Text>Password:</Text>
      <Input
        secureTextEntry={isSecureEntry}
        icon={<TouchableOpacity onPress={()=>{
          setIsSecureEntry((prev)=>!prev)
        }}>
          <Text>{isSecureEntry ? 'Show' : 'Hide'}</Text>
          </TouchableOpacity>}
          iconPosition='right'
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      
      {/* <Button disabled={isLoading} title="Log In" onPress={handleSubmit}/> */}
        
      <CustomButton
        primary
        title="Log In"
        disabled={isLoading}
        onPress={handleSubmit}
      />

      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.signupLink}>Click here to sign up</Text>
      </TouchableOpacity>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        margin: 20
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10
    },
    error: {
        color: 'red',
        fontSize: 16
    },

})

export default Login;
