"use client"

import Image from 'next/image';
import { useState, useEffect } from 'react';
import React from 'react';

import { Package, Map, Film, Tag, MoveUpRight, MoreVertical } from 'lucide-react';

import PostTemplate from '@/src/app/components/PostTemplate';
import PostCreate from '@/src/app/components/PostCreate';
import PostOpen from '@/src/app/components/PostOpen';
import Navbar from '@/src/app/components/Navbar';

import { PostInterface } from '@/libraries/interfaces';
import Link from 'next/link';

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

  const [isPostOpenOpen, setIsPostOpenOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<PostInterface | null>(null);

  const handlePostOpenOpen = (post: PostInterface) => {
    setSelectedPost(post);
    setIsPostOpenOpen(true);
  };

  const handlePostOpenClose = () => {
    setSelectedPost(null);
    setIsPostOpenOpen(false);
  };

  return (
    <main>
      <div id="bg" className="fixed top-0 left-0 z-[-1] w-screen h-screen bg-gradient-to-b from-zinc-100 to-zinc-300"></div>

      <Navbar />
      <div id="wrapper" className="flex flex-row gap-2 w-full h-full justify-center align-center py-20">
        <section id="leftarea" className="flex flex-col gap-2 w-[32rem] h-full mr-[16.5rem] overflow-visible">
          <div onClick={handlePostCreateOpen} className="bg-white flex flex-row w-full justify-between rounded-sm py-3 px-4 cursor-pointer">
            <div className="flex flex-row gap-3 items-center">
              <Image className="rounded-full" src="/avatars/temp.jpg" alt="User Icon" width={22} height={22} />
              <h6 className="text-gray-500 font-normal text-xs">Post about something...</h6>
            </div>

            <div className="flex flex-row gap-3 items-center">
              <Package className="opacity-70" color="black" size={14}/>
              <Map className="opacity-70" color="black" size={14}/>
              <Film className="opacity-70" color="black" size={14}/>
              <Tag className="opacity-70" color="black" size={14}/>
            </div>
          </div>

          {isPostCreateOpen && (
            <PostCreate onClose={handlePostCreateClose} onAddPost={handleAddPost} />
          )}
          
          <ul className="flex flex-col gap-2 h-full w-[32rem]">
            {posts.map((post, index) => (
              <li key={index} onClick={handlePostOpenOpen.bind(null, post)} className="cursor-pointer">
                <PostTemplate key={index} {...post} />
              </li>
            ))}

            {isPostOpenOpen && (
              <PostOpen post={selectedPost} onClose={handlePostOpenClose} />
            )}
          </ul>
        </section>
        
        <section id="rightarea" className="flex flex-col gap-2 w-[16rem] h-full fixed ml-[32.5rem]">
          <div className="bg-white flex flex-col w-full rounded-sm p-4 gap-4">
            <div className="flex flex-row justify-between items-center">
              <h6 className="text-gray-800 font-regular text-xs">Account</h6>
              <MoveUpRight color="black" size={12}/>
            </div>
            
            <div className="flex flex-row justify-between items-center">
            <Link href="/profile">
              <div className="flex flex-row items-center gap-2">
                <Image className="rounded-full" src="/avatars/temp.jpg" alt="User Icon" width={40} height={40} />
                <div className="flex flex-col justify-center">
                  <h6 className="text-gray-800 font-medium text-lg leading-5">Arkustore</h6>
                  <h6 className="text-gray-500 font-regular text-xs leading-4">@arkustore <span className="text-gray-800 bg-gray-200 font-regular text-[0.5rem] tracking-wider rounded-xl px-1.5 py-0.5 ml-2">VERIFIED</span></h6>
                </div>
              </div>
            </Link>

              <MoreVertical color="black" size={12}/>
            </div>
          </div>
          
          <div className="bg-white flex flex-col w-full rounded-sm p-4">
            <h6 className="text-gray-800 font-regular text-xs">About  •  Terms  •  Documentation  •  Legal influx.io © 2023.  Made with Next.js.</h6>
          </div>
        </section>
      </div>
    </main>
  )
}
