import { PreferencesContext } from "../context/PreferencesContext";
import { useContext } from 'react'

export const usePreferencesContext = () => {
    const context = useContext(PreferencesContext)

    if (!context) {
        throw Error('usePreferencesContext must be used inside a PreferencesContextProvider')
    }

    return context
}