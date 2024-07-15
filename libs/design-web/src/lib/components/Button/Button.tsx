import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className: string;
  type: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className,
  type,
}) => {
  return (
    <button onClick={onClick} type={type} className={className}>
      {children}
    </button>
  );
};

export default Button;
