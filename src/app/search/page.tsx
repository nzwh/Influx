"use client"

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'
import Image from 'next/image';

import TopbarNav from '@/src/app/backend/components/navigators/TopbarNav';
import ExplorerNav from '@/src/app/backend/components/navigators/ExplorerNav';

import Listings from '@/src/app/backend/components/panels/timeline/ProfileListingsPanel';
import Post from '@/src/app/backend/components/template/PostTemplate';
import About from '@/src/app/backend/components/panels/columns/AboutPanel';
import Background from '@/src/app/backend/components/panels/BackgroundPanel';

import { Post as PostInterface } from '@/libraries/structures';

export default function Search() {

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

  let query : string = useSearchParams().get('q')?.toLowerCase() || "";

  return (
    <main>

      {/* Templates */}
      <Background />
      <TopbarNav /> { /*// TODO: Add Create Post hook */ }

      <div id="wrapper" className="flex flex-row gap-2 w-full h-full align-center py-20 px-[12%] wr-br justify-between">

        {/* ExplorerNav & Padder */}
        {/* <ExplorerNav user={user} wrapperClass="w-40 min-w-[10rem] ex-br" /> */}
        <ExplorerNav wrapperClass="w-40 min-w-[10rem] ex-br" />
        <div id="padder" className="w-40 min-w-[10rem] ex-br"></div>

        <div className="flex flex-row gap-2 justify-center w-full ">

          {/* New Post & Post Loader */}
          <div className="flex flex-col gap-2 h-full overflow-y-visible w-[32rem] lg:mr-[16.5rem] z-50">
            
            <section id="listings" className="w-full flex flex-row justify-between bg-white rounded-sm p-4 gap-4">
              <h6 className="text-gray-800 font-regular text-xs leading-4">Showing results for "{query}".</h6>
            </section>

            <ul className="flex flex-col gap-2 h-full w-[32rem]">
              {posts
                .filter((post) => post.title.includes(query) || post.description.includes(query))
                .map((post, index) => (
                <li key={index}>
                  <Post key={index} post={post} onDelete={handlePostDelete} />
                </li>
              ))}
              {posts.length == 0 && (
                <span className="flex flex-col items-center justify-center z-0">
                  <Image src={'/empty-illustration.png'} width={1000} height={1000} alt="No posts" className=" w-[50%]"/>
                  <p className='text-gray-700 text-sm'>No posts to show</p>
                </span>
              )}
            </ul>
          </div>
          
          {/* Panels */}
          <div className="flex flex-col gap-2 h-full fixed w-[16rem] ml-[32.5rem] ra-br">
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
  