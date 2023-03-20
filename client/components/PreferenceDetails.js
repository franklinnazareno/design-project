import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';

const PreferenceDetails = ({ preference }) => {
  const [preferences, setPreferences] = useState(preference.preferences);

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

  const handleSavePreferences = () => {
    // handle saving here
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
            minimumValue={1}
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
