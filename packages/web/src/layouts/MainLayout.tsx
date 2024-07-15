import React from 'react';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <header>Main Layout Header</header>
      <main>{children}</main>
      <footer>Main Layout Footer</footer>
    </div>
  );
};

export default MainLayout;
