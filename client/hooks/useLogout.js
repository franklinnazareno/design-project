import { useAuthContext } from "./useAuthContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usePreferencesContext } from "./usePreferencesContext";

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: dispatchPreferences } = usePreferencesContext

    const logout = async () => {
        // remove user from storage
        try {
            await AsyncStorage.removeItem('user')
        } catch (error) {
            console.error('Error removing data: ', error)
        }

        // dispatch logout action
        dispatch({ type: 'LOGOUT' })
        dispatchPreferences({ type: 'SET_PREFERENCES', payload: null })
    }

    return { logout }
}