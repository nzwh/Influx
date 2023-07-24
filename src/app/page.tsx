"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

import TopbarNav from '@/src/app/backend/components/navigators/TopbarNav';
import ExplorerNav from '@/src/app/backend/components/navigators/ExplorerNav';

import useFetchPosts from "@/src/app/backend/hooks/useFetchPosts";
import usePostActions from "@/src/app/backend/hooks/usePostActions";
import Post from '@/src/app/backend/components/template/PostTemplate';
import About from '@/src/app/backend/components/panels/columns/AboutPanel';
import SearchFilters from './backend/components/panels/columns/SearchFiltersPanel';
import Background from '@/src/app/backend/components/panels/BackgroundPanel';

import NewPost from '@/src/app/backend/components/panels/timeline/DashNewPostPanel';
import { Post as PostInterface } from '@/libraries/structures';

import supabase from '@/src/app/backend/supabase';
import ProfileAccount from '@/src/app/backend/components/panels/columns/ProfileAccountPanel';
import Media from '@/src/app/backend/components/panels/columns/MediaPanel';
import Welcome from '@/src/app/backend/components/panels/columns/WelcomePanel';

export default function Home() {

  // TODO: Load user info dynamically through auth
  // let user = require('@/json/active.json');
  const { posts, fetchPosts } = useFetchPosts({ type: 'all' });
  const { handleAddPost, handleDeletePost, handleEditPost } = usePostActions();

  return (
    <main>

      {/* Templates */}
      <Background />
      <TopbarNav /> { /*// TODO: Add Create Post hook */ }
      
      <div id="wrapper" className="flex flex-row gap-2 w-full h-full align-center py-20 px-[12%] wr-br justify-between z-50">

        {/* ExplorerNav & Padder */}
        {/* <ExplorerNav user={user} wrapperClass="w-40 min-w-[10rem] ex-br" /> */}
        <ExplorerNav wrapperClass="w-40 min-w-[10rem] ex-br" />
        <div id="padder" className="w-40 min-w-[10rem] ex-br"></div>

        <div className="flex flex-row gap-2 justify-center w-full">

          {/* New Post & Post Loader */}
          <div className="flex flex-col gap-2 h-full overflow-y-visible w-[32rem] lg:mr-[16.5rem]">
            <NewPost onCreatePost={handleAddPost}/>
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
            <Welcome />
            <ProfileAccount />
            <SearchFilters />
            <Media />
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