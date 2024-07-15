import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Link: React.FC<LinkProps> = ({ href, children, className, onClick }) => {
  return (
    <RouterLink to={href} className={className} onClick={onClick}>
      {children}
    </RouterLink>
  );
};

export default Link;
