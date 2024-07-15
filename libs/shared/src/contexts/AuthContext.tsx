import React, { createContext, useEffect, useState } from 'react';
import emitter, {
  EVENT_AUTH_TOKEN,
  EVENT_AUTH_TOKEN_INVALID,
  EVENT_LOGOUT,
} from '../helpers/emitter';
import Storage from '../helpers/Storage';
// Define context type
interface AuthContextType {
  authToken: string | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  route: string | null;
  isLoading: boolean;
  emitToken(authToken: string, route?: string): void;
  emitLogout(authToken?: string, route?: string): void;
}

// Create a context object with initial values
const AuthContext = createContext<AuthContextType>({
  authToken: null,
  isAuthenticated: false,
  isInitialized: false,
  isLoading: false,
  route: null,
  emitToken: (authToken: string, route?: string) => {},
  emitLogout: (authToken: string, route?: string) => {},
});

let instances = 0;

// Auth provider component
const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [route, setRoute] = useState<string | null>(null);

  // Value object to pass into context provider
  const value: AuthContextType = {
    isAuthenticated,
    authToken: authToken,
    isInitialized,
    isLoading,
    route,
    emitToken,
    emitLogout,
  };

  function emitToken(authToken: string, route?: string): void {
    emitter.emit(EVENT_AUTH_TOKEN, {
      authToken,
      route,
    });
  }

  function emitLogout(authToken?: string, route?: string): void {
    emitter.emit(EVENT_LOGOUT, {
      authToken,
      route,
    });
  }

  const validateToken = async () => {
    setIsLoading(true);
    // Validate token here
    setIsLoading(false);
  };

  async function onAuthTokenInvalid() {
    setAuthToken(null);
    await Storage.removeItem(Storage.AUTH_TOKEN);
  }

  async function onLogout({ authToken, route }: any) {
    onAuthTokenInvalid();
    setRoute(null);
    setIsAuthenticated(false);
    await Storage.clear();
  }

  async function onAuthToken({ authToken, route, resolve }: any) {
    await Storage.setItem(Storage.AUTH_TOKEN, authToken);
    setAuthToken(authToken);
    setIsAuthenticated(true);
    if (route) {
      setRoute(route);
    }

    // callback function used to have control over the execution flow
    if (resolve) {
      resolve();
    }
  }

  useEffect(() => {
    if (authToken && authToken.length > 0) {
      setIsAuthenticated(true);
    }
    validateToken();
  }, [authToken]);

  useEffect(() => {
    let cancel = false;

    emitter.addListener(EVENT_LOGOUT, onLogout);
    emitter.addListener(EVENT_AUTH_TOKEN_INVALID, onAuthTokenInvalid);
    emitter.addListener(EVENT_AUTH_TOKEN, onAuthToken);

    async function checkStorage() {
      try {
        const myToken = (await Storage.getItem(Storage.AUTH_TOKEN)) || null;

        if (cancel) {
          return;
        }
        setAuthToken(myToken);
        setIsInitialized(true);
        return;
      } catch (err) {
        // Tokens not found, no action required.
      }

      if (cancel) {
        return;
      }

      if (authToken) {
        await Storage.setItem(Storage.AUTH_TOKEN, authToken);

        if (cancel) {
          return;
        }

        setAuthToken(authToken);
      } else {
        setAuthToken(null);
      }

      setIsInitialized(true);
    }

    instances++;

    checkStorage();

    return () => {
      cancel = true;
      instances--;
      emitter.removeListener(EVENT_LOGOUT, onLogout);
      emitter.removeListener(EVENT_AUTH_TOKEN_INVALID, onAuthTokenInvalid);
      emitter.removeListener(EVENT_AUTH_TOKEN, onAuthToken);
    };
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider, AuthContextType };
export default AuthProvider;
