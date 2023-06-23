"use client"

import Image from 'next/image';

import { useState, useEffect } from 'react';
import React from 'react';

import Post from '@/src/app/components/PostTemplate';
import Navbar from '@/src/app/components/Navbar';
import PostDialog from '@/src/app/components/PostCreate';
import OpenDialog from '@/src/app/components/PostOpen';

import { PostInterface } from '@/libraries/interfaces';

export default function Home() {

  // for create post
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };
  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleAddPost = (post: PostInterface) => {
    let existingPosts: PostInterface[] = require('@/posts.json');
    let updatedPosts: PostInterface[] = [post, ...existingPosts];
    existingPosts.unshift(post);
    setPosts(updatedPosts);
  };

  // for open post
  const [isOpenDialogOpen, setIsOpenDialogOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<PostInterface | null>(null);

  const handleOpenDialogOpen = (post: PostInterface) => {
    setSelectedPost(post);
    setIsOpenDialogOpen(true);
  };

  const handleOpenDialogClose = () => {
    setSelectedPost(null);
    setIsOpenDialogOpen(false);
  };

  return (
    <main className="flex flex-col w-full">
      <div className="fixed top-0 left-0 z-[-1] w-screen h-screen bg-gradient-to-b from-zinc-100 to-zinc-300"></div>
      <Navbar />
      <div className="flex flex-row gap-2 w-full h-full justify-center align-center py-20">
    
        <section id="leftarea" className="flex flex-col gap-2 h-full w-[38rem] overflow-auto mr-[18.5rem]">
          <div onClick={handleDialogOpen} className="w-full flex flex-row justify-between bg-white rounded-lg p-4 gap-4 cursor-pointer">
            <div className="flex flex-row gap-4 items-center">
              <Image className="rounded-full" src="/avatars/temp.jpg" alt="Expand" width={24} height={24} />
              <h6 className="text-gray-400 font-bold text-sm tracking-tighter leading-4">Post about something...</h6>
            </div>
            
            <div className="flex flex-row gap-4 items-center">
              <Image src="/icons/b-pkg.svg" alt="Expand" width={16} height={16} />
              <Image src="/icons/b-map.svg" alt="Expand" width={16} height={16} />
              <Image src="/icons/b-media.svg" alt="Expand" width={16} height={16} />
              <Image src="/icons/b-tag.svg" alt="Expand" width={16} height={16} />
            </div>
          </div>

          {isDialogOpen && (
            <PostDialog onClose={handleDialogClose} onAddPost={handleAddPost} />
          )}

          <ul className="flex flex-col gap-2 h-full w-[38rem]">
            {posts.map((post, index) => (
              <li key={index} onClick={handleOpenDialogOpen.bind(null, post)} className="cursor-pointer">
                <Post key={index} {...post} />
              </li>
            ))}
            {isOpenDialogOpen && (
              <OpenDialog post={selectedPost} onClose={handleOpenDialogClose} />
            )}
          </ul>
        </section>

        <section id="rightarea" className="flex flex-col gap-2 h-full w-[18rem] ml-[38.5rem] fixed">
          <div className="w-full flex flex-col bg-white rounded-lg p-4 gap-4">
            <div className="flex flex-row justify-between">
              <h6 className="text-gray-950 font-bold text-xs tracking-tighter leading-4">Account</h6>
              <Image src="/icons/b-arrupr.svg" alt="Expand" width={12} height={12} />
            </div>

            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row items-center gap-2">
                <Image className="rounded-full" src="/avatars/temp.jpg" alt="User Icon" width={40} height={40} />
                <div className="flex flex-col justify-center">
                  <h6 className="text-gray-950 font-bold text-lg tracking-tighter leading-5">Arkustore</h6>
                  <h6 className="text-gray-500 font-bold text-xs tracking-tighter leading-4">@arkustore
                    <span className="text-black font-extrabold text-[0.5rem] bg-gray-300 rounded-xl px-2 py-0.5 tracking-normal relative top-[-0.04rem] ml-2">SELLER</span>
                  </h6>
                </div>
              </div>
              <Image className="rotate-90" src="/icons/b-more-h.svg" alt="More Button" width={14} height={14} />
            </div>
          </div>

          <div className="w-full flex flex-col bg-white rounded-lg p-4">
            <h6 className="text-gray-950 font-bold text-xs tracking-tighter leading-4">About  •  Terms  •  Documentation  •  Repository</h6>
            <h6 className="text-gray-950 font-bold text-xs tracking-tighter leading-4">influx.io © 2023.  Made with Next.js.</h6>
          </div>
        </section>
      </div>
    </main>
  )
}
