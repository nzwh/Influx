"use client"

import React,{ useEffect, useState } from 'react';
import Image from 'next/image';

import TopbarNav from '@/src/app/backend/components/navigators/TopbarNav';
import ExplorerNav from '@/src/app/backend/components/navigators/ExplorerNav';

import useFetchPosts from "@/src/app/backend/hooks/useFetchPosts";
import usePostActions from "@/src/app/backend/hooks/usePostActions";

import Background from '@/src/app/backend/components/panels/BackgroundPanel';
import Post from '@/src/app/backend/components/template/PostTemplate';

import About from '@/src/app/backend/components/panels/columns/AboutPanel';
import Welcome from '@/src/app/backend/components/panels/columns/WelcomePanel';
import NewPost from '@/src/app/backend/components/panels/timeline/DashNewPostPanel';

import { PostInterface } from '@/libraries/structures';
import SearchFilters from '@/src/app/backend/components/panels/columns/SearchFiltersPanel';

// for user fetch
import { UserClass } from '@/libraries/structures';
import supabase from '@/src/app/backend/model/supabase';

export default function Home() {

  const { posts, fetchPosts } = useFetchPosts({ type: 'all' });
  const { handleAddPost, handleDeletePost, handleEditPost } = usePostActions();

  // Instantiate the user, set the icon to a default value
  const [user, setUser] = useState<UserClass>(new UserClass({
    icon: '/root/temp.jpg',
    banner: '/root/temp.jpg'
  }));
  const localToken = localStorage.getItem('sb-pmjwqjsoojzbascysdbk-auth-token');

  const fetchUser = async (id : string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('uuid', id)
      .single();

    if (error) {
      throw error;
    }
    
    if (data) {
      setUser((previousData) => ({ ...previousData, ...data }));
    }
  };

  useEffect(() => {
    if (!localToken) {
      setUser(new UserClass({
        id: -1,
        handle: 'Guest',
        first_name: 'Guest',
        last_name: 'User',
        icon: '/root/temp.jpg',
        email_address: '',
      }));
      
    } else {
      const localData = JSON.parse(localToken);
      fetchUser(localData.user.id);
    }
  }, [localToken]);

  useEffect(() => {
    console.log("Logged in as:", user);
  }, [user]);

  return (
    <main>

      {/* Templates */}
      <Background />
      <TopbarNav user={user} />
      
      <div id="wrapper" className="flex flex-row gap-2 w-full h-full align-center py-20 px-[12%] wr-br justify-between z-50">

        {/* <ExplorerNav wrapperClass="w-40 min-w-[10rem] ex-br" /> */}
        <div id="padder" className="w-40 min-w-[10rem] ex-br"></div>

        <div className="flex flex-row gap-2 justify-center w-full">
          {/* New Post & Post Loader */}
          <div className="flex flex-col gap-2 h-full overflow-y-visible w-[32rem] lg:mr-[16.5rem]">
            {/* <NewPost onCreatePost={handleAddPost}/> */}
            {posts.length ? (
              <ul className="flex flex-col gap-2 h-full w-[32rem]">
                {posts.map((post: PostInterface) => (
                  <li key={post.id}>
                    <Post post={post} onDelete={handleDeletePost} onEdit={handleEditPost} />
                  </li>
                ))}
              </ul>
            ):(
              <span className="flex flex-col items-center justify-center z-[-2]">
                <Image src={'/empty-illustration.png'} width={1000} height={1000} alt="No posts" className=" w-[50%]"/>
                <p className='text-gray-700 text-sm'>No posts to show</p>
              </span>
            )}
          </div>
          
          {/* Panels */}
          <div className="flex flex-col gap-2 h-full fixed w-[16rem] ml-[32.5rem] ra-br z-40">

            {/* <Welcome /> */}
            <SearchFilters />
            <About />
            
          </div>
        </div>
        
        {/* Quick Access & Padder */}
        <div id="quick" className="h-full w-40 min-w-[10rem] gap-4 flex flex-col fixed right-[12%] ex-br"></div>
        <div id="padder" className="w-40 min-w-[10rem] ex-br"></div>

      </div>
    </main>
  )
}