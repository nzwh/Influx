import React from 'react';

import Panel from '@/src/app/backend/components/layouts/PanelTemplate';
import { UserClass } from '@/libraries/structures';

interface Props {
  user: UserClass;
}

const Welcome: React.FC<Props> = ({ user }) => {
  return (
    <Panel classes="flex-col relative">
      <div className="z-0 w-full h-1 bg-back"></div>
      <div className="z-0 w-full h-20 rounded-sm bg-gradient-to-r from-quaternary to-primary via-secondary flex">
      <div className="p-4 flex flex-col gap-1">
        <p className="tracking-tight italic font-medium mb-0 leading-4">Good evening, {user.first_name}.</p> 
        <p className="text-[0.5rem] italic font-light leading-3">Here are some posts you might like.</p> 
      </div>
      <img src="/welcome.png" alt="Photo" className="w-24 h-24 flex items-end pl-6 relative bottom-4" />
      </div>
    </Panel>
  );
};

export default Welcome;