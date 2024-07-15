import React, { Suspense } from 'react';
import { ThemeProvider, UserProvider, AuthProvider } from 'shared/contexts';

import { MantineProvider } from '@mantine/core';

const Loading = () => <div>Loading...</div>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Providers({ children }: any) {
  return (
    <Suspense fallback={<Loading />}>
      <MantineProvider defaultColorScheme="light">
        <ThemeProvider>
          <UserProvider>
            <AuthProvider>{children}</AuthProvider>
          </UserProvider>
        </ThemeProvider>
      </MantineProvider>
    </Suspense>
  );
}
