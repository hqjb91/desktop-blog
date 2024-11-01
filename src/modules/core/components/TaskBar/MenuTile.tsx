"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import clsx from "clsx";

export type MenuTileProps = {
  icon: string;
  title: string;
};

const MenuTile = ({ icon, title }: MenuTileProps) => {
  const [active, setActive] = useState(false);
  const [mouseDown, setMouseDown] = useState(false);

  const handleClick = () => {
    setActive((prev) => !prev);
  };

  const handleMouseDown = () => {
    setMouseDown((prev) => true);
  };

  const handleMouseUp = () => {
    setMouseDown((prev) => false);
  };

  return (
    <div
      className={clsx(
        "flex flex-col justify-center items-center gap-2 h-12 w-12 p-1 cursor-pointer",
        "hover:opacity-30 hover:backdrop-blur-md hover:rounded-md hover:shadow-xl",
        "hover:bg-gradient-to-tr hover:from-slate-900 hover:to-slate-500 hover:border-2",
        "hover:border-slate-800"
      )}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <Image className={clsx("transition-all", mouseDown ? "scale-[80%]" : "scale-100")} src={icon} alt={title} width="30" height="30" />
      <span
        className={clsx(
          "h-1 rounded-md transition-all duration-300",
          active ? "w-[30px] bg-cyan-700" : "w-[5px] bg-slate-600"
        )}
      ></span>
    </div>
  );
};

export default MenuTile;
