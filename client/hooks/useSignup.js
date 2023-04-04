import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const signup = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('https://design-project-production.up.railway.app/api/user/signup', {
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