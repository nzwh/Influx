'use client' //* Uses interactable components

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Supabase from '@/src/app/backend/model/supabase';

// Layouts
import Timeline from '@/src/app/backend/components/layouts/TimelineLayout';

// Panels
import About from '@/src/app/backend/components/panels/columns/AboutPanel';
import Listings from '@/src/app/backend/components/panels/timeline/ListingsPanel';
import ProfileAccount from '@/src/app/backend/components/panels/columns/ProfileAccountPanel';
import ProfileComments from '@/src/app/backend/components/panels/columns/ProfileCommentsPanel';

// Hooks & Classes
import { useGlobalContext, useRefreshContext } from '@/src/app/backend/hooks/context/useGlobalContext';
import { UserClass } from '@/libraries/structures';

export default function Home() {

  useRefreshContext();

  const { posts } = useGlobalContext();
  const pathName = usePathname();
  const handle = pathName.split('/').slice(-1)[0];

  const [user, setUser] = useState<UserClass>(new UserClass());

  const getUser = async () => {
    const { data, error } = await Supabase
      .from('profiles')
      .select('*')
      .eq('handle', handle)
      .single();

    if (error) throw error;
    if (!data) return;

    setUser(new UserClass(data));
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Timeline 
      user={user}
      posts={
        posts.filter((post) => post.author.handle === handle)
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