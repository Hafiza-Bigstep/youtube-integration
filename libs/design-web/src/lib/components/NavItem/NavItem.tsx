import Link from '../Link/Link';
import Icon from '../Icon/Icon';
import { useEffect, useState } from 'react';

export interface NavItemProps {
  href: string;
  onClick?: () => void;
  iconName?: string;
  iconHeight?: number;
  iconWidth?: number;
  isActive?: boolean;
  children?: React.ReactNode;
}

export const NavItem = ({
  href,
  onClick,
  iconName,
  iconHeight,
  iconWidth,
  isActive,
  children,
}: NavItemProps) => {
  const [isSelected, setIsSelected] = useState(isActive);

  useEffect(() => {
    setIsSelected(isActive);
  }, [isActive]);

  return (
    <Link href={href} className="group" onClick={onClick}>
      <div className="flex items-center">
        {iconName && (
          <Icon
            name={iconName}
            height={iconHeight}
            width={iconWidth}
            isHovered={isSelected}
          />
        )}
        &nbsp;
        <span
          className={`hidden lg:inline text-[#717171] hover:text-primary dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3 ${
            isSelected ? 'text-primary' : ''
          } ${isSelected ? 'hovered-text' : ''}`}
        >
          {children}
        </span>
      </div>
    </Link>
  );
};

export default NavItem;
