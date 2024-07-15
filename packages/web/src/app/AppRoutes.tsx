import { ReactElement } from 'react';
import routes from 'shared/config/routes';
import { RouteObject } from 'react-router-dom';

import LayoutWrapper from '../components/LayoutWrapper';
import Login from '../pages/login';
import ForgotPassword from '../pages/forgotPassword';
import VerifyAccount from '../pages/verifyAccount';
import PrivateRoute from './PrivateRoute';
import SignUpPage from '../pages/signup';
import Home from '../pages/home';
import Logout from '../pages/logout';
interface BaseRoute {
  path: string;
  element: ReactElement;
  layout?: string;
  children?: BaseRoute[];
}
interface AuthRoute extends BaseRoute {
  path: string;
  layout?: undefined;
}

type AppRoute = BaseRoute | AuthRoute;

const defaultRoutes: AppRoute[] = [
  {
    path: '/',
    element: <PrivateRoute />,
    layout: 'DefaultLayout',
    children: [
      {
        path: routes.home,
        element: <Home />,
      },
    ],
  },
  {
    path: routes.login,
    element: <Login />,
    layout: 'BlankLayout',
  },
  {
    path: routes.forgotpassword,
    element: <ForgotPassword />,
    layout: 'BlankLayout',
  },
  {
    path: routes.verifyaccount,
    element: <VerifyAccount />,
    layout: 'BlankLayout',
  },
  {
    path: routes.singup,
    element: <SignUpPage />,
    layout: 'BlankLayout',
  },
  {
    path: routes.logout,
    element: <Logout />,
    layout: 'BlankLayout',
  },
];

const transformRoutes = (routes: AppRoute[]): RouteObject[] => {
  return routes.map(route => {
    const { path, element, layout, children } = route;
    return {
      path,
      element: layout ? (
        <LayoutWrapper layout={layout}>{element}</LayoutWrapper>
      ) : (
        element
      ),
      children: children ? transformRoutes(children) : undefined,
    };
  });
};

export const appRoutes = transformRoutes(defaultRoutes);
