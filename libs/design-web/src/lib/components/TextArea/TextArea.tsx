import React, { forwardRef, ChangeEvent } from 'react';
import styles from './TextArea.module.scss';

export interface TextAreaProps {
  id: string;
  label: string;
  fieldName?: string;
  value: string;
  onChange: (value: string, fieldName?: string) => void;
  placeholder?: string;
  className?: string;
  maxLength?: number;
  rows?: number;
  disabled?: boolean;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      id,
      label,
      fieldName,
      value,
      onChange,
      placeholder = '',
      className = '',
      maxLength,
      rows = 4,
      disabled = false,
    },
    ref
  ) => {
    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e.target.value, fieldName);
    };

    return (
      <div className={styles.TextAreaWrapper}>
        <label htmlFor={fieldName || label} className={styles.TextAreaLabel}>
          {label}
        </label>
        <textarea
          ref={ref}
          id={fieldName || label}
          className={`${styles.TextArea} ${className}`}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          maxLength={maxLength}
          rows={rows}
          disabled={disabled}
        />
      </div>
    );
  }
);

export default TextArea;
