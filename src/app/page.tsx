"use client"

import React, { useState, useEffect } from 'react';

import TopbarNav from '@/src/app/components/navigators/TopbarNav';
import ExplorerNav from '@/src/app/components/navigators/ExplorerNav';

import Post from '@/src/app/components/template/PostTemplate';
import Panel from '@/src/app/components/template/PanelTemplate';
import NewPost from '@/src/app/components/panels/NewPostPanel';
import About from '@/src/app/components/panels/AboutPanel';
import Background from '@/src/app/components/panels/BackgroundPanel';

import { Post as PostInterface } from '@/libraries/structures';

export default function Home() {

  const [posts, setPosts] = useState<PostInterface[]>([]);
  let user = require('@/json/active.json'); // TODO: Load user info dynamically through auth

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

  // Handles adding new posts to the top of the list.
  // TODO: Push to database
  const handleAddPost = (post: PostInterface) => {
    setPosts((prevPosts) => [post, ...prevPosts]);
  };

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
      <TopbarNav />
      
      <div id="wrapper" className="flex flex-row gap-2 w-full h-full align-center py-20 px-[12%] wr-br justify-between">

        {/* ExplorerNav & Padder */}
        <ExplorerNav user={user} wrapperClass="w-40 min-w-[10rem] ex-br" />
        <div id="padder" className="w-40 min-w-[10rem] ex-br"></div>

        <div className="flex flex-row gap-2 justify-center w-full ">

          {/* New Post & Post Loader */}
          <div className="flex flex-col gap-2 h-full overflow-y-visible w-[32rem] lg:mr-[16.5rem]">
            <NewPost onPostRecieve={handleAddPost}/>
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
            <Panel title="Explore" />
            <Panel title="Communities" />
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