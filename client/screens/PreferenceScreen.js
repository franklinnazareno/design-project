import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { usePreferencesContext } from '../hooks/usePreferencesContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';
import Login from './LoginScreen';
import Config from 'react-native-config';
import PreferenceDetails from '../components/PrefDetails/PreferenceDetails';
import colors from '../assets/themes/colors'
const windowHeight = Dimensions.get('window').height;


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
                <View style={{ alignItems:'center', marginTop: windowHeight * 0.3}}>
                    <ActivityIndicator size="large" color={colors.primary}/>
                    <Text style={{marginTop: 20}}>Loading Preferences...</Text>
                    <Text style={{ marginTop: 10, fontSize: 12, color: 'gray' }}>Please ensure you have an active internet connection.</Text>
                </View>
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
