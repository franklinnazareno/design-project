import { createContext, useReducer } from 'react'

export const PreferencesContext = createContext()

export const preferencesReducer = (state, action) => {
    switch (action.type) {
        case 'SET_PREFERENCES':
            return {
                preferences: action.payload
            }
        default:
            return state
    }
}

export const PreferencesContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(preferencesReducer, {
        preferences: null
    })

    return (
        <PreferencesContext.Provider value={{ ...state, dispatch }}>
            { children }
        </PreferencesContext.Provider>
    )
}