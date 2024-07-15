import React from 'react';

const Footer: React.FC = () => {
  return (
    <div className="dark:text-white-dark text-center ltr:sm:text-center rtl:sm:text-center mx-auto">
      © {new Date().getFullYear()}. BigStepTech All Rights are Reserved.
    </div>
  );
};

export default Footer;
