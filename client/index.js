/**
 * @format
 */

import React from 'react'
import {AppRegistry} from 'react-native';
import App from './App';
import { PreferencesContextProvider } from './context/PreferencesContext';
import { AuthContextProvider } from './context/AuthContext';
import { LocationProvider } from './context/LocationContext';
import {name as appName} from './app.json';

const MyApp = () => {
    return (
        <AuthContextProvider>
            <PreferencesContextProvider>
                <LocationProvider>
                    <App />
                </LocationProvider>
            </PreferencesContextProvider>
        </AuthContextProvider>
    )
}

AppRegistry.registerComponent(appName, () => MyApp);
