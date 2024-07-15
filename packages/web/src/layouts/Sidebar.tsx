// Import necessary modules and components
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';

import 'react-perfect-scrollbar/dist/css/styles.css';
import moreImage from '../assets/images/more.svg';

import { Button, Link, NavLinks, Image } from 'design-web';
import routes from 'shared/config/routes';
import IMAGES from 'shared/config/images';

// Define navigation items
const navItems = [{ name: 'Home', route: routes.home }];

const BottomNavItems = [
  { name: 'Help', route: routes.help },
  { name: 'Setting', route: routes.setting },
  { name: 'Logout', route: routes.logout },
];

// Define Sidebar component
const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const [showOptions, setshowOptions] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = async () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleOnClick = (item: any) => {
    if (item.name == 'Logout') {
      handleLogout();
    }
    handleNavItemClick(item);
  };

  const handleNavItemClick = (item: any) => {
    setActiveItem(item.itemName);
    if (!item.isExternal) {
      setActiveItem(item.href);
      setIsSidebarOpen(false); // Close the sidebar on navigation
    } else {
      window.open(item.href, '_blank');
    }
  };

  return (
    <div>
      <div className="lg:hidden bg-white p-4">
        <Button type="button" className="text-2xl" onClick={toggleSidebar}>
          ☰
        </Button>
      </div>

      <div className={`sidebar ${isSidebarOpen ? 'open' : ''} w-[260px]`}>
        <div className="h-full bg-white dark:bg-black">
          <div className="flex items-left justify-left py-5">
            <Link
              href={routes.home}
              className="main-logo flex items-center justify-center"
            >
              <Image
                className="ml-[5px] w-[40px]"
                src={IMAGES.NO_IMAGE}
                alt="logo"
                height={65}
                width={54}
              />
            </Link>
          </div>
          <PerfectScrollbar className="relative h-[calc(100vh-80px)]">
            <div className="flex h-full flex-col justify-between">
              <NavLinks key={'Main'} routes={navItems} iconSize={16} />
              <div
                className="flex w-full cursor-pointer items-center justify-between border-t-2 px-1 py-3 my-2"
                onClick={() => setshowOptions(!showOptions)}
              >
                <div className="flex items-center justify-center gap-2">
                  <img
                    src={IMAGES.NO_USER}
                    width={40}
                    height={40}
                    alt="userprofile_logo"
                    className="rounded-full h-[40px] object-cover"
                  />
                  <span className="text-base font-semibold hidden lg:inline text-gray">
                    {'John Doe'}
                  </span>
                </div>

                <Image src={moreImage} width={3} height={3} alt="more"></Image>
                {showOptions && (
                  <div
                    className={`absolute bottom-20 ${
                      isSidebarOpen ? 'w-[80%]' : 'w-[95%]'
                    } rounded-lg border bg-white  py-4 px-5`}
                    style={{
                      filter: 'drop-shadow(0 0px 25px rgba(0, 0, 0, 0.15))',
                    }}
                  >
                    <NavLinks
                      key={'Bottom'}
                      routes={BottomNavItems}
                      iconSize={16}
                    />
                  </div>
                )}
              </div>
            </div>
          </PerfectScrollbar>
        </div>
      </div>
      {isSidebarOpen && (
        <div className="overlay open" onClick={toggleSidebar}></div>
      )}
    </div>
  );
};

export default Sidebar;
