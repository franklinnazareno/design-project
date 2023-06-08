import { useState, useEffect } from 'react'
import { useAuthContext } from './useAuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';
import NetInfo from '@react-native-community/netinfo'

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const handleConnectivityChange = (connectionInfo) => {
        setIsConnected(connectionInfo.isConnected);
        };

        // Subscribe to network connection changes
        const unsubscribe = NetInfo.addEventListener(handleConnectivityChange);

        // Cleanup subscription on component unmount
        return () => {
        unsubscribe();
        };
    }, []);

    const signup = async (email, password) => {
        setIsLoading(true)
        setError(null)

        if(isConnected == false){
            setError('No internet connection')
            setIsLoading(false)
            return error
        }
        const response = await fetch(`${Config.EXPRESS}/api/user/signup`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email, password })
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            // save the user to local storage
            try {
                await AsyncStorage.setItem('user', JSON.stringify(json))
            } catch (error) {
                console.error('Error storing data: ', error)
            }

            // update the auth context
            dispatch({type: 'LOGIN', payload: json})

            // update loading state
            setIsLoading(false)
        }
    }

    return { signup, isLoading, error }
}