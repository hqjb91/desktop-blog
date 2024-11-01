'use client';

import MenuItems from "./MenuItems";
import MenuTile from "./MenuTile";
import SearchBar from "./SearchBar";
import TaskPanel from "../TaskPanel";
import WeatherComponent from "./WeatherComponent";
import NotificationComponent from "./NotificationComponent";
import { useRef, useState } from "react";
import useSearch from "../../hooks";

export type MenuItem = {
  title: string;
  icon: string;
  url: string;
  submenu?: MenuItem[];
};

export type MenuItemsData = MenuItem[];

const TaskBar = () => {
  const menuItemsData: MenuItemsData = [
    {
      title: "Blog",
      icon: "./book.svg",
      url: "/blog",
    },
    {
      title: "About",
      icon: "./about.svg",
      url: "/about",
      submenu: [
        {
          title: "Contact Us",
          icon: "./contact.svg",
          url: "/contact",
        },
        {
          title: "Portfolio",
          icon: "./portfolio.svg",
          url: "/portfolio",
        },
      ],
    },
  ];

  const [taskPanelActive, setTaskPanelActive] = useState(false);
  const handleSearchPanelFocus = () => {
    setTaskPanelActive(true);
  }
  const searchBarRef = useRef<HTMLInputElement | null>(null);

  const { searchTerm, handleInputChange } = useSearch();

  return (
    <>
      <TaskPanel searchBarRef={searchBarRef} active={taskPanelActive} setTaskPanelActive={setTaskPanelActive} searchTerm={searchTerm} />
      <nav className="flex flex-row justify-between items-center fixed bottom-0 w-full h-14 bg-black opacity-80 backdrop-blur-md text-white">
        <WeatherComponent />
        <ul className="flex flex-row justify-center items-center gap-2">
          <MenuTile icon="./home.svg" title="Home" />

          <div className="search-bar" onClick={handleSearchPanelFocus}>
            <SearchBar searchBarRef={searchBarRef} handleInputChange={handleInputChange} />
          </div>

          {menuItemsData.map((menuItem, index) => (
            <MenuItems items={menuItem} key={index} />
          ))}
        </ul>
        <NotificationComponent />
      </nav>
    </>
  );
};

export default TaskBar;
