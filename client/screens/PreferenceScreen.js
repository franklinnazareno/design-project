import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, SafeAreaView } from 'react-native';
import { usePreferencesContext } from '../hooks/usePreferencesContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';
import Login from './LoginScreen';
import Config from 'react-native-config';
import PreferenceDetails from '../components/PrefDetails/PreferenceDetails';


const PrefDetail = () => {
    const [loading, setLoading] = useState(true)

    const { preferences, dispatch } = usePreferencesContext()
    const { user } = useAuthContext()

    const { logout } = useLogout()

    useEffect(() => {
        const fetchPreference = async () => {
            const response = await fetch (`${Config.EXPRESS}/api/preferences`, {
                headers: {'Authorization': `Bearer ${user.token}`}
            })
            const json = await response.json()
            
            if (response.ok) {
                dispatch({type: 'SET_PREFERENCES', payload: json})
            }
            if (!response.ok) {
                logout()
                return <Login />
            }
            setLoading(false)
        }

        fetchPreference()
    }, [dispatch, user])

    if (!user) {
        <Login />
    }

  return (
    <SafeAreaView>
        <View>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <PreferenceDetails preference={preferences} />
                
            )}
        </View>
        </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    home: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
})

export default PrefDetail;
