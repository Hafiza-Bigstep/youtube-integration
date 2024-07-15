import { ReactElement } from 'react';

export interface BaseRoute {
  path: string;
  element: ReactElement;
  layout?: string;
}

export interface AuthRoute extends BaseRoute {
  path: '/login';
  layout?: undefined;
}

export type AppRoute = BaseRoute | AuthRoute;
