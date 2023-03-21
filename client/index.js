/**
 * @format
 */

import React from 'react'
import {AppRegistry} from 'react-native';
import App from './App';
import { PreferencesContextProvider } from './context/PreferencesContext';
import {name as appName} from './app.json';

const MyApp = () => {
    return (
        <PreferencesContextProvider>
            <App />
        </PreferencesContextProvider>
    )
}

AppRegistry.registerComponent(appName, () => MyApp);
