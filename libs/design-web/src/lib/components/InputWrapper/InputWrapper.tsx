import React, { FC, InputHTMLAttributes } from 'react';

import cx from 'classnames';

import styles from './InputWrapper.module.scss';

interface InputWrapperProps extends InputHTMLAttributes<HTMLInputElement> {
  children: React.ReactNode;
  id?: string;
  label?: string;
  className?: string;
  isRequired?: boolean;
}

const requiredFieldAsteriskSymbol = '*';

const InputWrapper: FC<InputWrapperProps> = ({
  children,
  id,
  label,
  className,
  isRequired,
  ...rest
}) => {
  return (
    <div className={cx(styles.InputWrapper, className)} {...rest}>
      {label && (
        <label className={styles.InputLabel} htmlFor={id}>
          {label}
          {isRequired && (
            <span className={styles.InputLabelRequiredAsterisk}>
              {requiredFieldAsteriskSymbol}
            </span>
          )}
        </label>
      )}
      {children}
    </div>
  );
};

export default InputWrapper;
