import React from 'react';

interface AlertProps {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info' | 'default';
}

const Alert: React.FC<AlertProps> = ({ message, type }) => {
  let typeCss = 'text-primary bg-primary-light dark:bg-primary-dark-light';

  switch (type) {
    case 'success':
      typeCss = 'text-success bg-success-light dark:bg-success-dark-light';
      break;
    case 'error':
      typeCss = 'text-danger bg-danger-light dark:bg-danger-dark-light';
      break;
    case 'warning':
      typeCss = 'text-warning bg-warning-light dark:bg-warning-dark-light';
      break;
    case 'info':
      typeCss = 'text-info bg-info-light dark:bg-info-dark-light';
      break;
    case 'default':
      typeCss = 'text-primary bg-primary-light dark:bg-primary-dark-light';
      break;
    default:
      break;
  }

  return (
    <div className={`flex items-center p-3.5 rounded ${typeCss}`}>
      <span className="ltr:pr-2 rtl:pl-2">
        <strong className="ltr:mr-1 rtl:ml-1"></strong>
        {message}
      </span>
    </div>
  );
};

export default Alert;
