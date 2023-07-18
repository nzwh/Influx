"use client"

import React, { useState, useEffect } from 'react';

import TopbarNav from '@/src/app/backend/components/navigators/TopbarNav';
import ExplorerNav from '@/src/app/backend/components/navigators/ExplorerNav';

import Post from '@/src/app/backend/components/template/PostTemplate';
import About from '@/src/app/backend/components/panels/AboutPanel';
import Background from '@/src/app/backend/components/panels/BackgroundPanel';

import Listings from '@/src/app/backend/components/panels/ProfileListingsPanel';
import ProfileDetails from '@/src/app/backend/components/panels/ProfileDetailsPanel';
import ProfileComments from '@/src/app/backend/components/panels/ProfileCommentsPanel';
import { Post as PostInterface } from '@/libraries/structures';

export default function Profile() {

  let user = require('@/json/active.json'); // TODO: Load user info dynamically through auth
  const [posts, setPosts] = useState<PostInterface[]>([]);

  // Renders existing posts on page load.
  // TODO: Load from database
  useEffect(() => {
    const fetchPosts = () => {
      try {
        const existingPosts: PostInterface[] = require('@/json/posts.json');
        setPosts(existingPosts);
      } catch (error) {
        console.log('Error reading posts:', error);
      }
    };
    fetchPosts();
  }, []);

  // Handles removing a post from the list.
  // TODO: Relocate to popup
  // TODO: Push to database
  const handlePostDelete = (postId: number) => {
    const newPosts = posts.filter((post) => post.id !== postId);
    setPosts(newPosts);
  };

  return (
    <main>

      {/* Templates */}
      <Background />
      <TopbarNav /> { /*// TODO: Add Create Post hook */ }

      <div id="wrapper" className="flex flex-row gap-2 w-full h-full align-center py-20 px-[12%] wr-br justify-between">

        {/* ExplorerNav & Padder */}
        <ExplorerNav user={user} wrapperClass="w-40 min-w-[10rem] ex-br" />
        <div id="padder" className="w-40 min-w-[10rem] ex-br"></div>

        <div className="flex flex-row gap-2 justify-center w-full ">

          {/* New Post & Post Loader */}
          <div className="flex flex-col gap-2 h-full overflow-y-visible w-[32rem] lg:mr-[16.5rem]">
            <Listings handle={user.handle}/>
            <ul className="flex flex-col gap-2 h-full w-[32rem]">
              {posts.map((post, index) => (
                <li key={index}>
                  <Post key={index} post={post} onDelete={handlePostDelete} />
                </li>
              ))}
            </ul>
          </div>
          
          {/* Panels */}
          <div className="flex flex-col gap-2 h-full fixed w-[16rem] ml-[32.5rem] ra-br">

            <ProfileDetails />
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