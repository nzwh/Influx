"use client"

import Image from 'next/image';
import Link from 'next/link';

import React, { useState, useEffect } from 'react';
import { Package, Map, Film, Tag, MoveUpRight,  User, Bookmark, Inbox, ShoppingBag, Settings, Sparkle, Truck, Moon, Megaphone, LayoutGrid } from 'lucide-react';

import PostTemplate from '@/src/app/components/PostTemplate';
import PostCreate from '@/src/app/components/PostCreate';
import Navbar from '@/src/app/components/Navbar';

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
    name: 'Arkustore',
    handle: '@arkustore',
    avatar: '/avatars/temp.jpg',
  }

  return (
    <main>
      <div id="bg" className="fixed top-0 left-0 z-[-1] w-screen h-screen bg-gradient-to-b from-zinc-50 to-zinc-200"></div>
      <Navbar />
      <section id="wrapper" className="flex flex-row gap-2 w-full h-full align-center py-20 px-[12%] max-2xl:px-0 max-xl:px-0 max-lg:px-0 max-md:px-0 max-sm:px-0 max-xs:px-0 justify-between">

        <section id="profile" className="w-40 gap-6 flex flex-col fixed xs:hidden sm:hidden md:hidden lg:hidden xl:hidden 2xl:flex 3xl:flex">
          <Link href="/profile" className="flex flex-row items-center gap-2">
            <Image className="rounded-full" src={active.avatar} alt="User Icon" width={36} height={36} />
            <div className="flex flex-col justify-center">
              <div className="flex flex-row items-center gap-0.5 h-[0.9rem]">
                <h6 className="text-gray-800 font-medium text-md leading-4 tracking-tight">{active.name}</h6>
                <Image src="/root/verified.svg" width={20} height={20} alt="Verified" />
              </div>
              <h6 className="text-gray-500 font-regular text-xs leading-4">{active.handle}</h6>
            </div>
          </Link>

          <ul className="flex flex-col gap-3">
            <li className="flex flex-row items-center gap-2 text-gray-700">
              <Sparkle size={16} strokeWidth={3}/>
              <h6 className="font-regular text-sm">Explore</h6>
            </li>
            <li className="flex flex-row items-center gap-2 text-gray-700">
              <Bookmark size={16} strokeWidth={3}/>
              <h6 className="font-regular text-sm">Bookmarks</h6>
            </li>
            <li className="flex flex-row items-center gap-2 text-gray-700">
              <Megaphone size={16} strokeWidth={3}/>
              <h6 className="font-regular text-sm">Notifications</h6>
            </li>
            <hr />
            <li className="flex flex-row items-center gap-2 text-gray-700">
              <Inbox size={16} strokeWidth={3}/>
              <h6 className="font-regular text-sm">Messages</h6>
            </li>
            <li className="flex flex-row items-center gap-2 text-gray-700">
              <Truck size={16} strokeWidth={3}/>
              <h6 className="font-regular text-sm">Tracking</h6>
            </li>
            <li className="flex flex-row items-center gap-2 text-gray-700">
              <ShoppingBag size={16} strokeWidth={3}/>
              <h6 className="font-regular text-sm">Shopping Cart</h6>
            </li>
            <hr />
            <li className="flex flex-row items-center gap-2 text-gray-700">
              <Moon size={16} strokeWidth={3}/>
              <h6 className="font-regular text-sm">Theme</h6>
            </li>
            <li className="flex flex-row items-center gap-2 text-gray-700">
              <User size={16} strokeWidth={3}/>
              <h6 className="font-regular text-sm">Profile</h6>
            </li>
            <li className="flex flex-row items-center gap-2 text-gray-700">
              <Settings size={16} strokeWidth={3}/>
              <h6 className="font-regular text-sm">Settings</h6>
            </li>
            <hr />
            <li className="flex flex-row items-center gap-2 text-gray-700">
              <LayoutGrid size={16} strokeWidth={3}/>
              <h6 className="font-regular text-sm">More</h6>
            </li>
          </ul>
        </section>
        <div className="w-40 min-w-[10rem] xs:hidden sm:hidden md:hidden lg:hidden xl:hidden 2xl:flex 3xl:flex"></div>

        <section className="flex flex-row gap-2 justify-center w-full">
          <section id="leftarea" className="flex flex-col gap-2 h-full overflow-y-visible w-[32rem] lg:mr-[16.5rem]">
            <section id="create_post" onClick={handlePostCreateOpen} className="bg-white flex flex-row w-full justify-between rounded-sm py-3 px-4 cursor-pointer">
              <div className="flex flex-row gap-3 items-center">
                <Image className="rounded-full" src="/avatars/temp.jpg" alt="User Icon" width={22} height={22} />
                <h6 className="text-gray-500 font-normal text-xs">Post about something...</h6>
              </div>

              <div className="flex flex-row gap-4 items-center">
                <Package className="opacity-70" color="black" size={14}/>
                <Map className="opacity-70" color="black" size={14}/>
                <Film className="opacity-70" color="black" size={14}/>
                <Tag className="opacity-70" color="black" size={14}/>
              </div>
            </section>

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
          <section id="rightarea" className="flex flex-col gap-2 h-full fixed w-[16rem] ml-[32.5rem] xs:hidden sm:hidden md:hidden lg:flex xl:flex 2xl:flex 3xl:flex">

            <aside id="explore" className="bg-white flex flex-col w-full rounded-sm p-4 gap-4">
              <div className="flex flex-row justify-between items-center">
                <h6 className="text-gray-800 font-regular text-xs">Explore</h6>
                <MoveUpRight color="black" size={12}/>
              </div>
            </aside>

            <aside id="communities" className="bg-white flex flex-col w-full rounded-sm p-4 gap-4">
              <div className="flex flex-row justify-between items-center">
                <h6 className="text-gray-800 font-regular text-xs">Communities</h6>
                <MoveUpRight color="black" size={12}/>
              </div>
            </aside>
            
            <aside className="bg-white flex flex-col w-full rounded-sm p-4">
              <h6 className="text-gray-800 font-regular text-xs">About  •  Terms  •  Documentation  •  Legal
              <br/>influx.io © 2023.  Made with Next.js.</h6>
            </aside>

          </section>
        </section>

        <section id="quick" className="h-full w-40 gap-4 flex flex-col fixed right-[12%] xs:hidden sm:hidden md:hidden lg:hidden xl:hidden 2xl:flex 3xl:flex">
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
        <div className="w-40 min-w-[10rem] xs:hidden sm:hidden md:hidden lg:hidden xl:hidden 2xl:block 3xl:flex"></div>

      </section>
    </main>
  )
}
