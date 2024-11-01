import React, { useEffect, useRef, useState } from 'react';

const DragArea = () => {
    const [originX, setOriginX] = useState(0);
    const [originY, setOriginY] = useState(0);
    const [clientX, setClientX] = useState(0);
    const [clientY, setClientY] = useState(0);
    const isDragging = useRef(false); // Use ref to track dragging state
    const dragAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseDown = (event: MouseEvent) => {
            setOriginX(event.clientX);
            setOriginY(event.clientY);
            isDragging.current = true; // Set ref value directly
        };

        const handleMouseUp = () => {
            isDragging.current = false;
            if (dragAreaRef.current) {
                dragAreaRef.current.style.width = `0px`;
                dragAreaRef.current.style.height = `0px`;
            }
        };

        const handleMouseMove = (event: MouseEvent) => {
            if (isDragging.current && dragAreaRef.current) {
                setClientX(event.clientX);
                setClientY(event.clientY);

                // Dynamically calculate position and dimensions
                const dragTop = Math.min(originY, event.clientY);
                const dragLeft = Math.min(originX, event.clientX);
                const dragWidth = Math.abs(originX - event.clientX);
                const dragHeight = Math.abs(originY - event.clientY);

                // Apply calculated values to style
                dragAreaRef.current.style.top = `${dragTop}px`;
                dragAreaRef.current.style.left = `${dragLeft}px`;
                dragAreaRef.current.style.width = `${dragWidth}px`;
                dragAreaRef.current.style.height = `${dragHeight}px`;
            }
        };

        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mousemove', handleMouseMove);

        return () => { 
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, [originX, originY]); // Only re-run on initial originX, originY changes

    return (
        <div ref={dragAreaRef} className="fixed bg-slate-800 opacity-35 border-2 border-cyan-500" />
    );
};

export default DragArea;