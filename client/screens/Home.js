import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';

// components
import PreferenceDetails from '../components/PreferenceDetails';

const Home = () => {
    const [preference, setPreference] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPreference = async () => {
            const response = await fetch ('http://10.0.2.2:4000/api/preferences/641848bd9b6c19acbb808ed7')
            const json = await response.json()

            if (response.ok) {
                setPreference(json)
            }
            setLoading(false)
        }

        fetchPreference()
    }, [])

  return (
    <View style={styles.home}>
        <View>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <PreferenceDetails preference={preference} />
            )}
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    home: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
})

export default Home;
