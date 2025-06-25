import React, { createContext, useContext, useReducer, ReactNode } from 'react';

const initialState = {
  user: {
    name: '',
    age: 0,
    gender: '',
    bloodType: '',
    allergies: [],
    conditions: []
  },
  medications: [],
  vitals: [],
  symptoms: [],
  emergencyContacts: []
};

const healthReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_USER':
      return { ...state, user: { ...state.user, ...action.payload } };
    case 'ADD_MEDICATION':
      return { ...state, medications: [...state.medications, action.payload] };
    case 'REMOVE_MEDICATION':
      return { ...state, medications: state.medications.filter(med => med.id !== action.payload) };
    case 'ADD_VITAL':
      return { ...state, vitals: [...state.vitals, action.payload] };
    case 'ADD_SYMPTOM_LOG':
      return { ...state, symptoms: [...state.symptoms, action.payload] };
    case 'ADD_EMERGENCY_CONTACT':
      return { ...state, emergencyContacts: [...state.emergencyContacts, action.payload] };
    case 'REMOVE_EMERGENCY_CONTACT':
      return { ...state, emergencyContacts: state.emergencyContacts.filter(contact => contact.id !== action.payload) };
    case 'LOAD_DATA':
      return action.payload;
    default:
      return state;
  }
};

const HealthContext = createContext(null);

export const HealthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(healthReducer, initialState);

  // Load data from localStorage on mount
  React.useEffect(() => {
    const savedData = localStorage.getItem('healthData');
    if (savedData) {
      dispatch({ type: 'LOAD_DATA', payload: JSON.parse(savedData) });
    }
  }, []);

  // Save data to localStorage whenever state changes
  React.useEffect(() => {
    localStorage.setItem('healthData', JSON.stringify(state));
  }, [state]);

  return (
    <HealthContext.Provider value={{ state, dispatch }}>
      {children}
    </HealthContext.Provider>
  );
};

export const useHealth = () => {
  const context = useContext(HealthContext);
  if (!context) {
    throw new Error('useHealth must be used within a HealthProvider');
  }
  return context;
};