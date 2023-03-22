import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Button } from 'react-native';
import Slider from '@react-native-community/slider';
import { usePreferencesContext } from '../hooks/usePreferencesContext';
import { useAuthContext } from '../hooks/useAuthContext';

const PreferenceDetails = ({ preference }) => {
  const { dispatch } = usePreferencesContext()
  const { user } = useAuthContext()

  const [preferences, setPreferences] = useState(preference.preferences);
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(null)


  const handlePreferenceToggle = (index) => {
    const newPreferences = [...preferences];
    newPreferences[index].enabled = !newPreferences[index].enabled;
    if (!newPreferences[index].enabled) {
      newPreferences[index].value = 0
    }
    if (newPreferences[index].enabled && newPreferences[index].value == 0) {
      newPreferences[index].value = 1
    }
    setPreferences(newPreferences);
  };

  const handleSliderChange = (index, value) => {
    const newPreferences = [...preferences];
    newPreferences[index].value = value;
    setPreferences(newPreferences);
  };

  const handleSavePreferences = async () => {
    if(!user) {
      return
    }

    setLoading(true)

    const updatedPreferences = { preferences }

    const response = await fetch('http://10.0.2.2:4000/api/preferences/' + preference._id, {
      method: 'PATCH',
      body: JSON.stringify(updatedPreferences),
      headers: {
        'Authorization': `Bearer ${user.token}`,
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setLoading(false)
    }
    if (response.ok) {
      setError(null)
      setSuccess(true)
      dispatch({type: 'SET_PREFERENCES', payload: json})
      setLoading(false)
    }
  };

  useEffect(() => {
    const currentPreferences = preference.preferences;
    if (JSON.stringify(preferences) !== JSON.stringify(currentPreferences)) {
      setPreferences(currentPreferences);
    }
  }, [preference, preferences]);

  return (
    <View style={styles.preferenceDetails}>
      <Text style={styles.title}>{preference.name}</Text>
      {preferences.map((pref, index) => (
        <View style={styles.subPreferenceDetails} key={pref._id}>
          <View style={styles.preferenceRow}>
            <Switch
              value={pref.enabled}
              onValueChange={() => handlePreferenceToggle(index)}
            />
            <Text style={styles.preferenceName}>{pref.name}</Text>
          </View>
          <Slider
            disabled={!pref.enabled}
            value={pref.value}
            minimumValue={0}
            maximumValue={5}
            step={1}
            onValueChange={value => handleSliderChange(index, value)}
          />
        </View>
      ))}
      <TouchableOpacity
        disabled={loading}
        style={styles.saveButton}
        onPress={handleSavePreferences}
      >
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
      {error && <Text style={styles.error}>{error}</Text>}
      {success && <Text style={styles.success}>Successfully changed preferences</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  preferenceDetails: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
  },
  subPreferenceDetails: {
    marginLeft: 20,
  },
  preferenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  preferenceName: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#007aff',
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
    alignSelf: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
      color: 'red',
      fontSize: 16
  },
  success: {
      color: 'green',
      fontSize: 16
  }
});

export default PreferenceDetails;
