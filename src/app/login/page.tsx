import Image from 'next/image';
import Link from 'next/link';

import React from 'react';

export default function Home() {
    return (
      <main className="flex flex-col w-screen">
      
      <div className="fixed top-0 left-0 z-[-1] w-screen h-screen bg-gradient-to-b from-zinc-100 to-zinc-300"></div>

      <div className="flex justify-center items-center w-screen h-screen">
        <div id="Left div" className="bg-white rounded-lg p-0 flex flex-row h-[32rem] w-[56rem]">
          <div className="flex flex-col bg-[url('/backgrounds/login.png')] rounded-l-lg h-full aspect-square p-10">
            <h6 className="text-white font-italic text-sm tracking-tighter leading-4">I</h6>
            <h6 className="text-white font-bold text-4xl tracking-tighter pt-20 pr-20">Find everything you need in one place.</h6>
            <h6 className="text-white font-medium text-lg tracking-tighter leading-5 pt-3 pr-20">Discover bargains at an affordable price without breaking the bank.</h6>
            <h6 className="text-white font-medium text-xs tracking-tighter leading-4 pt-10 pr-60">Create an account or log in with an existing one to gain access to all of Influx's features.</h6>
            <h6 className="text-white font-light text-xs tracking-tighter leading-4 pt-24 pr-60">All Rights Reserved.</h6>
          </div>
          <div id="Right div" className="p-4">
            <p>Right div</p>
          </div>
        </div>
      </div>

      </main>
    )
}
  