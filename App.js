import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppRoutes from './AppRoutes';
import AuthContext from './services/AuthContext'; 

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false); // Add a state hook for the authentication status
  const [screens, setScreens] = useState([]);
  
  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthenticated, screens, setScreens }}> 
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default App;