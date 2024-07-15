import { Tab } from '@headlessui/react';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import { useState } from 'react';

export interface TabProps {
  name: string;
  icon?: string;
  children: React.ReactNode;
  onClick?: (name: string) => void;
}

export interface TabsProps {
  className?: string;
  style?: React.CSSProperties;
  tabs: TabProps[];
}

export const Tabs: React.FC<TabsProps> = ({
  className,
  style,
  tabs,
}: TabsProps) => {
  const [hoveredTab, setHoveredTab] = useState<string>('');

  return (
    <div>
      <Tab.Group>
        <Tab.List className="mt-3 flex flex-wrap gap-x-5 md:gap-x-4 sm:gap-x-2 border-b font-bold border-white-light px-2 xs:px-0 sm:px-0 xs:pb-4 sm:pb-6 md:pb- lg:pb-0 pb-0 dark:border-[#191E3A]">
          {tabs.map((tab, index) => (
            <Tab key={`${tab.name}-${index}`}>
              {({ selected }) => (
                <div
                  key={tab.name}
                  onClick={() => tab.onClick && tab.onClick(tab.name)}
                  onMouseEnter={() => setHoveredTab(tab.name)}
                  onMouseLeave={() => setHoveredTab('')}
                  className={`${
                    selected
                      ? 'border-b !border-secondary text-secondary !outline-none'
                      : ''
                  } -mb-[1px] flex items-center border-transparent p-5 py-3 before:inline-block hover:border-b hover:!border-secondary hover:text-secondary`}
                >
                  {tab.icon && (
                    <Icon
                      name={tab.icon}
                      isHovered={selected || hoveredTab === tab.name}
                      height={16}
                      width={16}
                    />
                  )}
                  &nbsp;{tab.name}
                </div>
              )}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {tabs.map((tab, index) => (
            <Tab.Panel key={`${tab.name}-${index}`}>
              <div className="active pt-5">{tab.children}</div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default Tabs;
