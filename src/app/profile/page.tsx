import Image from 'next/image';
import Link from 'next/link';

import React from 'react';
import Post from '@/src/app/components/Post';
import Navbar from '@/src/app/components/Navbar';

import posts from '../posts.json';
export default function Home() {
  return (
      
    <main className="flex flex-col w-screen">
      <div className="fixed top-0 left-0 z-[-1] w-screen h-screen bg-gradient-to-b from-zinc-100 to-zinc-300"></div>
      <Navbar />

      <div className="flex flex-row gap-2 w-full h-full justify-center align-center py-20">
        <section id="leftarea" className="flex flex-col gap-2 h-full w-[38rem]">

          <section className="w-full flex flex-row justify-between bg-white rounded-lg p-4 gap-4">
            <div className="flex flex-row gap-4 items-center">
              <h6 className="text-gray-950 font-bold text-md tracking-tighter leading-4">Listings by Arkustore</h6>
              <h6 className="text-gray-950 font-bold text-xs tracking-tighter leading-4">View all</h6>
            </div>
            <div className="flex flex-row gap-4 items-center">
              <div className="col">
                <div className="flex flex-row gap-2 items-center justify-center">
                  <Image src="/icons/b-chart.svg" alt="Recent" width={16} height={16} />
                  <h6 className="text-gray-950 font-bold text-sm tracking-tighter leading-4">Recent</h6>
                </div>
                <div className="relative">
                  <div
                    style={{ position: 'absolute', bottom: '-16px', width: '100%', height: '10px', backgroundColor: '#000' }}
                  ></div>
                </div>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <Image src="/icons/b-star.svg" alt="Popular" width={16} height={16} />
                <h6 className="text-gray-950 font-bold text-sm tracking-tighter leading-4">Popular</h6>
              </div>
            </div>
          </section>

          {posts.map((post, index) => (
            <Post key={index} {...post} />
          ))}
        </section>

        <section id="rightarea" className="flex flex-col gap-2 h-full w-[18rem]">
          
          <div className="w-full flex flex-col bg-white rounded-lg p-4 gap-4">
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row items-center gap-2">
                <Image className="rounded-full" src="/avatars/temp.jpg" alt="User Icon" width={40} height={40} />
                <div className="flex flex-col justify-center">
                  <h6 className="text-gray-950 font-bold text-md tracking-tighter leading-5">Arkustore</h6>
                  <h6 className="text-gray-500 font-bold text-xs tracking-tighter leading-4">@arkustore
                    <span className="text-black font-extrabold text-[0.5rem] bg-gray-300 rounded-xl px-2 py-0.5 tracking-normal relative top-[-0.04rem] ml-2">BUSINESS</span>
                  </h6>
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center gap-4">
              <div className="flex flex-row items-center gap-2">
                <Image src="/icons/b-map-t.svg" alt="Location" width={11} height={11} />
                <h6 className="text-gray-800 font-bold text-xs tracking-tighter leading-4">Manila, Philippines</h6>
              </div>
              <div className="flex flex-row items-center gap-2">
                <Image src="/icons/b-star-t.svg" alt="Location" width={11} height={11} />
                <h6 className="text-gray-800 font-bold text-xs tracking-tighter leading-4">4.2/5 Rating</h6>
              </div>
            </div>
            <p className="text-gray-800 font-medium text-sm tracking-tighter leading-4">
              For questions or actual photos of the products, please DM us. Thanks!
            </p>
            <div className="flex flex-col justify-center gap-2">
              <div className="flex flex-row items-center gap-2">
                <Image src="/icons/b-card.svg" alt="Payment Methods" width={11} height={11} />
                <h6 className="text-gray-800 font-bold text-xs tracking-tighter leading-4">Payment Methods</h6>
              </div>
              <div className="flex flex-row items-center gap-2">
                <div className="flex flex-row items-center gap-2">
                  <Image src="/icons/b-paypal.svg" alt="PayPal" width={22} height={12} />
                  <h6 className="text-gray-950 font-bold text-xs tracking-tighter leading-4">PayPal</h6>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <Image src="/icons/b-credit.svg" alt="Credit Card" width={22} height={12} />
                  <h6 className="text-gray-950 font-bold text-xs tracking-tighter leading-4">Credit Card</h6>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <Image src="/icons/b-cash.svg" alt="Recent" width={22} height={12} />
                  <h6 className="text-gray-950 font-bold text-xs tracking-tighter leading-4">Cash</h6>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center gap-2">
              <div className="flex flex-row items-center gap-2">
                <Image src="/icons/b-box.svg" alt="Delivery Methods" width={11} height={11} />
                <h6 className="text-gray-800 font-bold text-xs tracking-tighter leading-4">Delivery Methods</h6>
              </div>
              <div className="flex flex-row items-center gap-2">
                <div className="flex flex-row items-center gap-2">
                  <Image src="/icons/b-shopee.svg" alt="Shopee Checkout" width={22} height={12} />
                  <h6 className="text-gray-950 font-bold text-xs tracking-tighter leading-4">Shopee Checkout</h6>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <Image src="/icons/b-meetup.svg" alt="Meetup" width={22} height={12} />
                  <h6 className="text-gray-950 font-bold text-xs tracking-tighter leading-4">Meetup</h6>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col bg-white rounded-lg p-4 gap-4">
            <div className="flex flex-row justify-between">
              <h6 className="text-gray-950 font-bold text-xs tracking-tighter leading-4">Comments</h6>
              <Image src="/icons/b-arrupr.svg" alt="Expand" width={12} height={12} />
            </div>
            <div className="flex flex-col justify-center gap-2">
              <div className="flex flex-row items-center gap-2">
                <Image className="rounded-full" src="/avatars/temp.jpg" alt="Shop Icon" width={16} height={16} />
                <h6 className="text-gray-950 font-extrabold text-xs tracking-tighter">Influx HQ</h6>
                <h6 className="text-gray-500 font-bold text-xs tracking-tighter">@influx.io</h6>
              </div>
              <h6 className="text-gray-950 font-bold text-lg tracking-tighter leading-5">Still available?</h6>
              <h6 className="text-gray-500 font-bold text-xs tracking-tighter leading-4">Commented on @thmwlch listing  “Apple MacBook Air (13-inch Retina display, 1.6GHz dual-core Intel Core i5, 128GB) - Gold (Renewed)”&ensp;•&ensp;9h ago</h6>
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