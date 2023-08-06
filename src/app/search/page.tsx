"use client"

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'
import Image from 'next/image';

import TopbarNav from '@/src/app/backend/components/navigators/TopbarNav';
import ExplorerNav from '@/src/app/backend/components/navigators/ExplorerNav';

import Post from '@/src/app/backend/components/layouts/PostLayout';
import About from '@/src/app/backend/components/panels/columns/AboutPanel';
import Background from '@/src/app/backend/components/Background';
import useSearchPosts from "@/src/app/backend/hooks/SearchPosts";
import usePostActions from "@/src/app/backend/hooks/usePostActions";
import SearchFilters from '@/src/app/backend/components/panels/columns/SearchFiltersPanel';

import { PostClass, PostInterface } from '@/libraries/structures';

export default function Search() {

  const [posts, setPosts] = useState<PostClass[]>([])

  const { handleAddPost, handleDeletePost, handleEditPost } = usePostActions();
  let query : string = useSearchParams().get('u')?.toLowerCase() || "...";
  let u = useSearchParams().get('u')?.toLowerCase();
  let s = useSearchParams().get('s')?.toLowerCase();
  let so = useSearchParams().get('so')?.toLowerCase();
  let c = useSearchParams().get('c')?.toLowerCase();
  let t = useSearchParams().get('t')?.toLowerCase();
  let rs = useSearchParams().get('rs')?.toLowerCase();
  let re = useSearchParams().get('re')?.toLowerCase();
  let tg = useSearchParams().get('tg')?.toLowerCase();
  let o = useSearchParams().get('o')?.toLowerCase();
  let ow = useSearchParams().get('ow')?.toLowerCase();
  const { searchPosts } = useSearchPosts({ u, s, so, c, t, rs, re, tg, o, ow, setPosts: setPosts });

  useEffect(() => { searchPosts() }, [u, s, so, c, t, rs, re, tg, o, ow ])
  
  return (
    <main>

      {/* Templates */}
      <Background />
      <TopbarNav />

      <div id="wrapper" className="flex flex-row gap-2 w-full h-full align-center py-20 px-[12%] wr-br justify-between z-50">

        <ExplorerNav wrapperClass="w-40 min-w-[10rem] ex-br" />
        <div id="padder" className="w-40 min-w-[10rem] ex-br"></div>

        <div className="flex flex-row gap-2 justify-center w-full">

          {/* New Post & Post Loader */}
          <div className="flex flex-col gap-2 h-full overflow-y-visible w-[32rem] lg:mr-[16.5rem] z-50">

            <section className="w-full flex flex-row justify-between bg-white rounded-sm p-4 gap-4">
              <h6 className="text-gray-800 font-regular text-xs leading-4">Showing results for {query}</h6>
            </section>
            {posts.length ? (
              <ul className="flex flex-col gap-2 h-full w-[32rem]">
                {posts
                .map((post: PostClass) => (
                  <li key={post.id}>
                    <Post post={post} onDelete={function (value: React.SetStateAction<PostClass>): void {
                      throw new Error('Function not implemented.');
                    } } onEdit={function (value: React.SetStateAction<PostClass>): void {
                      throw new Error('Function not implemented.');
                    } }  />
                  </li>
                ))}
              </ul>
            ):(
              <span className="flex flex-col items-center justify-center z-[-2]">
                <Image src={'/empty-illustration.png'} width={1000} height={1000} alt="No posts" className=" w-[50%]"/>
                <p className='text-gray-700 text-sm'>No posts to show</p>
              </span>
            )}
          </div>

          {/* Panels */}
          <div className="flex flex-col gap-2 h-full fixed w-[16rem] ml-[32.5rem] ra-br z-40">
            <SearchFilters />
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
