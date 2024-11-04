"use client";

import MenuItems from "./MenuItems";
import SearchBar from "./SearchBar";
import TaskPanel from "../TaskPanel";
import NotificationComponent from "./NotificationComponent";
import { useRef, useState } from "react";
import useSearch from "../../hooks";
import Image from "next/image";
import HomeTile from "./HomeTile";
import CarouselComponent from "./Carousel/CarouselComponent";
import { CloudSun } from "lucide-react";
import CarouselItem from "./Carousel/CarouselItem";

export type MenuItem = {
  title: string;
  icon: string;
  url: string;
  submenu?: MenuItem[];
};

export type MenuItemsData = MenuItem[];

export type TaskBarProps = {
  onItemClick: (appName: string) => void;
  activeApp: string;
  apps: string[];
};

const TaskBar = ({ onItemClick, activeApp }: TaskBarProps) => {
  const menuItemsData: MenuItemsData = [
    {
      title: "Blog",
      icon: "./book.svg",
      url: "blog",
    },
    {
      title: "About",
      icon: "./about.svg",
      url: "about",
      submenu: [
        {
          title: "Contact Us",
          icon: "./contact.svg",
          url: "contact",
        },
        {
          title: "Portfolio",
          icon: "./portfolio.svg",
          url: "portfolio",
        },
      ],
    },
  ];

  const [taskPanelActive, setTaskPanelActive] = useState(false);
  const handleSearchPanelFocus = () => {
    setTaskPanelActive(true);
  };

  const searchBarRef = useRef<HTMLInputElement | null>(null);

  const { searchTerm, handleInputChange } = useSearch();

  const handleItemClick = (path: string) => {
    onItemClick(path);
  };

  const carouselItems = [
    <CarouselItem
      icon={<CloudSun className="w-4 h-4 text-yellow-300" />}
      title="27°C"
      subtitle="Always Sunny"
      key={1}
    />,
    <CarouselItem
      icon={<CloudSun className="w-4 h-4 text-yellow-300" />}
      title="27°C"
      subtitle="In Philadelphia"
      key={2}
    />,
  ];

  return (
    <>
      <TaskPanel
        searchBarRef={searchBarRef}
        active={taskPanelActive}
        setTaskPanelActive={setTaskPanelActive}
        searchTerm={searchTerm}
      />
      <nav className="flex flex-row lg:justify-between justify-center items-center fixed bottom-0 w-full h-14 bg-black opacity-80 backdrop-blur-md text-white">
        <CarouselComponent items={carouselItems} interval={20000} />
        <ul className="flex flex-row justify-center items-center gap-2 -ml-8">
          <HomeTile icon="./home.svg" title="Home" />

          <div className="search-bar" onClick={handleSearchPanelFocus}>
            <SearchBar
              searchBarRef={searchBarRef}
              handleInputChange={handleInputChange}
            />
          </div>

          {menuItemsData.map((menuItem, index) =>
            menuItem.submenu ? (
              <div className="relative group" key={index}>
                <div className="absolute bottom-[100%] lg:-left-[100%] right-[0%] bg-black/80 p-3 m-3 rounded-lg min-w-48 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300">
                  {menuItem.submenu.map((submenuItem, index) => (
                    <div
                      key={index}
                      className="flex flex-row p-3 items-center hover:bg-white/10 rounded-md cursor-pointer"
                      onClick={() => handleItemClick(submenuItem.url)}
                    >
                      <Image
                        src={submenuItem.icon}
                        alt={submenuItem.title}
                        width={20}
                        height={20}
                      />
                      <div className="ml-3 text-white">{submenuItem.title}</div>
                    </div>
                  ))}
                </div>

                <MenuItems items={menuItem} activeApp={activeApp} />
              </div>
            ) : (
              <div onClick={() => handleItemClick(menuItem.url)} key={index}>
                <MenuItems items={menuItem} activeApp={activeApp} />
              </div>
            )
          )}
        </ul>
        <NotificationComponent />
      </nav>
    </>
  );
};

export default TaskBar;
