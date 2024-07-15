import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/App';
import ErrorBoundary from './components/ErrorBoundary';

import 'react-perfect-scrollbar/dist/css/styles.css';
import './styles.scss';
import './assets/css/tailwind.css';
import '@mantine/core/styles.layer.css';
import 'mantine-datatable/styles.layer.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
