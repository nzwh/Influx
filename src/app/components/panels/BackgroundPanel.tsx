import React from 'react';

const BackgroundPanel: React.FC = () => {
  return (
    <div id="bg" className="fixed top-0 left-0 z-[-1] w-screen h-screen bg-gradient-to-b from-[#f5f7fa] to-[#eef1f5]"></div>
  );
};

export default BackgroundPanel;