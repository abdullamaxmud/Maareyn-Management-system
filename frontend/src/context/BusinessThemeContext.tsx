/* oxlint-disable react/only-export-components */
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type Theme = 'light' | 'dark';
interface BusinessThemeContextValue { theme: Theme; setTheme: (theme: Theme) => void; }
const BusinessThemeContext = createContext<BusinessThemeContextValue | null>(null);

export const BusinessThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const key = 'maraayn_app_theme';
  const [theme, setThemeState] = useState<Theme>(() => localStorage.getItem(key) === 'dark' ? 'dark' : 'light');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.dataset.businessTheme = theme;
    return () => {
      document.documentElement.classList.remove('dark');
      delete document.documentElement.dataset.businessTheme;
    };
  }, [theme]);

  const setTheme = (nextTheme: Theme) => {
    localStorage.setItem(key, nextTheme);
    setThemeState(nextTheme);
  };

  const value = useMemo(() => ({ theme, setTheme }), [theme]);
  return <BusinessThemeContext.Provider value={value}>{children}</BusinessThemeContext.Provider>;
};

export const useBusinessTheme = () => {
  const context = useContext(BusinessThemeContext);
  if (!context) throw new Error('useBusinessTheme must be used within BusinessThemeProvider');
  return context;
};
