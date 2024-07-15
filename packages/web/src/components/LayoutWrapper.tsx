import React from 'react';
import MainLayout from '../layouts/MainLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import BlankLayout from '../layouts/BlankLayout';
import DefaultLayout from '../layouts/DefaultLayout';

interface LayoutWrapperProps {
  layout: string;
  children: React.ReactNode;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ layout, children }) => {
  switch (layout) {
    case 'BlankLayout':
      return <BlankLayout>{children}</BlankLayout>;
    case 'MainLayout':
      return <MainLayout>{children}</MainLayout>;
    case 'DashboardLayout':
      return <DashboardLayout>{children}</DashboardLayout>;
    case 'DefaultLayout':
      return <DefaultLayout>{children}</DefaultLayout>;
    default:
      // eslint-disable-next-line react/jsx-no-useless-fragment
      return <>{children}</>;
  }
};

export default LayoutWrapper;
