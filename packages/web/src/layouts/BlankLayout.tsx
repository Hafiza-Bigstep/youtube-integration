import React from 'react';
import BaseLayout from './BaseLayout';

const BlankLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <BaseLayout>
      <div className="text-black dark:text-white-dark h-screen">
        {/* Change min-h-screen to h-screen */}
        {children}
      </div>
    </BaseLayout>
  );
};

export default BlankLayout;
