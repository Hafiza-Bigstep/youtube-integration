import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';

import NavItem from '../NavItem/NavItem';

type RouteProps = {
  route: string;
  name: string;
  icon?: string;
};
type Props = {
  className?: string;
  style?: React.CSSProperties;
  routes: RouteProps[];
  iconSize: number;
};

export function NavLinks({ className, style, routes, iconSize }: Props) {
  const { t } = useTranslation();
  const [selectedMenu, setSelectedMenu] = useState<RouteProps>({
    name: '',
    route: '',
  });

  const [hoveMenu, setHoverMenu] = useState<RouteProps>({
    name: '',
    route: '',
  });

  return (
    <div className="sidebar">
      <ul className="relative p-4 md:p-2 py-0 font-semibold">
        {routes.map(route => (
          <li
            key={route.name}
            className={`nav-item ${
              selectedMenu.name === route.name ? 'active bg-[#F4EDFF] px-8' : ''
            }, mb-0`}
            onClick={() => setSelectedMenu(route)}
            onMouseEnter={() => setHoverMenu(route)}
            onMouseLeave={() => setHoverMenu({ name: '', route: '' })}
          >
            <NavItem
              key={route.route}
              href={route.route}
              iconHeight={iconSize}
              iconWidth={iconSize}
              iconName={route.icon}
              isActive={
                selectedMenu.name === route.name || hoveMenu.name === route.name
              }
            >
              {t(route.name)}
            </NavItem>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NavLinks;
