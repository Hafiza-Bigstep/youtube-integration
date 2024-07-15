import React, { useState } from 'react';

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (isChecked: boolean) => void;
  label: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  checked,
  onChange,
  label,
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(checked);

  const handleOnChange = () => {
    setIsChecked(!isChecked);
    onChange(isChecked);
  };

  return (
    <div className="m-1 flex h-[60px] w-full items-center justify-between rounded-xl bg-purple-BGCOLOR">
      <span className="ml-4 text-sm  font-normal">{label}</span>
      <span className="relative mr-4 h-6 w-12">
        <input
          type="checkbox"
          className="custom_switch peer absolute h-full w-full cursor-pointer opacity-0"
          checked={isChecked}
          onChange={handleOnChange}
        />
        <span className="block h-full rounded-full bg-[#EBEDF2] before:absolute before:bottom-1 before:left-1 before:h-4 before:w-4 before:rounded-full before:bg-white before:transition-all before:duration-300 peer-checked:bg-primary peer-checked:before:left-7 dark:bg-dark dark:before:bg-white-dark dark:peer-checked:before:bg-white"></span>
      </span>
    </div>
  );
};

export default ToggleSwitch;
