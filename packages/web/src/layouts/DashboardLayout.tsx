import React from 'react';

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div>
      <header>Dashboard Layout Header</header>
      <main>{children}</main>
      <footer>Dashboard Layout Footer</footer>
    </div>
  );
};

export default DashboardLayout;
