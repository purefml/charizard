'use client';
import { FunctionComponent, PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import LIGHT_THEME from './light';
import MuiThemeProviderForNextJs from './MuiThemeProviderForNextJs';
import CssBaseline from '@mui/material/CssBaseline';


/**
 * Renders composition of Emotion's CacheProvider + MUI's ThemeProvider to wrap content of entire App
 * The Light or Dark themes applied depending on global .darkMode state
 * @component AppThemeProvider
 */
const AppThemeProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const theme = useMemo(() => createTheme(LIGHT_THEME), []);
  useEffect(() => setLoading(false), []); // Set .loading to false when the component is mounted

  if (loading) return null; // Don't render anything until the component is mounted

  return (
    <MuiThemeProviderForNextJs>
      <MuiThemeProvider theme={theme}>
        <CssBaseline /* MUI Styles */ />
        {children}
      </MuiThemeProvider>
    </MuiThemeProviderForNextJs>
  );
};

export default AppThemeProvider;
