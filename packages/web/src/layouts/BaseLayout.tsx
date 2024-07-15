import React from 'react';
import { useTheme } from 'shared/hooks/useTheme';

const BaseLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useTheme();
  const themeClass = [
    (theme.sidebar && 'toggle-sidebar') || '',
    theme.menu,
    theme.layout,
    theme.rtlClass,
    'main-section',
    'antialiased',
    'relative',
    'font-nunito',
    'text-sm',
    'font-normal',
  ];

  return <div className={themeClass.join(' ')}>{children}</div>;
};

export default BaseLayout;
