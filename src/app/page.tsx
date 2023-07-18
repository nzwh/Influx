"use client"

import React, { useState, useEffect } from 'react';

import TopbarNav from '@/src/app/backend/components/navigators/TopbarNav';
import ExplorerNav from '@/src/app/backend/components/navigators/ExplorerNav';

import Post from '@/src/app/backend/components/template/PostTemplate';
import Panel from '@/src/app/backend/components/template/PanelTemplate';
import About from '@/src/app/backend/components/panels/AboutPanel';
import Background from '@/src/app/backend/components/panels/BackgroundPanel';

import NewPost from '@/src/app/backend/components/panels/TimelineNewPostPanel';
import { Post as PostInterface } from '@/libraries/structures';

import supabase from '@/src/app/backend/supabase';

export default function Home() {

  let user = require('@/json/active.json'); // TODO: Load user info dynamically through auth
  const [posts, setPosts] = useState<PostInterface[]>([]);

  // Renders existing posts on page load.
  // TODO: Load from database
  useEffect(() => {
    fetchPosts();
  }, []);
  
  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase.from('posts').select('*');
      if (error) {
        throw error;
      }
      setPosts(data);
    } catch (error) {
      console.log('Error reading posts:', error);
    }
  };

  // Handles adding new posts to the top of the list.
  // TODO: Push to database
  const handleAddPost = async (post: PostInterface) => {
    try {
      const { data, error } = await supabase.from('posts').insert([post]);
      if (error) {
        throw error;
      }
      if (data) {
        setPosts((prevPosts) => [data[0], ...prevPosts]);
      }
    } catch (error) {
      console.log('Error adding post:', error);
    }
  };

  // Handles removing a post from the list.
  // TODO: Relocate to popup
  // TODO: Push to database
  const handlePostDelete = async (postId: number) => {
    try {
      const { error } = await supabase.from('posts').delete().match({ id: postId });
      if (error) {
        throw error;
      }
      const newPosts = posts.filter((post) => post.id !== postId);
      setPosts(newPosts);
    } catch (error) {
      console.log('Error deleting post:', error);
    }
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
            <NewPost onPostRecieve={handleAddPost}/>
            <ul className="flex flex-col gap-2 h-full w-[32rem] z-[50]">
              {posts.map((post) => (
                <li key={post.id}>
                  <Post post={post} onDelete={handlePostDelete} />
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