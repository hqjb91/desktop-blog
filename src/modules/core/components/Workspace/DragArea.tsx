import React, { MutableRefObject } from "react";

export type DragAreaProps = {
  dragAreaRef: MutableRefObject<HTMLDivElement | null>;
};

const DragArea = ({ dragAreaRef }: DragAreaProps) => {
  return (
    <div
      ref={dragAreaRef}
      className="z-50 select-none fixed bg-slate-800 opacity-35 border-2 border-cyan-500"
    />
  );
};

export default DragArea;
