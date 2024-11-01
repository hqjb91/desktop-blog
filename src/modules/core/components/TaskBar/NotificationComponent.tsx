'use client';

import React, { useEffect, useState } from 'react';

const NotificationComponent = () => {
    const [date, setDate] = useState(new Date());
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true); // Ensure that this component only renders the date after mounting
    }, []);

    useEffect(() => {
        if (mounted) {
            const timer = setInterval(() => setDate(new Date()), 1000);
            return () => clearInterval(timer);
        }
    }, [mounted]);

    if (!mounted) return null; // Render nothing on the server

    return (
        <div className="flex flex-row">
            <div className="flex flex-col text-white p-1 text-sm items-end mr-2">
                <div>{date.toLocaleTimeString()}</div>
                <div>{date.toLocaleDateString()}</div>
            </div>
        </div>
    );
};

export default NotificationComponent;