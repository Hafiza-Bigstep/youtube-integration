import React, { Suspense, useEffect, useState } from 'react';
import BaseLayout from './BaseLayout';
import { useTheme } from 'shared/hooks/useTheme';
import Footer from './Footer';
import { useAuth } from 'shared/hooks/useAuth';
import Sidebar from './Sidebar';
import Loader from '../components/Loader';
import { Button, Icon } from 'design-web';

const DefaultLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { theme } = useTheme();
  const { isAuthenticated, isLoading } = useAuth();

  const [showTopButton, setShowTopButton] = useState(false);

  const onScrollHandler = () => {
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      setShowTopButton(true);
    } else {
      setShowTopButton(false);
    }
  };

  const goToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  useEffect(() => {
    window.addEventListener('scroll', onScrollHandler);

    return () => {
      window.removeEventListener('onscroll', onScrollHandler);
    };
  });

  return (
    <BaseLayout>
      {/* BEGIN MAIN CONTAINER */}
      <div className="relative">
        {/* screen loader */}
        {isLoading && (
          <div className="screen_loader fixed inset-0 bg-[#fafafa] dark:bg-[#060818] z-[60] grid place-content-center animate__animated">
            <Loader />
          </div>
        )}
        <div className="fixed bottom-6 ltr:right-6 rtl:left-6 z-50">
          {showTopButton && (
            <Button
              type="button"
              className="btn btn-outline-primary rounded-full p-2 animate-pulse bg-[#fafafa] dark:bg-[#060818] dark:hover:bg-primary"
              onClick={goToTop}
            >
              <Icon name="ArrowUp" height={24} width={24} className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* BEGIN APP SETTING LAUNCHER */}
        {/* <Setting /> */}
        {/* END APP SETTING LAUNCHER */}

        <div
          className={`${theme.navbar} main-container text-black dark:text-white-dark min-h-screen flex`}
        >
          {/* BEGIN SIDEBAR */}
          <Sidebar />
          {/* END SIDEBAR */}

          <div className="main-content flex flex-col min-h-screen w-full">
            {/* BEGIN TOP NAVBAR */}
            {/* <Header /> */}
            {/* END TOP NAVBAR */}

            {/* BEGIN CONTENT AREA */}
            <Suspense>
              <div className={`${theme.animation} p-6 animate__animated`}>
                {children}
              </div>
            </Suspense>
            {/* END CONTENT AREA */}
          </div>
        </div>
        {/* BEGIN FOOTER */}
        <Footer />
        {/* END FOOTER */}
      </div>
    </BaseLayout>
  );
};

export default DefaultLayout;
