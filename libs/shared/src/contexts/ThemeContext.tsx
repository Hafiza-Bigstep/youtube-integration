import React, { createContext, useState } from 'react';

interface Language {
  code: string;
  name: string;
}
interface Theme {
  isDarkMode: boolean;
  mainLayout: string;
  theme: string;
  menu: string;
  layout: string;
  rtlClass: string;
  animation: string;
  navbar: string;
  locale: string;
  sidebar: boolean;
  pageTitle: string;
  languageList: Language[];
  semidark: boolean;
}

// Define your themes
const themes: { [key: string]: Theme } = {
  light: {
    isDarkMode: false,
    mainLayout: 'app',
    theme: 'light',
    menu: 'vertical',
    layout: 'full',
    rtlClass: 'ltr',
    animation: '',
    navbar: 'navbar-sticky',
    locale: 'en',
    sidebar: false,
    pageTitle: '',
    languageList: [
      { code: 'zh', name: 'Chinese' },
      { code: 'da', name: 'Danish' },
      { code: 'en', name: 'English' },
      { code: 'fr', name: 'French' },
      { code: 'de', name: 'German' },
      { code: 'el', name: 'Greek' },
      { code: 'hu', name: 'Hungarian' },
      { code: 'it', name: 'Italian' },
      { code: 'ja', name: 'Japanese' },
      { code: 'pl', name: 'Polish' },
      { code: 'pt', name: 'Portuguese' },
      { code: 'ru', name: 'Russian' },
      { code: 'es', name: 'Spanish' },
      { code: 'sv', name: 'Swedish' },
      { code: 'tr', name: 'Turkish' },
    ],
    semidark: false,
  },
  dark: {
    isDarkMode: true,
    mainLayout: 'app',
    theme: 'light',
    menu: 'vertical',
    layout: 'full',
    rtlClass: 'ltr',
    animation: '',
    navbar: 'navbar-sticky',
    locale: 'en',
    sidebar: false,
    pageTitle: '',
    languageList: [
      { code: 'zh', name: 'Chinese' },
      { code: 'da', name: 'Danish' },
      { code: 'en', name: 'English' },
      { code: 'fr', name: 'French' },
      { code: 'de', name: 'German' },
      { code: 'el', name: 'Greek' },
      { code: 'hu', name: 'Hungarian' },
      { code: 'it', name: 'Italian' },
      { code: 'ja', name: 'Japanese' },
      { code: 'pl', name: 'Polish' },
      { code: 'pt', name: 'Portuguese' },
      { code: 'ru', name: 'Russian' },
      { code: 'es', name: 'Spanish' },
      { code: 'sv', name: 'Swedish' },
      { code: 'tr', name: 'Turkish' },
    ],
    semidark: false,
  },
};

// Define context type
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// Create a context object with initial values
const ThemeContext = createContext<ThemeContextType>({
  theme: themes.light,
  toggleTheme: () => {
    console.warn('toggleTheme function not yet initialized');
  },
});

// Theme provider component
const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentTheme, setCurrentTheme] = useState<string>('light');

  // Function to toggle between themes
  const toggleTheme = () => {
    setCurrentTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Value object to pass into context provider
  const value: ThemeContextType = {
    theme: themes[currentTheme],
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext, ThemeContextType, Theme };
export default ThemeProvider;
