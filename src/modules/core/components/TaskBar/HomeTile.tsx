"use client";

import React from "react";
import Image from "next/image";
import clsx from "clsx";

export type HomeTileProps = {
  icon: string;
  title: string;
};

const HomeTile = ({ icon, title }: HomeTileProps) => {

  return (
    <div
      className={clsx(
        "flex flex-col justify-center items-center gap-2 h-12 w-12 p-1 cursor-pointer",
        "hover:opacity-30 hover:backdrop-blur-md hover:rounded-md hover:shadow-xl",
        "hover:bg-gradient-to-tr hover:from-slate-900 hover:to-slate-500 hover:border-2",
        "hover:border-slate-800"
      )}
    >
      <Image className={clsx("transition-all", "scale-100")} src={icon} alt={title} width="30" height="30" />
    </div>
  );
};

export default HomeTile;
