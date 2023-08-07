"use client"

import React, { useState, useEffect } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import Supabase from '@/src/app/backend/model/supabase';

// Layouts
import Timeline from '@/src/app/backend/components/layouts/TimelineLayout';

// Panels
import About from '@/src/app/backend/components/panels/columns/AboutPanel';
import Listings from '@/src/app/backend/components/panels/timeline/ProfileListingsPanel';
import ProfileAccount from '@/src/app/backend/components/panels/columns/ProfileAccountPanel';
import ProfileComments from '@/src/app/backend/components/panels/columns/ProfileCommentsPanel';

// Hooks & Classes
import { useGlobalContext, useRefreshContext } from '@/src/app/backend/hooks/useGlobalContext';
import useFetchUser from "@/src/app/backend/hooks/useFetchUser";
import { UserClass } from '@/libraries/structures';

export default function Home() {

  useRefreshContext();

  const { posts } = useGlobalContext();
  const pathName = usePathname();

  const parts = pathName.split('/');
  const handle = parts.length >= 3 && parts[1] === 'profile' ? parts[2] : '';

  const [user, setUser] = useState<UserClass>(new UserClass());

  const getUser = async () => {
    const { data, error } = await Supabase
      .from('profiles')
      .select('*')
      .eq('handle', handle)
      .single();

    if (error) {
      console.log('Error getting user:', error);
      return;
    }

    if (data) {
      setUser(new UserClass(data));
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  // useEffect(() => {
  //   const handle = extractHandle(pathName);
  //   if (handle) {
  //     console.log('Profile handle:', handle);
  //     setHandleFromURL(handle);
  //   }
  // }, [pathName]);

  // let { user, fetchUser } = useFetchUser({ type: 'handle', handle: handleFromURL });
  // let userData: UserClass = user[0] as any;

  // useEffect(() => {
  //   if (userData) {
  //     console.log('User data:', userData);
  //   }
  //   userData = new UserClass({
  //     ...userData,
  //     icon: 'root/temp.jpg',
  //     banner: 'root/temp.jpg'
  //   })


  // }, [userData]);

  return (
    <Timeline 
      user={user}
      posts={
        posts.filter(post => post.author.handle === handle )
      }
      header={<>
        <Listings user={user}/>
      </>}
      panels={<>
        <ProfileAccount user={new UserClass(user)}/>
        <ProfileComments user={user} />
        <About />
      </>}
    />
  )
}



