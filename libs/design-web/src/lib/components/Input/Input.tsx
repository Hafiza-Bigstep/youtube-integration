import React, {
  useImperativeHandle,
  forwardRef,
  useRef,
  FocusEventHandler,
  ChangeEvent,
} from 'react';

import styles from './Input.module.scss';

export type InputProps = {
  /** Function that returns value and field name  */
  onChange: (value: string, fieldname: string) => void;
  /** If exist on pressing enter will execute onSubmit func  */
  onSubmit?: () => void;
  /** Event when input is unfocused */
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onFocus?: (e: any) => void;
  onClear?: () => void;
  onKeyPress?: (e: any) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
  inputClassName?: string;
  inputWrapperClassName?: string;
  /** Make input expand as much as parent container  */
  maxExpand?: boolean;
  className?: string;
  /** Identifier  */
  fieldName?: string;
  value: string | number | null | undefined;
  /** extra input props like type, etc.  */
  input?: React.HTMLProps<HTMLInputElement>;
  /** Label will be shown above input field  */
  label?: string;
  /** Error array of string. Will show all errors below the field.  */
  error?: string[] | null;
  /** Icon will be placed on the right side  */
  iconRight?: boolean;
  /** Icon name  */
  icon?: string;
  iconType?: 'fal' | 'far' | 'fab';
  type?: 'text' | 'email' | 'password' | 'number' | 'tel';
  placeholder?: string;
  disabled?: boolean;
  success?: string | boolean | null;
  showSuccess?: boolean;
  showClear?: boolean;
  maxLength?: number;
  minLength?: number;
  showLengthIndicator?: boolean;
  /* min and max are legacy props */
  min?: number;
  max?: number;
  autoComplete?: boolean;
  dataCy?: string;
  helperText?: string;
  boldBorder?: boolean;
  ariaLabel?: string;
  readOnly?: boolean;
  fixedLabel?: boolean;
  rightText?: string;
  autoFocus?: boolean;
  isRequired?: boolean;
  validation?: {
    required?: string;
    minLength?: { value: number; message: string };
    maxLength?: { value: number; message: string };
    pattern?: { value: RegExp; message: string };
  };
};

const Input = forwardRef(
  (
    {
      className,
      error,
      label,
      fieldName,
      maxExpand,
      placeholder = '',
      style = {},
      type = 'text',
      fixedLabel = false,
      isRequired,
      value,
      onChange,
    }: InputProps,
    ref: any
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
      focus: () => {
        if (inputRef?.current) {
          inputRef.current.focus();
        }
      },
      blur: () => {
        if (inputRef?.current) {
          inputRef.current.blur();
        }
      },
    }));

    /* State management */
    const hasError = Array.isArray(error) && error.length > 0;

    const requiredFieldAsteriskSymbol = '*';

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
      onChange(e.target.value, fieldName || '');
    }

    return (
      <>
        <label htmlFor={label} className={styles.InputLabel}>
          {label}
          {isRequired && (
            <span className={styles.InputLabelRequiredAstrisk}>
              {requiredFieldAsteriskSymbol}
            </span>
          )}
        </label>
        <div className={styles.InputWrapper}>
          <input
            id={label}
            placeholder={placeholder}
            type={type}
            className="form-input border-2 focus:border-primary"
            value={value ? value : ''}
            onChange={handleChange}
          />
        </div>
      </>
    );
  }
);

export default Input;
