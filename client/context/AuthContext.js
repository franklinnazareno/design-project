import { createContext, useReducer, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    useEffect(() => {
        // const user = JSON.parse(localStorage.getItem('user'))
        const fetchUser = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem('user')
                const user = jsonValue != null ? JSON.parse(jsonValue) : null
                if (user) {
                    dispatch({ type: 'LOGIN', payload: user })
                }
            } catch (error) {
                console.error('Error retrieving data: ', error)
            }
        }
        fetchUser()
    }, [])

    console.log('AuthContext state:', state)

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            { children }
        </AuthContext.Provider>
    )
}