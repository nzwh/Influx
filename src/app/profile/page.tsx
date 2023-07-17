"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import TopbarNav from '@/src/app/components/navigators/TopbarNav';
import ExplorerNav from '@/src/app/components/navigators/ExplorerNav';

import Post from '@/src/app/components/template/PostTemplate';
import Panel from '@/src/app/components/template/PanelTemplate';
import About from '@/src/app/components/panels/AboutPanel';
import Background from '@/src/app/components/panels/BackgroundPanel';
import ListingsPanel from '@/src/app/components/panels/ListingsPanel';

import PostTemplate from '@/src/app/components/template/PostTemplate';
import ProfileEdit from '@/src/app/components/dialogs/UpdateProfilePopup';

import { Post as PostInterface } from '@/libraries/structures';
import { Bookmark, CreditCard, Inbox, LayoutGrid, Map, Megaphone, Moon, MoveUpRight, Package, RotateCcw, Settings, ShoppingBag, Sparkle, Star, Truck, User } from 'lucide-react';

export default function Profile() {

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

  const [isProfileEditOpen, setIsProfileEditOpen] = useState(false);
  const [posts, setPosts] = useState<PostInterface[]>([]);

  const handleProfileEditOpen = () => {
    setIsProfileEditOpen(true);
  };
  const handleProfileEditClose = () => {
    setIsProfileEditOpen(false);
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
          <ListingsPanel handle={user.handle} />  
            <ul className="flex flex-col gap-2 h-full w-[32rem]">
              {posts.map((post, index) => (
                <li key={index}>
                  <Post key={index} post={post} onDelete={handlePostDelete} />
                </li>
              ))}
            </ul>
          </div>

        <div className="flex flex-col gap-2 h-full fixed w-[16rem] ml-[32.5rem] ra-br">

        <aside onClick={handleProfileEditOpen} className="w-full flex flex-col bg-white rounded-sm p-4 gap-4 cursor-pointer filter drop-shadow-2xl">

          <div className="flex flex-row justify-between items-start">
            <Link href="/profile">
              <div className="flex flex-row items-center gap-2">
                <Image className="rounded-full" src={user.icon} alt="User Icon" width={36} height={36} />
                <div className="flex flex-col justify-center">
                  <h6 className="text-gray-800 font-medium text-md leading-4 tracking-tight">{`${user.first_name} ${user.last_name}`}</h6>
                  <h6 className="text-gray-500 font-regular text-xs leading-4">{user.handle}<span className="text-gray-600 bg-gray-200 font-regular text-[0.5rem] relative top-[-0.1rem] tracking-wider rounded-xl px-1.5 py-0.5 ml-2">VERIFIED</span></h6>
              </div>
            </div>
            </Link>
            <MoveUpRight color="black" size={12}/>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex flex-row items-center gap-2">
              <Map className="opacity-70" color="black" size={12} />
              <h6 className="text-gray-800 font-regular text-xs leading-3">Manila, Philippines</h6>
            </div>
            <div className="flex flex-row items-center gap-2">
              <Star className="opacity-70" color="black" size={12} />
              <h6 className="text-gray-800 font-regular text-xs leading-3">4.2/5 Rating</h6>
            </div>
          </div>

          <p className="text-gray-800 font-light text-xs leading-4">
            For questions or actual photos of the products, please DM us. Thanks!
          </p>

          <div className="flex flex-col justify-center gap-2">
            <div className="flex flex-row items-center gap-2">
              <CreditCard className="opacity-70" color="black" size={12} strokeWidth={3} />
              <h6 className="text-gray-800 font-regular text-xs leading-3">Payment Methods</h6>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex flex-row items-center gap-2">
                <Image className="rounded-sm" src="/icons/b-paypal.svg" alt="PayPal" width={24} height={12} />
                <h6 className="text-gray-800 font-regular text-xs">PayPal</h6>
              </div>
              <div className="flex flex-row items-center gap-2">
                <Image className="rounded-sm" src="/icons/b-credit.svg" alt="Credit Card" width={24} height={12} />
                <h6 className="text-gray-800 font-regular text-xs">Card</h6>
              </div>
              <div className="flex flex-row items-center gap-2">
                <Image className="rounded-sm" src="/icons/b-cash.svg" alt="Cash" width={24} height={12} />
                <h6 className="text-gray-800 font-regular text-xs">Cash</h6>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-2">
            <div className="flex flex-row items-center gap-2">
              <Package className="opacity-70" color="black" size={12} strokeWidth={3} />
              <h6 className="text-gray-800 font-regular text-xs">Delivery Methods</h6>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex flex-row items-center gap-2">
                <Image className="rounded-sm" src="/icons/b-shopee.svg" alt="Shopee Checkout" width={24} height={12} />
                <h6 className="text-gray-950 font-regular text-xs">Shopee Checkout</h6>
              </div>
              <div className="flex flex-row items-center gap-2">
                <Image className="rounded-sm" src="/icons/b-meetup.svg" alt="Meetup" width={24} height={12} />
                <h6 className="text-gray-800 font-regular text-xs">Meetup</h6>
              </div>
            </div>
          </div>
          </aside>

          {isProfileEditOpen && (
          <ProfileEdit onClose={handleProfileEditClose} />
          )}

          <aside className="w-full flex flex-col bg-white rounded-sm p-4 gap-4 filter drop-shadow-2xl">
          <div className="flex flex-row justify-between items-center">
            <h6 className="text-gray-800 font-regular text-xs">Comments</h6>
            <MoveUpRight color="black" size={12}/>
          </div>

          <div className="flex flex-col justify-center gap-1">
            <div className="flex flex-row items-center gap-1">
              <Image className="rounded-full" src="/avatars/temp.jpg" alt="Shop Icon" width={10} height={10} />
              <h6 className="text-gray-800 font-regular text-[0.65rem] leading-3">Influx HQ</h6>
              <h6 className="text-gray-500 font-regular text-[0.65rem] leading-3">@influx.io&ensp;•&ensp;9h ago</h6>
            </div>
            <h6 className="text-gray-800 font-regular text-sm tracking-tight leading-4">Still available?</h6>
            <h6 className="text-gray-400 font-light text-[0.65rem] leading-3">Commented on @thmwlch listing  “Apple MacBook Air - Gold (Renewed)”</h6>
          </div>

          <div className="flex flex-col justify-center gap-1">
            <div className="flex flex-row items-center gap-1">
              <Image className="rounded-full" src="/avatars/temp.jpg" alt="Shop Icon" width={10} height={10} />
              <h6 className="text-gray-800 font-regular text-[0.65rem] leading-3">PledisEnt</h6>
              <h6 className="text-gray-500 font-regular text-[0.65rem] leading-3">@pledis&ensp;•&ensp;2d ago</h6>
            </div>
            <h6 className="text-gray-800 font-regular text-sm tracking-tight leading-4">I sent at DM pls repsond ^^</h6>
            <h6 className="text-gray-400 font-light text-[0.65rem] leading-3">Commented on @mingyu listing  “PBT Carbon Keycaps for Mechanical Keyboards”</h6>
          </div>
          </aside>
          
          <About />

        </div>
      </div>

      <section id="quick" className="h-full w-40 gap-4 flex flex-col fixed right-[12%] xs:hidden sm:hidden md:hidden lg:hidden xl:hidden 2xl:flex 3xl:flex invisible">
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