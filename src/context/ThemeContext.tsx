import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ThemeColors {
  bg: string;
  cardBg: string;
  text: string;
  border: string;
  highlight: string;
  highlightText: string;
  dimText: string;
  hoverBg: string;
  chartColors: {
    primary: string;
    secondary: string;
    grid: string;
  };
  peerColor: string;
  peer2Color: string;
  meanColor: string;
  benchmarkColor: string;
  percentile5Color: string;
  percentile95Color: string;
  featureTitleColor: string;
}

interface Theme {
  light: ThemeColors;
  dark: ThemeColors;
}

const theme: Theme = {
  light: {
    bg: '#F8FAFC',
    cardBg: '#ffffff',
    text: '#1E293B',
    border: '#CBD5E1',
    highlight: '#E0F2FE',
    highlightText: '#0284C7',
    dimText: '#64748B',
    hoverBg: '#F1F5F9',
    chartColors: {
      primary: '#0284C7',
      secondary: '#0F766E',
      grid: '#b0b0b0ff'
    },
    peerColor: '#14B8A6',
    peer2Color: '#3B82F6',
    meanColor: '#6366F1',
    benchmarkColor: '#7C3AED',
    percentile5Color: '#DC2626',
    percentile95Color: '#16A34A',
    featureTitleColor: '#1a1a1a'
  },
  dark: {
    bg: '#0A0F1F',
    cardBg: '#1E2A3A',
    text: '#A0AEC0',
    border: '#4A5568',
    highlight: '#2D3748',
    highlightText: '#CBD5E0',
    dimText: '#718096',
    hoverBg: '#374151',
    chartColors: {
      primary: '#039301',
      secondary: '#4A5568',
      grid: '#A0AEC0'
    },
    peerColor: '#039301',
    peer2Color: '#F7FAFC',
    meanColor: '#48BB78',
    benchmarkColor: '#9F7AEA',
    percentile5Color: '#DC2626',
    percentile95Color: '#16A34A',
    featureTitleColor: '#e0e0e0'
  }
};

interface ThemeContextType {
  currentTheme: 'light' | 'dark';
  toggleTheme: () => void;
  colors: ThemeColors;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    // Apply theme to document
    const colors = theme[currentTheme];
    const root = document.documentElement;
    
    // Set CSS custom properties
    root.style.setProperty('--bg-color', colors.bg);
    root.style.setProperty('--card-bg-color', colors.cardBg);
    root.style.setProperty('--text-color', colors.text);
    root.style.setProperty('--border-color', colors.border);
    root.style.setProperty('--highlight-color', colors.highlight);
    root.style.setProperty('--highlight-text-color', colors.highlightText);
    root.style.setProperty('--dim-text-color', colors.dimText);
    root.style.setProperty('--hover-bg-color', colors.hoverBg);
    root.style.setProperty('--chart-primary-color', colors.chartColors.primary);
    root.style.setProperty('--chart-secondary-color', colors.chartColors.secondary);
    root.style.setProperty('--chart-grid-color', colors.chartColors.grid);
    root.style.setProperty('--peer-color', colors.peerColor);
    root.style.setProperty('--peer2-color', colors.peer2Color);
    root.style.setProperty('--mean-color', colors.meanColor);
    root.style.setProperty('--benchmark-color', colors.benchmarkColor);
    root.style.setProperty('--percentile5-color', colors.percentile5Color);
    root.style.setProperty('--percentile95-color', colors.percentile95Color);
    root.style.setProperty('--feature-title-color', colors.featureTitleColor);
    
    // Save theme preference
    localStorage.setItem('theme', currentTheme);
  }, [currentTheme]);

  const toggleTheme = () => {
    setCurrentTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const value: ThemeContextType = {
    currentTheme,
    toggleTheme,
    colors: theme[currentTheme]
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};