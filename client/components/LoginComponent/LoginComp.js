import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Input from '../commons/inputs';
import { useLogin } from '../../hooks/useLogin';
import styles from './styles';
import CustomButton from '../commons/CustomButton';
import Container from '../commons/Container/Contain';


const LoginComp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login, error, isLoading} = useLogin()
  const [isSecureEntry, setIsSecureEntry] = useState (true)
  const navigation = useNavigation();

  const handleSubmit = async () => {
    await login(email, password)
  };

  return (
    <Container>
            <ImageBackground 
            height={70} 
            width={70} 
            source={require('../../assets/images/login.png')}
            style={[styles.loginImage]}> 
            
            <Image  
            height={70} 
            width={70} 
            source={require('../../assets/images/pd-logo3.png')}
            style={[styles.logoImage]}
            />
            
            <View style={styles.container}>
            <View>
            <Text style={styles.subText}>Log In</Text>
            </View>

                <View style={styles.loginText}>
                <Input
                label="Email Adress:"
                onChangeText={(text) => setEmail(text)}
                value={email}
                />
            </View>
            
            <View style={styles.passText}>
            <Input
                label='Password:'
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
            </View>
                <CustomButton
                disabled={isLoading}
                primary
                title="Log In"
                onPress={handleSubmit}/>  

            <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={styles.signupLink}>
                <Text style={styles.signupLink}>Click here to sign up</Text>
            </TouchableOpacity>
            {error && <Text style={styles.error}>{error}</Text>}
            </View>
            </ImageBackground>
            </Container>
  );
};


export default LoginComp;
