"use client"

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'
import { PostInterface } from '@/libraries/interfaces';

import Navbar from '@/src/app/components/navigators/TopbarNav';
import PostTemplate from '@/src/app/components/template/PostTemplate';

export default function Search() {

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

  let query : any = useSearchParams().get('q') || "";

  return (
    <main className="flex flex-col w-full">
      <div className="fixed top-0 left-0 z-[-1] w-screen h-screen bg-gradient-to-b from-zinc-100 to-zinc-300"></div>
    <Navbar />
    <section id="wrapper" className="flex w-full h-full justify-center align-center py-20">
      <section id="leftarea" className="flex flex-col gap-2 w-[32rem] h-full overflow-visible">

        <section id="listings" className="w-full flex flex-row justify-between bg-white rounded-sm p-4 gap-4">
          <h6 className="text-gray-800 font-regular text-xs leading-4">Showing results for "{query}".</h6>
        </section>

        <ul className="flex flex-col gap-2 h-full w-[32rem]">
          {posts
            .filter((post) => post.header.includes(query) || post.description.includes(query))
            .map((post, index) => (
            <li key={index}>
              <PostTemplate key={index} {...post} />
            </li>
          ))}
        </ul>
      </section>
    </section>
    
    </main>
  )
}
  