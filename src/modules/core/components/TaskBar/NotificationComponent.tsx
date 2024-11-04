'use client';

import React, { useEffect, useState } from 'react';

const NotificationComponent = () => {
    const [date, setDate] = useState(new Date());
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true); 
        // Ensure that this component only renders the date after mounting
        // This is to fix a bug observed due to SSR + date interval update
    }, []);

    useEffect(() => {
        if (mounted) {
            const timer = setInterval(() => setDate(new Date()), 1000);
            return () => clearInterval(timer);
        }
    }, [mounted]);

    // Return dummy divs to prevent layout shifts
    if (!mounted) return (
    <div className="w-40 flex flex-row hidden lg:block">
        <div className="flex flex-col text-white text-sm items-end p-1 pr-3">
            <div></div>
            <div></div>
        </div>
    </div>);

    return (
        <div className="w-40 flex flex-row hidden lg:block">
            <div className="flex flex-col text-white text-sm items-end p-1 pr-3">
                <div>{date.toLocaleTimeString()}</div>
                <div>{date.toLocaleDateString()}</div>
            </div>
        </div>
    );
};

export default NotificationComponent;