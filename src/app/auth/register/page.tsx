import Image from 'next/image';
import Link from 'next/link';

import React from 'react';

export default function Home() {
    return (
      <main className="flex flex-col w-screen">
      
      <div className="fixed top-0 left-0 z-[-1] w-screen h-screen bg-gradient-to-b from-zinc-100 to-zinc-300"></div>

      <div className="flex justify-center items-center w-screen h-screen">
        <div className="bg-white rounded-lg p-0 flex flex-row h-[32rem] w-[56rem]">
          
          <div id="Left div" className="flex flex-col bg-[url('/backgrounds/login.png')] rounded-l-lg h-full aspect-square p-10">
            <Image src="/icons/b-italic.svg" alt="Influx Icon" width={20} height={20} />
            <h6 className="text-white font-bold text-4xl tracking-tighter pt-20 pr-20">Find everything you need in one place.</h6>
            <h6 className="text-white font-medium text-lg tracking-tighter leading-5 pt-3 pr-20">Discover bargains at an affordable price without breaking the bank.</h6>
            <h6 className="text-white font-medium text-[0.8rem] tracking-tighter leading-4 pt-10 pr-60">Create an account or log in with an existing one to gain access to all of Influx's features.</h6>
            <h6 className="text-white font-light text-[0.6rem] tracking-tighter leading-4 pt-24 pr-60">All Rights Reserved.</h6>
          </div>

          <div id="Right div" className="p-10 h-[32rem] w-[95rem]">
            <h6 className="text-gray-800 font-bold text-2xl tracking-tighter leading-4 pb-2">Register an account</h6>

            <form action="/">
              <div className="flex flex-row gap-3 w-full items-center pt-3">
                  <div className="flex flex-col w-full">
                      <h6 className="text-gray-800 font-medium text-[0.7rem] tracking-tighter leading-4 pt-2">First Name</h6>
                      <div className="flex flex-row bg-white rounded-[0.25rem] pt-1 h-8">
                          <Image className="w-7 bg-gray-300 rounded-l-[0.25rem] p-2" src="/icons/b-term.svg" alt="Input Icon" width={10} height={10} />
                          <input type="text" placeholder="Enter first name" className="w-full text-gray-500 text-[0.7rem] bg-gray-100 rounded-r-[0.25rem] p-2 tracking-tighter" required></input>
                      </div>
                  </div>
                  <div className="flex flex-col w-full">
                      <h6 className="text-gray-800 font-medium text-[0.7rem] tracking-tighter leading-4 pt-2">Last Name</h6>
                      <div className="flex flex-row bg-white rounded-[0.25rem] pt-1 h-8">
                          <Image className="w-7 bg-gray-300 rounded-l-[0.25rem] p-2" src="/icons/b-term.svg" alt="Input Icon" width={10} height={10} />
                          <input type="text" placeholder="Enter last name" className="w-full text-gray-500 text-[0.7rem] bg-gray-100 rounded-r-[0.25rem] p-2 tracking-tighter" required></input>
                      </div>
                  </div>
              </div>

              <h6 className="text-gray-800 font-medium text-[0.7rem] tracking-tighter leading-4 pt-3">Username</h6>
              <div className="flex flex-row bg-white rounded-[0.25rem] pt-1 h-8">
                <Image className="w-7 bg-gray-300 rounded-l-[0.25rem] p-2" src="/icons/b-at.svg" alt="At Icon" width={10} height={10} />
                <input type="text" placeholder="Enter username" className="w-full text-gray-500 text-[0.7rem] bg-gray-100 rounded-r-[0.25rem] p-2 tracking-tighter" required></input>
              </div>

              <h6 className="text-gray-800 font-medium text-[0.7rem] tracking-tighter leading-4 pt-3">Email Address</h6>
              <div className="flex flex-row bg-white rounded-[0.25rem] pt-1 h-8">
                <Image className="w-7 bg-gray-300 rounded-l-[0.25rem] p-2" src="/icons/b-mail.svg" alt="Mail Icon" width={10} height={10} />
                <input type="email" placeholder="Enter email address" className="w-full text-gray-500 text-[0.7rem] bg-gray-100 rounded-r-[0.25rem] p-2 tracking-tighter" required></input>
              </div>

              <h6 className="text-gray-800 font-medium text-[0.7rem] tracking-tighter leading-4 pt-3">Password</h6>
              <div className="flex flex-row bg-white rounded-[0.25rem] pt-1 h-8">
                <Image className="w-7 bg-gray-300 rounded-l-[0.25rem] p-2" src="/icons/b-key.svg" alt="Key Icon" width={10} height={10} />
                <input type="password" placeholder="Enter password" className="w-full text-gray-500 text-[0.7rem] bg-gray-100 rounded-r-[0.25rem] p-2 tracking-tighter" required></input>
              </div>

              <h6 className="text-gray-800 font-medium text-[0.7rem] tracking-tighter leading-4 pt-3">Contact Number</h6>
              <div className="flex flex-row bg-white rounded-[0.25rem] pt-1 h-8">
                <Image className="w-7 bg-gray-300 rounded-l-[0.25rem] p-2" src="/icons/b-phone.svg" alt="Phone Icon" width={10} height={10} />
                <input type="text" placeholder="Enter contact number" className="w-full text-gray-500 text-[0.7rem] bg-gray-100 rounded-r-[0.25rem] p-2 tracking-tighter" required></input>
              </div>

              <div className="p-3"></div>
              <button type="submit" className="w-full flex flex-row bg-black rounded-2xl p-[0.35rem] gap-[0.5rem] justify-center cursor-pointer">
                <Image src="/icons/b-italic.svg" alt="Influx Icon" width={12} height={12} />
                <h6 className="text-slate-400 font-medium text-[0.6rem] h-full cursor-pointer">Continue with an Influx Account</h6>
              </button>
            </form>

            <div className="flex flex-row pt-8 gap-[0.25rem]">
              <Link href="/auth/login" className="text-gray-800 font-bold text-[0.6rem] h-full cursor-pointer">Already have an account? Log in here.</Link>
              <Image className="cursor-pointer" src="/icons/b-arrowr.svg" alt="Right Arrow Icon" width={12} height={12} />
            </div>
          </div>

        </div>
      </div>

      </main>
    )
}
  