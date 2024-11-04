import React from 'react'

export type CarouselItemProps = {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
}

const CarouselItem = ({icon, title, subtitle}: CarouselItemProps) => {
  return (
    <div className="text-white p-2 rounded-md w-48">
        <div className="relative h-6 overflow-hidden">
            <div className="absolute w-full flex items-center gap-2">
            {icon}
            <span className="font-medium">{title}</span>
            <span className="text-sm text-gray-300">{subtitle}</span>
            </div>
        </div>
    </div>
  )
}

export default CarouselItem;