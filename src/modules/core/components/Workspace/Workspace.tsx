"use client";

import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import DragArea from "./DragArea";

interface MenuItem {
  id: string;
  title: string;
  icon: string;
  position: { x: number; y: number };
}

interface Position {
  x: number;
  y: number;
}

const Workspace: React.FC = () => {
  const [rowNumber, setRowNumber] = useState(0);
  const [columnNumber, setColumnNumber] = useState(0);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { id: "1", title: "Blog", icon: "./book.svg", position: { x: 0, y: 0 } },
    { id: "2", title: "About", icon: "./about.svg", position: { x: 0, y: 0 } },
    {
      id: "3",
      title: "Contact",
      icon: "./contact.svg",
      position: { x: 0, y: 0 },
    },
  ]);

  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });

  const cellRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const cellArrays = [...Array(rowNumber * columnNumber).keys()];

  const updateGridSize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const gridSize = 100; // Adjust based on preferred cell size

    setRowNumber(Math.floor(height / gridSize));
    setColumnNumber(Math.floor(width / gridSize));
  };

  useEffect(() => {
    updateGridSize();
    window.addEventListener("resize", updateGridSize);
    return () => window.removeEventListener("resize", updateGridSize);
  }, []);

  const handleDragStart = (
    e: React.MouseEvent<HTMLDivElement>,
    itemId: string
  ) => {
    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();

    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });

    setDraggedItem(itemId);
  };

  const handleDragMove = (e: MouseEvent) => {
    if (!draggedItem || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();

    // Calculate new position relative to container
    const newX = e.clientX - containerRect.left - dragOffset.x;
    const newY = e.clientY - containerRect.top - dragOffset.y;

    // Update item position
    setMenuItems((prev) =>
      prev.map((item) => {
        if (item.id === draggedItem) {
          return {
            ...item,
            position: {
              x: Math.max(0, Math.min(newX, containerRect.width - 100)),
              y: Math.max(0, Math.min(newY, containerRect.height - 100)),
            },
          };
        }
        return item;
      })
    );
  };

  const findClosestCell = (x: number, y: number): number => {
    let closestIdx = 0;
    let minDistance = Infinity;

    cellRefs.current.forEach((cell, idx) => {
      if (cell) {
        const rect = cell.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distance = Math.sqrt(
          Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
        );

        if (distance < minDistance) {
          minDistance = distance;
          closestIdx = idx;
        }
      }
    });

    return closestIdx;
  };

  const handleDragEnd = (e: MouseEvent) => {
    if (!draggedItem || !containerRef.current) return;

    const closestCellIdx = findClosestCell(e.clientX, e.clientY);
    const cell = cellRefs.current[closestCellIdx];

    if (cell) {
      const cellRect = cell.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      setMenuItems((prev) =>
        prev.map((item) => {
          if (item.id === draggedItem) {
            return {
              ...item,
              position: {
                x: cellRect.left - containerRect.left,
                y: cellRect.top - containerRect.top,
              },
            };
          }
          return item;
        })
      );
    }

    setDraggedItem(null);
  };

  useEffect(() => {
    if (draggedItem) {
      window.addEventListener("mousemove", handleDragMove);
      window.addEventListener("mouseup", handleDragEnd);

      return () => {
        window.removeEventListener("mousemove", handleDragMove);
        window.removeEventListener("mouseup", handleDragEnd);
      };
    }
  }, [draggedItem]);

  return (
    <>
      <DragArea />
      <div
        ref={containerRef}
        className={clsx(
          "grid grid-flow-row w-full h-screen select-none relative",
          "border-2 border-gray-200"
        )}
        style={{
          gridTemplateColumns: `repeat(${columnNumber}, 1fr)`,
          gridTemplateRows: `repeat(${rowNumber}, 1fr)`,
        }}
      >
        {/* Grid Cells */}
        {cellArrays.map((_, index) => (
          <div
            key={`cell-${index}`}
            ref={(el) => (cellRefs.current[index] = el)}
            className="border border-gray-200"
          />
        ))}

        {/* Draggable Items */}
        {menuItems.map((item) => (
          <div
            key={item.id}
            onMouseDown={(e) => handleDragStart(e, item.id)}
            className={clsx(
              "absolute cursor-move p-2 bg-white rounded-lg shadow-md transition-shadow",
              draggedItem === item.id ? "shadow-lg" : "shadow-md",
              "hover:shadow-lg"
            )}
            style={{
              width: "100px",
              height: "100px",
              left: item.position.x,
              top: item.position.y,
              transform: "translate(0, 0)",
              touchAction: "none",
              zIndex: draggedItem === item.id ? 10 : 1,
            }}
          >
            <img
              src={item.icon}
              alt={item.title}
              className="w-12 h-12 mx-auto mb-2 pointer-events-none"
            />
            <p className="text-center text-sm pointer-events-none">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Workspace;
