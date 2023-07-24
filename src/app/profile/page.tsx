"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import TopbarNav from '@/src/app/backend/components/navigators/TopbarNav';
import ExplorerNav from '@/src/app/backend/components/navigators/ExplorerNav';

import useFetchPosts from "@/src/app/backend/hooks/useFetchPosts";
import usePostActions from "@/src/app/backend/hooks/usePostActions";
import Post from '@/src/app/backend/components/template/PostTemplate';
import About from '@/src/app/backend/components/panels/columns/AboutPanel';
import Background from '@/src/app/backend/components/panels/BackgroundPanel';

import Listings from '@/src/app/backend/components/panels/timeline/ProfileListingsPanel';
import ProfileAccount from '@/src/app/backend/components/panels/columns/ProfileAccountPanel';
import ProfileComments from '@/src/app/backend/components/panels/columns/ProfileCommentsPanel';
import { Post as PostInterface } from '@/libraries/structures';
import useFetchUser from "@/src/app/backend/hooks/useFetchUser";

export default function Profile() {
  let activeD = JSON.parse(sessionStorage.getItem('token')!)
  const router = useRouter();
  // let user = require('@/json/active.json'); // TODO: Load user info dynamically through auth
  const { posts, fetchPosts } = useFetchPosts({ type: 'user', userId: activeD.user.id as string }); // TODO: Change type to user
  const { handleAddPost, handleDeletePost } = usePostActions();
  const [svg, setSvg] = useState('');

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

  if (user && user.length > 0) {
    return (
      <main>

        {/* Templates */}
        <Background />
        <TopbarNav /> { /*// TODO: Add Create Post hook */ }

        <div id="wrapper" className="flex flex-row gap-2 w-full h-full align-center py-20 px-[12%] wr-br justify-between">

          {/* ExplorerNav & Padder */}
          <ExplorerNav wrapperClass="w-40 min-w-[10rem] ex-br" />
          <div id="padder" className="w-40 min-w-[10rem] ex-br"></div>

          <div className="flex flex-row gap-2 justify-center w-full ">

            {/* New Post & Post Loader */}
            <div className="flex flex-col gap-2 h-full overflow-y-visible w-[32rem] lg:mr-[16.5rem] z-50">
              <Listings handle={activeData.handle}/>
              {posts && (
                <ul className="flex flex-col gap-2 h-full w-[32rem] z-0">
                  {posts.map((post: PostInterface) => (
                    <li key={post.id}>
                      <Post post={post} onDelete={handleDeletePost} />
                    </li>
                  ))}
                </ul>
              )}
              {posts.length == 0 && (
                <span className="flex flex-col items-center justify-center z-0">
                  <Image src={'/empty-illustration.png'} width={1000} height={1000} alt="No posts" className=" w-[50%]"/>
                  <p className='text-gray-700 text-sm'>No posts to show</p>
                </span>
              )}
            </div>
            
            {/* Panels */}
            <div className="flex flex-col gap-2 h-full fixed w-[16rem] ml-[32.5rem] ra-br">

              <ProfileAccount />
              <ProfileComments />
              <About />

            </div>
          </div>

          {/* Quick Access & Padder */}
          <div id="quick" className="h-full w-40 min-w-[10rem] gap-4 flex flex-col fixed right-[12%] ex-br"></div>
          <div id="padder" className="w-40 min-w-[10rem] ex-br"></div>
        </div>
      </main>
    );
  } else {
    console.log("User data is not available yet.");
  }
}