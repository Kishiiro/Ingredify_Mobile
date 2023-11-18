import React from 'react';

const AuthContext = React.createContext({
  isAuthenticated: false, 
  setAuthenticated: () => {}, 
  screens: [], // Default state for screens is an empty array
  setScreens: () => {}, // Function to update the screens state
});

export default AuthContext;


