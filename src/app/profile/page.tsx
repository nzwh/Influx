"use client"

import Image from 'next/image';
import Link from 'next/link';

import React, { useState, useEffect } from 'react';

import PostTemplate from '@/src/app/components/template/PostTemplate';
import ProfileEdit from '@/src/app/components/dialogs/UpdateProfilePopup';
import Navbar from '@/src/app/components/navigators/TopbarNav';

import { Post } from '@/libraries/structures';
import { CreditCard, Map, MoveUpRight, Package, RotateCcw, Star } from 'lucide-react';
import { User, Bookmark, Inbox, ShoppingBag, Settings, Sparkle, Truck, Moon, Megaphone, LayoutGrid } from 'lucide-react';

export default function Profile() {

    const [isProfileEditOpen, setIsProfileEditOpen] = useState(false);
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
  
    const handleProfileEditOpen = () => {
      setIsProfileEditOpen(true);
    };
    const handleProfileEditClose = () => {
      setIsProfileEditOpen(false);
    };

    let active = {
      name: 'Arkustore',
      handle: '@arkustore',
      avatar: '/avatars/temp.jpg',
    }

    const handlePostDelete = (postId: number) => {
      const newPosts = posts.filter((post) => post.id !== postId);
      setPosts(newPosts);
    };

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
        <section id="listings" className="w-full flex flex-row justify-between bg-white rounded-sm p-4 gap-4">
            <div className="flex flex-row gap-4 items-center">
              <h6 className="text-gray-800 font-regular text-xs leading-4">Listings by Arkustore</h6>
              <h6 className="text-gray-800 font-regular text-xs leading-4">View all</h6>
            </div>

            <div className="flex flex-row gap-2 items-center">
              <div>
                <div className="flex flex-row gap-1 items-center justify-center px-1">
                  <RotateCcw className="opacity-70" color="black" size={12} strokeWidth={3} />
                  <h6 className="text-gray-800 font-regular text-xs leading-3">Recent</h6>
                </div>
                <div className="relative">
                  <div className="absolute bottom-[-1.1rem] w-full h-[5px] bg-gray-800"></div>
                </div>
              </div>
              
              <div className="flex flex-row gap-2 items-center justify-center px-1">
                <Star className="opacity-70" color="black" size={12} strokeWidth={3} />
                <h6 className="text-gray-800 font-regular text-xs leading-3">Popular</h6>
              </div>
            </div>
          </section>
          
          <ul className="flex flex-col gap-2 h-full w-[32rem]">
            {posts.map((post, index) => (
              <li key={index}>
                <PostTemplate key={index} post={post} onDelete={handlePostDelete} />
              </li>
            ))}
          </ul>
        </section>
        <section id="rightarea" className="flex flex-col gap-2 h-full fixed w-[16rem] ml-[32.5rem] xs:hidden sm:hidden md:hidden lg:flex xl:flex 2xl:flex 3xl:flex">

        <aside onClick={handleProfileEditOpen} className="w-full flex flex-col bg-white rounded-sm p-4 gap-4 cursor-pointer">

          <div className="flex flex-row justify-between items-start">
            <Link href="/profile">
              <div className="flex flex-row items-center gap-2">
                <Image className="rounded-full" src={active.avatar} alt="User Icon" width={36} height={36} />
                <div className="flex flex-col justify-center">
                  <h6 className="text-gray-800 font-medium text-md leading-4 tracking-tight">{active.name}</h6>
                  <h6 className="text-gray-500 font-regular text-xs leading-4">{active.handle}<span className="text-gray-600 bg-gray-200 font-regular text-[0.5rem] relative top-[-0.1rem] tracking-wider rounded-xl px-1.5 py-0.5 ml-2">VERIFIED</span></h6>
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

          <aside className="w-full flex flex-col bg-white rounded-sm p-4 gap-4">
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
          
          <aside className="bg-white flex flex-col w-full rounded-sm p-4">
            <h6 className="text-gray-800 font-regular text-xs">About  •  Terms  •  Documentation  •  Legal
            <br/>influx.io © 2023.  Made with Next.js.</h6>
          </aside>

        </section>
      </section>

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