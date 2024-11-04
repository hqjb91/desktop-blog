"use client";

import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import DragArea from "./DragArea";
import Image from "next/image";

interface MenuItem {
  id: number;
  title: string;
  icon: string;
  position: { x: number; y: number };
  path: string;
}

interface Position {
  x: number;
  y: number;
}

interface Bounds {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

export type WorkspaceProps = {
  onItemClick: (appName: string) => void;
  apps: string[];
};

const Workspace = ({ onItemClick }: WorkspaceProps) => {
  const GRID_SIZE = 100;
  const [rowNumber, setRowNumber] = useState(0);
  const [columnNumber, setColumnNumber] = useState(0);
  const [bounds, setBounds] = useState<Bounds>({
    minX: 0,
    maxX: 0,
    minY: 0,
    maxY: 0,
  });
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: 1,
      title: "Blog",
      icon: "./book.svg",
      position: { x: 0, y: 0 },
      path: "blog",
    },
    {
      id: 2,
      title: "Contact",
      icon: "./contact.svg",
      position: { x: 0, y: 100 },
      path: "contact",
    },
    {
      id: 3,
      title: "Portfolio",
      icon: "./portfolio.svg",
      position: { x: 100, y: 0 },
      path: "portfolio",
    },
  ]);

  const [selectedItemIds, setSelectedItemIds] = useState<number[]>([]);
  const [selectionStart, setSelectionStart] = useState<Position | null>(null);
  const [isDraggingItems, setIsDraggingItems] = useState(false);
  const [dragStart, setDragStart] = useState<Position | null>(null);
  const [dragOffset, setDragOffset] = useState<Position[]>([]);
  const [lastClickTime, setLastClickTime] = useState<{ [key: number]: number }>(
    {}
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const dragAreaRef = useRef<HTMLDivElement>(null);
  const cellRefs = useRef<(HTMLDivElement | null)[]>([]);

  const cellArrays = [...Array(rowNumber * columnNumber).keys()];

  const snapToGrid = (position: Position): Position => {
    return {
      x: Math.round(position.x / GRID_SIZE) * GRID_SIZE,
      y: Math.round(position.y / GRID_SIZE) * GRID_SIZE,
    };
  };

  const constrainPosition = (position: Position): Position => {
    return {
      x: Math.max(bounds.minX, Math.min(bounds.maxX, position.x)),
      y: Math.max(bounds.minY, Math.min(bounds.maxY, position.y)),
    };
  };

  // Find the nearest free position to a given position
  const findNearestFreePosition = (
    position: Position,
    itemId: number,
    processedPositions: Position[] = []
  ): Position => {
    const snappedPos = snapToGrid(position);

    // Check if the position is already taken by a processed item
    if (
      !processedPositions.some(
        (pos) =>
          Math.abs(pos.x - snappedPos.x) < GRID_SIZE &&
          Math.abs(pos.y - snappedPos.y) < GRID_SIZE
      )
    ) {
      return constrainPosition(snappedPos);
    }

    // Search pattern (spiral out from center)
    const directions = [
      { x: 1, y: 0 }, // right
      { x: 0, y: 1 }, // down
      { x: -1, y: 0 }, // left
      { x: 0, y: -1 }, // up
    ];

    let distance = 1;
    let found = false;
    let result = snappedPos;

    while (!found && distance <= Math.max(rowNumber, columnNumber)) {
      for (const dir of directions) {
        for (let i = 0; i < distance; i++) {
          const testPos = {
            x: snappedPos.x + dir.x * GRID_SIZE * distance,
            y: snappedPos.y + dir.y * GRID_SIZE * distance,
          };

          const constrained = constrainPosition(testPos);

          if (
            !processedPositions.some(
              (pos) =>
                Math.abs(pos.x - constrained.x) < GRID_SIZE &&
                Math.abs(pos.y - constrained.y) < GRID_SIZE
            )
          ) {
            result = constrained;
            found = true;
            break;
          }
        }
        if (found) break;
      }
      distance++;
    }

    return result;
  };

  const updateGridSize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const rows = Math.floor(height / GRID_SIZE);
    const cols = Math.floor(width / GRID_SIZE);

    setRowNumber(rows);
    setColumnNumber(cols);
    setBounds({
      minX: 0,
      maxX: (cols - 1) * GRID_SIZE,
      minY: 0,
      maxY: (rows - 1) * GRID_SIZE,
    });
  };

  useEffect(() => {
    updateGridSize();
    window.addEventListener("resize", updateGridSize);
    return () => window.removeEventListener("resize", updateGridSize);
  }, []);

  const handleItemMouseDown = (e: React.MouseEvent, itemId: number) => {
    e.stopPropagation();

    const currentTime = new Date().getTime();
    const lastClick = lastClickTime[itemId] || 0;

    // Handle double click
    if (currentTime - lastClick < 300) {
      const item = menuItems.find((item) => item.id === itemId);
      if (item) {
        // router.push(item.path);
        onItemClick(item.path);
      }
      return;
    }

    setLastClickTime((prev) => ({ ...prev, [itemId]: currentTime }));

    // Get the clicked item
    const clickedItem = menuItems.find((item) => item.id === itemId);
    if (!clickedItem) return;

    // Calculate the initial offset for the clicked item
    const initialOffset = {
      x: e.clientX - clickedItem.position.x,
      y: e.clientY - clickedItem.position.y,
    };

    if (!selectedItemIds.includes(itemId)) {
      // If clicked item is not selected and no shift key, start dragging just this item
      if (!e.shiftKey) {
        setSelectedItemIds([itemId]);
        setDragOffset([initialOffset]);
      } else {
        // If shift key is pressed, add to selection
        setSelectedItemIds((prev) => [...prev, itemId]);
        setDragOffset((prev) => [...prev, initialOffset]);
      }
    } else {
      // If clicked item is already selected
      if (e.shiftKey) {
        // If shift key is pressed, remove from selection
        setSelectedItemIds((prev) => prev.filter((id) => id !== itemId));
        setDragOffset((prev) =>
          prev.filter((_, index) => selectedItemIds[index] !== itemId)
        );
      } else {
        // If no shift key, keep selection and update offsets for all selected items
        const offsets = menuItems
          .filter((item) => selectedItemIds.includes(item.id))
          .map((item) => ({
            x: e.clientX - item.position.x,
            y: e.clientY - item.position.y,
          }));
        setDragOffset(offsets);
      }
    }

    setIsDraggingItems(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDraggingItems && dragStart && dragOffset.length > 0) {
      setMenuItems((items) => {
        return items.map((item) => {
          if (selectedItemIds.includes(item.id)) {
            const itemIndex = selectedItemIds.indexOf(item.id);
            const offset = dragOffset[itemIndex] || dragOffset[0];

            return {
              ...item,
              position: constrainPosition({
                x: e.clientX - offset.x,
                y: e.clientY - offset.y,
              }),
            };
          }
          return item;
        });
      });
    } else if (selectionStart && dragAreaRef.current) {
      const top = Math.min(selectionStart.y, e.clientY);
      const left = Math.min(selectionStart.x, e.clientX);
      const width = Math.abs(selectionStart.x - e.clientX);
      const height = Math.abs(selectionStart.y - e.clientY);

      dragAreaRef.current.style.top = `${top}px`;
      dragAreaRef.current.style.left = `${left}px`;
      dragAreaRef.current.style.width = `${width}px`;
      dragAreaRef.current.style.height = `${height}px`;

      const selectionRect = {
        top,
        left,
        right: left + width,
        bottom: top + height,
      };

      const newSelectedIds = menuItems
        .filter((item) => {
          const itemElem = document.getElementById(`item-${item.id}`);
          if (!itemElem) return false;
          const rect = itemElem.getBoundingClientRect();
          return (
            rect.left < selectionRect.right &&
            rect.right > selectionRect.left &&
            rect.top < selectionRect.bottom &&
            rect.bottom > selectionRect.top
          );
        })
        .map((item) => item.id);

      setSelectedItemIds((prev) =>
        e.shiftKey ? [...new Set([...prev, ...newSelectedIds])] : newSelectedIds
      );
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (
      e.target === containerRef.current ||
      (e.target as HTMLElement).classList.contains("grid-cell")
    ) {
      setSelectionStart({ x: e.clientX, y: e.clientY });
      if (!e.shiftKey) {
        setSelectedItemIds([]);
      }
    }
  };

  const handleMouseUp = () => {
    if (isDraggingItems) {
      setMenuItems((items) => {
        const processedPositions: Position[] = [];
        const newItems = [...items];

        // Process selected items first
        selectedItemIds.forEach((id) => {
          const item = newItems.find((item) => item.id === id);
          if (item) {
            const finalPosition = findNearestFreePosition(
              item.position,
              id,
              processedPositions
            );
            const itemIndex = newItems.findIndex((i) => i.id === id);
            newItems[itemIndex] = { ...item, position: finalPosition };
            processedPositions.push(finalPosition);
          }
        });

        // Process remaining items if they overlap with placed items
        items.forEach((item) => {
          if (!selectedItemIds.includes(item.id)) {
            const overlapsWithProcessed = processedPositions.some(
              (pos) =>
                Math.abs(pos.x - item.position.x) < GRID_SIZE &&
                Math.abs(pos.y - item.position.y) < GRID_SIZE
            );

            if (overlapsWithProcessed) {
              const finalPosition = findNearestFreePosition(
                item.position,
                item.id,
                processedPositions
              );
              const itemIndex = newItems.findIndex((i) => i.id === item.id);
              newItems[itemIndex] = { ...item, position: finalPosition };
              processedPositions.push(finalPosition);
            }
          }
        });

        return newItems;
      });
    }

    setIsDraggingItems(false);
    setDragStart(null);
    setDragOffset([]);

    if (selectionStart) {
      setSelectionStart(null);
      if (dragAreaRef.current) {
        dragAreaRef.current.style.width = "0";
        dragAreaRef.current.style.height = "0";
      }
    }
  };

  return (
    <div
      className="relative w-full h-screen overflow-hidden"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <DragArea dragAreaRef={dragAreaRef} />
      <div
        ref={containerRef}
        className={clsx("grid grid-flow-row w-full h-screen select-none")}
        style={{
          gridTemplateColumns: `repeat(${columnNumber}, ${GRID_SIZE}px)`,
          gridTemplateRows: `repeat(${rowNumber}, ${GRID_SIZE}px)`,
        }}
      >
        {cellArrays.map((_, index) => (
          <div
            key={`cell-${index}`}
            ref={(el) => {
              cellRefs.current[index] = el;
            }}
            className="grid-cell border border-gray-200 border-opacity-0"
          />
        ))}

        {menuItems.map((item) => (
          <div
            id={`item-${item.id}`}
            key={item.id}
            onMouseDown={(e) => handleItemMouseDown(e, item.id)}
            className={clsx(
              "absolute flex flex-col items-center justify-center w-24 h-24 p-2",
              "transition-transform duration-0",
              selectedItemIds.includes(item.id)
                ? "bg-blue-100 bg-opacity-50 rounded-lg"
                : "hover:bg-white hover:bg-opacity-20 rounded-lg"
            )}
            style={{
              left: item.position.x,
              top: item.position.y,
              transform: "translate(0, 0)",
              touchAction: "none",
              zIndex: selectedItemIds.includes(item.id) ? 10 : 1,
            }}
          >
            <div className="relative group">
              <Image
                src={item.icon}
                alt={item.title}
                width={48}
                height={48}
                className="w-12 h-12 mx-auto mb-1 pointer-events-none"
                draggable="false"
              />
              <p className="text-center text-sm font-medium text-gray-800 pointer-events-none px-1 py-0.5 rounded">
                {item.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Workspace;
