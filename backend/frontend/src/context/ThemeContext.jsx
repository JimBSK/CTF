import React, { createContext, useState, useContext, useMemo } from 'react';
import { createTheme } from '@mui/material/styles';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState('light');

  const toggleTheme = () => {
    setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            // Light theme colors
            primary: { main: '#1976d2' },
            background: {
              default: '#f5f5f5',
              paper: '#ffffff',
              cardBackground: '#ffffff'
            },
            text: {
              primary: '#121212',
              secondary: '#6d6d6d'
            }
          }
        : {
            // Dark theme colors
            primary: { main: '#90caf9' },
            background: {
              default: '#121212',
              paper: '#1e1e1e',
              cardBackground: '#2d2d2d'
            },
            text: {
              primary: '#ffffff',
              secondary: '#b0b0b0'
            },
            chart: {
              textColor: '#ffffff',
              gridColor: 'rgba(255, 255, 255, 0.1)'
            }
          }),
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            transition: 'all 0.3s ease'
          }
        }
      }
    }
  }), [mode]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);