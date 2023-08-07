// 'use server'

import React from 'react';
import Panel from '@/src/app/backend/components/layouts/PanelLayout';
import { useGlobalContext } from '@/src/app/backend/hooks/useGlobalContext';

const WelcomePanel: React.FC = ({ }) => {

  const { user } = useGlobalContext();

  return (
    <Panel classes="flex-col relative">
      <div className="z-0 w-full h-1 bg-back"></div>
      <div className="z-0 w-full h-20 rounded-sm bg-gradient-to-r from-quaternary to-primary via-secondary flex">
      <div className="p-4 flex flex-col gap-1">
        <p className="tracking-tight italic font-medium mb-0 leading-4">Good {
          new Date().getHours() < 12 ? "morning" : new Date().getHours() < 18 ? "afternoon" : "evening"
        }, {user.first_name}.</p> 
        <p className="text-[0.5rem] italic font-light leading-3">Here are some posts you might like.</p> 
      </div>
      <img src="/illustrations/welcome.png" alt="Photo" className="w-24 h-24 flex items-end pl-6 relative bottom-4" />
      </div>
    </Panel>
  );
};

export default WelcomePanel;