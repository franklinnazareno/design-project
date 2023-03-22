import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../../assets/themes/colors';
import { useSignup } from '../../hooks/useSignup';
import Container from '../commons/Contain';
import Input from '../inputs';
import styles from './styles';


const SignupComp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {signup, error, isLoading} = useSignup()

  const handleSubmit = async () => {
    await signup(email, password)
  };

  return (
    <Container>
         <ImageBackground 
            height={70} 
            width={70} 
            source={require('../../assets/images/Reg4.png')}
            style={[styles.loginImage]}> 
        
    <View style={styles.container}>
      <Text style={styles.subText}>Sign Up</Text>

      <View style={styles.loginText}>
      {/* <Text>Email address:</Text> */}
      <Input
        label='Email Address:'
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      </View>
      
      <View style={styles.passText}>
      {/* <Text>Password:</Text> */}
      <Input
        label='Password:'
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      </View>

      {/* <Button disabled={isLoading} title="Sign up" onPress={handleSubmit} /> */}
      <View>
            <TouchableOpacity
                disabled={isLoading}
                title="Log In"
                onPress={handleSubmit}
                style={[{backgroundColor: isLoading ? "gray" : colors.primary} ,styles.wrapper]}
                textStyle={{
                color: isLoading ? "#CCCCCC" : "#FFFFFF",
                fontWeight: "bold",
                fontSize: 18,
                }}
                >
                <Text style={styles.buttonText}>Signup</Text>
                </TouchableOpacity>
                </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
    </ImageBackground>
    </Container>
  );
};

export default SignupComp;
