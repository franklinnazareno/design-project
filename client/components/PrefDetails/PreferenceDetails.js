import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Button } from 'react-native';
import Slider from '@react-native-community/slider';
import { usePreferencesContext } from '../../hooks/usePreferencesContext';
import { moderateScale } from 'react-native-size-matters';
import { useAuthContext } from '../../hooks/useAuthContext';
import CustomSwitch from '../commons/CustomSwitch/Index';
import styles from './styles';
import colors from '../../assets/themes/colors';


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
    console.log(loading)

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
              style={{ transform: [{ 
                scaleX: moderateScale(1, 1.5) }, 
                { scaleY: moderateScale(1, 1.5) }] }}
                trackColor={{false: colors.grey, true: colors.primary}}
                thumbColor={pref.enabled ? '#f4f3f4' : '#f4f3f4'}
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



export default PreferenceDetails;
