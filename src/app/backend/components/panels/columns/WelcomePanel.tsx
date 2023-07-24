import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Panel from '@/src/app/backend/components/template/PanelTemplate';
import useFetchUser from "@/src/app/backend/hooks/useFetchUser";

const Welcome: React.FC = () => {

  const router = useRouter();
  let activeD = JSON.parse(sessionStorage.getItem('token')!)
  
  useEffect(() => {
    if(sessionStorage.getItem('token')) {
      activeD = JSON.parse(sessionStorage.getItem('token')!)
      console.log(activeD.user.id)
    }
    else {
      router.push('/home')
    }
  }, [])
  
  const { user, fetchUser } = useFetchUser({ type: 'userId', userId: activeD.user.id as string });
  const activeData = user[0];

  return (
    <Panel classes="flex-col relative">
    <div className="z-0 w-full h-1 bg-back">
    </div>
      <div className="z-0 w-full h-20 rounded-sm bg-gradient-to-r from-quaternary to-primary via-secondary flex">
      <div className="p-4 flex flex-col gap-1">
        <p className="tracking-tight italic font-medium mb-0 leading-4">Good evening, {activeData ? activeData.first_name : "User"}.</p> 
        <p className="text-[0.5rem] italic font-light leading-3">Here are some posts you might like.</p> 
      </div>
      <img src="/welcome.png" alt="Photo" className="w-24 h-24 flex items-end pl-6 relative bottom-4" />
      </div>
    </Panel>
  );
};

export default Welcome;