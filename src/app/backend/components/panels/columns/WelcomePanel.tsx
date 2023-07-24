import React from 'react';
import Link from 'next/link';

import Panel from '@/src/app/backend/components/template/PanelTemplate';


const Welcome: React.FC = () => {
  return (
    <Panel classes="flex-col relative">
 <div className="z-0 w-full h-1 pl-4 bg-back"></div>
  <div className="z-0 w-full h-20 pl-3 rounded-sm bg-gradient-to-r from-quaternary to-primary via-secondary flex">
  <div className="pt-3">
    <div> <p className="tracking-tighter italic font-semibold mb-0 pt-0.5 pl-2 leading-4">Good evening, Arkstore</p> </div>
    <p className="tracking-tighter text-[0.500rem] italic font-light pl-2">Here are some posts you might like.</p> </div>

  
    <div className="flex items-end pl-5">
      <img src="/welcome.png" alt="Photo" className="w-32 h-28" />
    </div>
  </div>
</Panel>

  
  );
};

export default Welcome;