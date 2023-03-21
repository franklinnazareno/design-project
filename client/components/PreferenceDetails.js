import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { usePreferencesContext } from '../hooks/usePreferencesContext';

const PreferenceDetails = ({ preference }) => {
  const { dispatch } = usePreferencesContext()

  const [preferences, setPreferences] = useState(preference.preferences);
  const [error, setError] = useState(null)

  const handlePreferenceToggle = (index) => {
    const newPreferences = [...preferences];
    newPreferences[index].enabled = !newPreferences[index].enabled;
    setPreferences(newPreferences);
  };

  const handleSliderChange = (index, value) => {
    const newPreferences = [...preferences];
    newPreferences[index].value = value;
    setPreferences(newPreferences);
  };

  const handleSavePreferences = async () => {

    const updatedPreferences = { preferences }

    const response = await fetch('http://10.0.2.2:4000/api/preferences/641848bd9b6c19acbb808ed7', {
      method: 'PATCH',
      body: JSON.stringify(updatedPreferences),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
    }
    if (response.ok) {
      setError(null)
      dispatch({type: 'UPDATE_PREFERENCES', payload: json})
    }
  };



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
        style={styles.saveButton}
        onPress={handleSavePreferences}
      >
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
      {error && <Text style={styles.error}>{error}</Text>}
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
});

export default PreferenceDetails;
