'use client';

import BlogPage from "@/modules/blog/components/BlogPage";
import ContactPage from "@/modules/blog/components/ContactPage";
import PortfolioPage from "@/modules/blog/components/PortfolioPage";
import TaskBar from "@/modules/core/components/TaskBar";
import BrowserWindow from "@/modules/core/components/Window";
import Workspace from "@/modules/core/components/Workspace";
import { useState } from "react";

// Define the available components that can be opened
const APPS = {
  BLOG: 'blog',
  CONTACT: 'contact',
  PORTFOLIO: 'portfolio'
};

export default function Home() {
  const [browserOpen, setBrowserOpen] = useState(false);
  const [activeApp, setActiveApp] = useState('');

  const handleClose = () => {
    setBrowserOpen(false);
    setActiveApp('');
  };

  const handleOpen = (appName: string) => {
    setBrowserOpen(true);
    setActiveApp(appName);
  };

  // Render the appropriate component based on activeApp
  const renderComponent = () => {
    switch (activeApp) {
      case APPS.BLOG:
        return <BlogPage />;
      case APPS.CONTACT:
        return <ContactPage />;
      case APPS.PORTFOLIO:
        return <PortfolioPage />;
      default:
        return null;
    }
  };

  return (
    <div>
      {browserOpen && (
        <BrowserWindow onClose={handleClose}>
          {renderComponent()}
        </BrowserWindow>
      )}
      
      <Workspace 
        onItemClick={(appName) => handleOpen(appName)}
        apps={Object.values(APPS)} 
      />
      
      <TaskBar 
        onItemClick={(appName) => handleOpen(appName)}
        activeApp={activeApp}
        apps={Object.values(APPS)}
      />
    </div>
  );
}