import React, { useEffect, useState } from "react";

export type CarouselComponentProps = {
  items: React.ReactNode[];
  interval: number;
}

const CarouselComponent = ({ items, interval = 2000 }: CarouselComponentProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, interval);
    return () => clearInterval(timer);
  }, [interval, items.length]);

  return (
    <div className="relative h-full overflow-hidden hidden lg:block">
      <div
        className="flex flex-col transition-transform duration-500 ease-out h-full"
        style={{
          transform: `translateY(-${currentIndex * 100}%)`,
        }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="min-h-full flex items-center justify-center  shrink-0 pl-3"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarouselComponent;