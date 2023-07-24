import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import useFetchUser from "@/src/app/backend/hooks/useFetchUser";

interface WrapperProps {
  // user: UserInterface;
  wrapperClass: string;
}

// const ExplorerNav: React.FC<WrapperProps> = ({ user, wrapperClass }) => {
const ExplorerNav: React.FC<WrapperProps> = ({ wrapperClass }) => {
  let activeD = JSON.parse(sessionStorage.getItem('token')!)
  let router = useRouter();
  
  useEffect(() => {
    if(sessionStorage.getItem('token')) {
      activeD = JSON.parse(sessionStorage.getItem('token')!)
      console.log(activeD.user.id)
    }
    else {
      router.push('/home')
    }
  }, [])
  
  const { user, fetchUser} = useFetchUser({ type: 'userId', userId: activeD.user.id as string });
  const activeData = user[0];

  return (
    <section id="profile" className={`gap-4 flex flex-col fixed ${wrapperClass}`}>
    <Link href="/profile" className="flex flex-row items-start gap-2">
      <Image className="rounded-full" src={activeData ? activeData.icon : "/root/temp.jpg"} alt="User Icon" width={48} height={48} />
      <div className="flex flex-col justify-center">
        <div className="flex flex-row gap-0.5 items-start">
        <h6 className="text-gray-800 font-medium text-base leading-4 tracking-tight">
          {activeData ? activeData.first_name : ""}<br/>{activeData ? activeData.last_name : ""}
          { activeData ? (activeData.is_verified ? (
          <span className="inline-block w-4 h-4 relative top-[0.125rem]"> 
            <Image src="/root/verified.svg" alt="verified" width={16} height={16} />
          </span>
          ) : null) : null }
        </h6>
        </div>
        <h6 className="text-gray-500 font-regular text-[0.625rem] leading-4">{activeData ? `@${activeData.handle}` : ""}</h6>
      </div>
    </Link>
    </section>
  );
};

export default ExplorerNav;