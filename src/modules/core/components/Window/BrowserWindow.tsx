import React from 'react';

const BrowserWindow = ({ children, onClose }: { children: React.ReactNode, onClose?: () => void }) => {

  return (
    <>
      {/* Overlay */}
      <div className="select-none fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}></div>
      
      {/* Popup Window */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] z-50">
        <div className="w-full rounded-lg shadow-xl bg-white border border-gray-200">
          {/* Browser window header */}
          <div className="flex items-center px-4 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg">
            {/* Window controls */}
            <div className="flex space-x-2">
              <button 
                onClick={onClose}
                className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
              ></button>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            
            {/* URL bar */}
            <div className="flex-1 mx-4">
              <div className="w-full px-3 py-1 bg-white rounded-md text-sm text-gray-600 border border-gray-300">
                hqjb.dev
              </div>
            </div>
          </div>
          
          {/* Content area with scroll if needed */}
          <div className="p-4 max-h-[70vh] overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default BrowserWindow;