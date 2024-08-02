import React, { createContext, useContext, useState, useEffect } from 'react';
import { saveThemeToLocalStorage, loadThemeFromLocalStorage } from '../utils/localStorage';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = loadThemeFromLocalStorage();
    if (storedTheme !== null) {
      setIsDarkMode(storedTheme);
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      saveThemeToLocalStorage(newMode);
      return newMode;
    });
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
