"use client"

import React, { useState, useEffect } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import Image from 'next/image';

import TopbarNav from '@/src/app/backend/components/navigators/TopbarNav';
import ExplorerNav from '@/src/app/backend/components/navigators/ExplorerNav';

import useNavigateToProfile from '@/src/app/backend/hooks/useNavigateToProfile';
import useFetchUser from "@/src/app/backend/hooks/useFetchUser";
import useFetchPosts from "@/src/app/backend/hooks/useFetchPosts";
import usePostActions from "@/src/app/backend/hooks/usePostActions";
import Post from '@/src/app/backend/components/layouts/PostLayout';
import About from '@/src/app/backend/components/panels/columns/AboutPanel';
import Background from '@/src/app/backend/components/Background';

import Listings from '@/src/app/backend/components/panels/timeline/ProfileListingsPanel';
import ProfileAccount from '@/src/app/backend/components/panels/columns/ProfileAccountPanel';
import ProfileComments from '@/src/app/backend/components/panels/columns/ProfileCommentsPanel';
import { PostInterface } from '@/libraries/structures';

export default function Profile() {

  const [handleFromURL, setHandleFromURL] = useState('');
  const pathName = usePathname();

  const extractHandle = (pathName: string) => {
    const parts = pathName.split('/');
    return parts.length >= 3 && parts[1] === 'profile' ? parts[2] : '';
  };

  useEffect(() => {
    const handle = extractHandle(pathName);
    if (handle) {
      console.log('Profile handle:', handle);
      setHandleFromURL(handle);
    }
  }, [pathName]);

  const { user, fetchUser } = useFetchUser({ type: 'handle', handle: handleFromURL });
  const userData = user[0];

  useEffect(() => {
    if (userData) {
      console.log('User data:', userData);
    }
  }, [userData]);

  const { posts, fetchPosts } = useFetchPosts({ type: 'user', userId: userData ? userData.uuid : "" });
  const { handleAddPost, handleDeletePost, handleEditPost } = usePostActions();
  const [svg, setSvg] = useState('');

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
            <Listings handle={userData ? userData.handle : ""}/>
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
  )
}