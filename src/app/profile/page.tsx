"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import TopbarNav from '@/src/app/backend/components/navigators/TopbarNav';
import ExplorerNav from '@/src/app/backend/components/navigators/ExplorerNav';

import useFetchPosts from "@/src/app/backend/hooks/useFetchPosts";
import usePostActions from "@/src/app/backend/hooks/usePostActions";

import Background from '@/src/app/backend/components/panels/BackgroundPanel';
import Post from '@/src/app/backend/components/template/PostTemplate';

import About from '@/src/app/backend/components/panels/columns/AboutPanel';
import ProfileAccount from '@/src/app/backend/components/panels/columns/ProfileAccountPanel';
import ProfileComments from '@/src/app/backend/components/panels/columns/ProfileCommentsPanel';
import Listings from '@/src/app/backend/components/panels/timeline/ProfileListingsPanel';

import { PostInterface } from '@/libraries/structures';
import { UserClass } from '@/libraries/structures';
import useFetchUser from "@/src/app/backend/hooks/useFetchUser";

interface Props {
  user: UserClass;
}

// export default function Profile() {
const Profile: React.FC<Props> = ({ user }) => {

  let activeD = JSON.parse(sessionStorage.getItem('token')!)
  const router = useRouter();

  const { posts, fetchPosts } = useFetchPosts({ type: 'all' }); // TODO: Change type to user
  const { handleAddPost, handleDeletePost, handleEditPost } = usePostActions();
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

  return (
    <main>

      {/* Templates */}
      <Background />
      <TopbarNav />

      <div id="wrapper" className="flex flex-row gap-2 w-full h-full align-center py-20 px-[12%] wr-br justify-between">

        {/* ExplorerNav & Padder */}
        <ExplorerNav wrapperClass="w-40 min-w-[10rem] ex-br" />
        <div id="padder" className="w-40 min-w-[10rem] ex-br"></div>

        <div className="flex flex-row gap-2 justify-center w-full ">

          {/* New Post & Post Loader */}
          <div className="flex flex-col gap-2 h-full overflow-y-visible w-[32rem] lg:mr-[16.5rem]">
            <Listings handle={user ? user.handle : ""}/>
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
          <div className="flex flex-col gap-2 h-full fixed w-[16rem] ml-[32.5rem] ra-br z-[40]">

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
}

export default Profile;