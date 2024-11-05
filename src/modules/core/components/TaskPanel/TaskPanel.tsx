'use client';

import clsx from 'clsx';
import React, { MutableRefObject, useEffect, useRef } from 'react'

export type TaskPanelProps = {
  active: boolean;
  searchTerm: string;
  setTaskPanelActive: (setter: boolean) => void;
  searchBarRef: MutableRefObject<HTMLDivElement | null>;
}

const TaskPanel = ({active, searchTerm, setTaskPanelActive, searchBarRef}: TaskPanelProps) => {

  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {

    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef && 
          panelRef.current && 
          !panelRef.current.contains(event.target as Node) &&
          searchBarRef && 
          searchBarRef.current && 
          !searchBarRef.current.contains(event.target as Node)
        ) {
        setTaskPanelActive(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }

  }, [panelRef, searchBarRef])

  return (
    <div 
      ref={panelRef}
      className={clsx(
        "z-50 p-4 transition-all fixed lg:left-[35%] lg:w-[40%] left-[5%] w-[90%] h-[60%] bg-black opacity-90 rounded-xl", 
        active ? "bottom-16" : "bottom-[-160%]"
    )}>
      {searchTerm}
    </div>
  )
}

export default TaskPanel;