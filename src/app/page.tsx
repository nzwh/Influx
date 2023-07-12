"use client"

import Image from 'next/image';

import React, { useState, useEffect } from 'react';
import { MoveUpRight } from 'lucide-react';

import PostTemplate from '@/src/app/components/template/PostTemplate';
import PostCreate from '@/src/app/components/dialogs/CreatePostPopup';
import Navbar from '@/src/app/components/navigators/TopbarNav';

import Leftside from '@/src/app/components/navigators/ExplorerNav';
import NewPost from './components/panels/NewPostPanel';
import Panel from './components/template/PanelTemplate';
import About from './components/panels/AboutPanel';

import { PostInterface } from '@/libraries/interfaces';

export default function Home() {

  const [isPostCreateOpen, setIsPostCreateOpen] = useState(false);
  const [posts, setPosts] = useState<PostInterface[]>([]);

  useEffect(() => {
    const fetchPosts = () => {
      try {
        const existingPosts: PostInterface[] = require('@/posts.json');
        setPosts(existingPosts);
      } catch (error) {
        console.log('Error reading posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handlePostCreateOpen = () => {
    setIsPostCreateOpen(true);
  };
  const handlePostCreateClose = () => {
    setIsPostCreateOpen(false);
  };

  const handleAddPost = (post: PostInterface) => {
    let existingPosts: PostInterface[] = require('@/posts.json');
    let updatedPosts: PostInterface[] = [post, ...existingPosts];
    existingPosts.unshift(post);
    setPosts(updatedPosts);
  };

  const handlePostDelete = (postId: number) => {
    const newPosts = posts.filter((post) => post.id !== postId);
    setPosts(newPosts);
  };

  let active = {
    user_name: 'Arkustore',
    user_handle: '@arkustore',
    user_icon: '/avatars/temp.jpg',

    user_bio: '',
    user_location: '',
    user_MOD: '',
    user_MOP: '',
  }

  return (
    <main>
      <div id="bg" className="fixed top-0 left-0 z-[-1] w-screen h-screen bg-gradient-to-b from-zinc-50 to-zinc-200"></div>
      <Navbar />
      <section id="wrapper" className="flex flex-row gap-2 w-full h-full align-center py-20 px-[12%] max-2xl:px-0 max-xl:px-0 max-lg:px-0 max-md:px-0 max-sm:px-0 max-xs:px-0 justify-between">

        <Leftside active={active} wrapper_props="w-40 min-w-[10rem] ex-br" />
        <div id="side-divider" className="w-40 min-w-[10rem] ex-br"></div>

        <section className="flex flex-row gap-2 justify-center w-full">
          <section className="flex flex-col gap-2 h-full overflow-y-visible w-[32rem] lg:mr-[16.5rem]">
            
            <div onClick={handlePostCreateOpen}><NewPost /></div>
            {isPostCreateOpen && ( 
              <PostCreate onClose={handlePostCreateClose} onAddPost={handleAddPost} />
            )}
            
            <ul className="flex flex-col gap-2 h-full w-[32rem]">
              {posts.map((post, index) => (
                <li key={index}>
                  <PostTemplate key={index} {...post} onDelete={handlePostDelete} />
                </li>
              ))}
            </ul>
            
          </section>
          <section className="flex flex-col gap-2 h-full fixed w-[16rem] ml-[32.5rem] ra-br">

            <Panel title="Explore" />
            <Panel title="Communities" />
            <About />

          </section>
        </section>

        <section id="quick" className="h-full w-40 gap-4 flex flex-col fixed right-[12%] ex-br">
          <h6 className="text-gray-700 font-medium text-xs">Quick Access</h6>
          <ul className="flex flex-col gap-3">
            <li className="flex flex-row items-center justify-between text-gray-700">
              <div className="flex flex-row items-center">
                <Image className="rounded-sm mr-2" src="/avatars/temp.jpg" alt="User Icon" width={20} height={20} />
                <h6 className="font-regular text-xs">r/influx.io</h6>
                <Image className="rounded-sm" src="/root/verified.svg" alt="Verified" width={18} height={18} />
              </div>
              <h6 className="font-light text-[0.6rem] leading-[0.3rem]">2h ago</h6>
            </li>
            <li className="flex flex-row items-center justify-between text-gray-700">
              <div className="flex flex-row items-center">
                <Image className="rounded-sm mr-2" src="/avatars/temp.jpg" alt="User Icon" width={20} height={20} />
                <h6 className="font-regular text-xs">r/influx.io</h6>
                <Image className="rounded-sm" src="/root/verified.svg" alt="Verified" width={18} height={18} />
              </div>
              <h6 className="font-light text-[0.6rem] leading-[0.3rem]">2h ago</h6>
            </li>
            <li className="flex flex-row items-center justify-between text-gray-700">
              <div className="flex flex-row items-center">
                <Image className="rounded-sm mr-2" src="/avatars/temp.jpg" alt="User Icon" width={20} height={20} />
                <h6 className="font-regular text-xs">r/influx.io</h6>
                <Image className="rounded-sm" src="/root/verified.svg" alt="Verified" width={18} height={18} />
              </div>
              <h6 className="font-light text-[0.6rem] leading-[0.3rem]">2h ago</h6>
            </li>
          </ul>
          <hr />
        </section>
        <div className="w-40 min-w-[10rem] ex-br"></div>

      </section>
    </main>
  )
}
