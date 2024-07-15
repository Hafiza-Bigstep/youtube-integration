import React from 'react';

import { useState, useRef, ReactNode } from 'react';

import styles from './Dropdown.module.scss';

interface DropdownOptionProps {
  value: string;
  label: string;
}

interface DropdownProps {
  label?: string; // Make label prop optional
  children?: ReactNode; // Make children prop optional
  options: DropdownOptionProps[];
  onSelect: (selectedOption: DropdownOptionProps) => void;
  offset?: number[]; // Assuming offset should be of type number[]
  placement: string;
  btnClassName?: string;
  isRequired?: boolean;
}

const requiredFieldAsteriskSymbol = '*';

const Dropdown: React.FC<DropdownProps> = ({
  options,
  onSelect,
  label,
  isRequired = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: DropdownOptionProps) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      dropdownRef.current?.focus();
    } else if (e.key === 'Enter') {
      setIsOpen(!isOpen);
    }
  };

  return (
    <>
      <div>
        <label htmlFor={label} className={styles.DropdownLabel}>
          {label}
          {isRequired && (
            <span className={styles.DropdownLabelRequiredAsterisk}>
              {requiredFieldAsteriskSymbol}
            </span>
          )}
        </label>
      </div>
      <div className="relative inline-block text-left" ref={dropdownRef}>
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={toggleDropdown}
            onKeyDown={handleKeyDown}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
          >
            {selectedOption.label}
            <svg
              width="14"
              height="9"
              viewBox="0 0 14 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg "
              className="ml-2 mt-2"
            >
              <path
                d="M12.0416 0.412143L6.99994 5.45381L1.95828 0.412143L0.662109 1.70831L6.99994 8.04614L13.3378 1.70831L12.0416 0.412143Z"
                fill="#515151"
              />
            </svg>
          </button>
        </div>

        {isOpen && (
          <div
            className="absolute z-50 mt-2 w-full rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="listbox"
            aria-labelledby="options-menu"
          >
            {options.map(option => (
              <button
                key={option.value}
                onClick={() => handleOptionSelect(option)}
                className={`${
                  selectedOption === option
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-700'
                } block w-full px-3 py-2 text-left text-sm`}
                role="option"
                aria-selected={selectedOption === option}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Dropdown;
