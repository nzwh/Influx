"use client"

import React, { useState, useEffect } from 'react';

import CreatePostPopup from '@/src/app/components/dialogs/CreatePostPopup';
import TopbarNav from '@/src/app/components/navigators/TopbarNav';
import ExplorerNav from '@/src/app/components/navigators/ExplorerNav';

import Post from '@/src/app/components/template/PostTemplate';
import Panel from '@/src/app/components/template/PanelTemplate';
import NewPost from '@/src/app/components/panels/NewPostPanel';
import About from '@/src/app/components/panels/AboutPanel';
import Background from './components/panels/BackgroundPanel';

import { Post as PostInterface } from '@/libraries/structures';

export default function Home() {

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

  const [isCreatePostPopupOpen, setIsCreatePostPopupOpen] = useState(false);
  const [posts, setPosts] = useState<PostInterface[]>([]);
  
  const handleCreatePostPopupOpen = () => {
    setIsCreatePostPopupOpen(true);
  };
  const handleCreatePostPopupClose = () => {
    setIsCreatePostPopupOpen(false);
  };

  const handleAddPost = (post: PostInterface) => {
    let existingPosts: PostInterface[] = require('@/json/posts.json');
    let updatedPosts: PostInterface[] = [post, ...existingPosts];
    existingPosts.unshift(post);
    setPosts(updatedPosts);
  };

  const handlePostDelete = (postId: number) => {
    const newPosts = posts.filter((post) => post.id !== postId);
    setPosts(newPosts);
  };

  let user = require('@/json/active.json');

  return (
    <main>
      <Background />
      <TopbarNav />

      <section id="wrapper" className="flex flex-row gap-2 w-full h-full align-center py-20 px-[12%] wr-br justify-between">
        <ExplorerNav user={user} wrapperClass="w-40 min-w-[10rem] ex-br" />
        <div id="side-divider" className="w-40 min-w-[10rem] ex-br"></div>

        <div className="flex flex-row gap-2 justify-center w-full">
          <div className="flex flex-col gap-2 h-full overflow-y-visible w-[32rem] lg:mr-[16.5rem]">
            <div onClick={handleCreatePostPopupOpen}>
              <NewPost />
            </div>
            {isCreatePostPopupOpen && ( 
              <CreatePostPopup onClose={handleCreatePostPopupClose} onAddPost={handleAddPost} />
            )}
            <ul className="flex flex-col gap-2 h-full w-[32rem]">
              {posts.map((post, index) => (
                <li key={index}>
                  <Post key={index} post={post} onDelete={handlePostDelete} />
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-2 h-full fixed w-[16rem] ml-[32.5rem] ra-br">
            <Panel title="Explore" />
            <Panel title="Communities" />
            <About />
          </div>
        </div>

        <div id="quick" className="h-full w-40 min-w-[10rem] gap-4 flex flex-col fixed right-[12%] ex-br"></div>
        <div className="w-40 min-w-[10rem] ex-br"></div>
      </section>
    </main>
  )
}