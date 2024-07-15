import React, { useState } from 'react';

type CheckboxProps = {
  label: string;
  value: boolean;
  className?: string;
  onChange: (value: boolean) => void;
};

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  value,
  className,
  onChange,
}) => {
  const onChangeHandler = (e: any) => {
    onChange(e.target.checked);
  };

  return (
    <>
      <input
        type="checkbox"
        checked={value}
        onChange={onChangeHandler}
        className="border-3 form-checkbox h-3.5 w-3.5 bg-white"
      />
      <span className={className}>{label}</span>
    </>
  );
};

export default Checkbox;
