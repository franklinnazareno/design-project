import React, { useState } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { useSignup } from '../../hooks/useSignup';
import Container from '../commons/Container/Contain';
import CustomButton from '../commons/CustomButton';
import Input from '../commons/inputs';
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
      <Input
        label='Email Address:'
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      </View>
      
      <View style={styles.passText}>
      <Input
        label='Password:'
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      </View>

      <CustomButton 
      disabled={isLoading} 
      title="Sign up" 
      primary 
      onPress={handleSubmit}/>
      
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
    </ImageBackground>
    </Container>
  );
};

export default SignupComp;
