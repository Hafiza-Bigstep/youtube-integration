import React from 'react';
import Providers from './Providers';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { appRoutes } from './AppRoutes';
import Storage, { StorageProvider } from 'shared/helpers/Storage';

const Routes: React.FC = () => {
  const routing = useRoutes(appRoutes);
  return routing;
};

function withProviders(Component: any) {
  const myStorage: StorageProvider = {
    getItem: async (key: string | null) => {
      const data = localStorage.getItem(key as string);
      return data;
    },
    setItem: (key: string, value: string) => {
      localStorage.setItem(key, value);
      return Promise.resolve(true);
    },
    removeItem: (key: string) => {
      localStorage.removeItem(key);
      return Promise.resolve();
    },
    clear: () => {
      localStorage.clear();
      return Promise.resolve();
    },
  };

  Storage.setProvider(myStorage);

  return function (props: any) {
    return (
      <Providers>
        <Component {...props} />
      </Providers>
    );
  };
}

export default withProviders(function App() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
});
