import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'tw-tailwind'
import Input from '../inputs';
import colors from '../../assets/themes/colors';
import { useLogin } from '../../hooks/useLogin';
import styles from './styles';
import Container from '../commons/Contain';
import CustomButton from '../CustomButton';


const LoginComp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login, error, isLoading} = useLogin()
  const [isSecureEntry, setIsSecureEntry] = useState (true)
  const navigation = useNavigation();

  const handleSubmit = async () => {
    console.log("handleSubmit called");
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
            source={require('../../assets/images/pd-logo2.png')}
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

            
                {/* <CustomButton
                disabled={isLoading}
                primary
                title="Log In"
                onPress={handleSubmit}/> */}
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
                <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                </View>

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
