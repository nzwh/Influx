"use client"

import Image from 'next/image';
import { useState, useEffect } from 'react';

import React from 'react';
import Post from '@/components/Post';
import Navbar from '@/components/Navbar';

import PostDialog from '@/components/PostDialog';

interface Post {
  shop_icon: string;
  shop_name: string;
  shop_handle: string;

  user_icon: string;
  user_name: string;
  user_handle: string;

  timestamp: string;

  price: number;
  negotiable: boolean;

  header: string;
  description: string;
  condition: string;

  tags: string[];
  images: string[];

  upvotes: number;
  downvotes: number;
  shares: number;
  interested: number;
  comments: number;
}

export default function Home() {

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = () => {
      try {
        const existingPosts: Post[] = require('@/posts.json');
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

  const handleAddPost = (post: Post) => {
    let existingPosts: Post[] = require('@/posts.json');
    let updatedPosts: Post[] = [post, ...existingPosts];
    existingPosts.unshift(post);
    setPosts(updatedPosts);
  };

  return (
    <main className="flex flex-col w-screen">
      <div className="fixed top-0 left-0 z-[-1] w-screen h-screen bg-gradient-to-b from-zinc-100 to-zinc-300"></div>
      <Navbar />

      <div className="flex flex-row gap-2 w-full h-full justify-center align-center py-20">
        <section id="leftarea" className="flex flex-col gap-2 h-full w-[38rem]">

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

          {posts.map((post, index) => (
            <Post key={index} {...post} />
          ))}
        </section>

        <section id="rightarea" className="flex flex-col gap-2 h-full w-[18rem]">
          
          <div className="w-full flex flex-col bg-white rounded-lg p-4 gap-4">
            <div className="flex flex-row justify-between">
              <h6 className="text-gray-950 font-bold text-xs tracking-tighter leading-4">Account</h6>
              <Image src="/icons/b-search.svg" alt="Expand" width={12} height={12} />
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
