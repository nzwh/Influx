import React from 'react';
import Link from 'next/link';

import { AtSign, ChevronRight, Italic, SquareAsterisk } from 'lucide-react';

export default function Login() {
  return (
    <main className="flex flex-col w-screen h-screen items-center justify-center">
    <div className="fixed top-0 left-0 z-[-1] w-screen h-screen bg-gradient-to-b from-zinc-100 to-zinc-300"></div>

      <div className="bg-white rounded-lg p-0 flex flex-row h-[32rem] w-[56rem]">
        <div className="flex flex-col bg-[url('/backgrounds/login.png')] rounded-l-lg h-full aspect-square p-10 justify-between">
          <Italic className="opacity-70 text-violet-300" size={14} strokeWidth={3} />
          <div className="flex flex-col gap-4">
            <h6 className="text-white font-medium text-4xl leading-8 pr-20 tracking-tight">Find everything you need in one place.</h6>
            <h6 className="text-white font-light text-lg leading-5 pr-20">Discover bargains at an affordable price without breaking the bank.</h6>
          </div>
          <h6 className="text-white font-light text-xs pr-60">Create an account, or log in with an existing one to gain access to all of Influx's features.</h6>
          <h6 className="text-white font-light text-[0.6rem] ">All Rights Reserved. ©2023 influx.io</h6>
        </div>

        <div className="flex flex-col p-8 w-full gap-8 justify-center">
          <h6 className="text-gray-800 font-medium text-2xl tracking-tight">Log in to continue</h6>
          
          <form action="/" className="flex flex-col gap-4">
            <div>
            <label htmlFor="u_name" className="text-gray-800 font-regular text-xs leading-8">Username&ensp;/&ensp;Email Address</label>
            <div className="flex flex-row bg-gray-300 rounded-sm h-8 w-full items-center">
              <div className="h-full aspect-square flex items-center justify-center">
                <AtSign className="opacity-50" color="black" strokeWidth={3} size={14}/>
              </div>
              <input id="u_name" type="text" placeholder="@influx" className="w-full h-full text-gray-500 text-xs bg-gray-100 rounded-sm p-2 italic" required></input>
            </div>

            <label htmlFor="u_pass" className="text-gray-800 font-regular text-xs leading-8">Password</label>
            <div className="flex flex-row bg-gray-300 rounded-sm h-8 w-full items-center">
              <div className="h-full aspect-square flex items-center justify-center">
                <SquareAsterisk className="opacity-50" color="black" strokeWidth={3} size={14}/>
              </div>
              <input id="u_pass" type="password" placeholder="********" className="w-full h-full text-gray-500 text-xs bg-gray-100 rounded-sm p-2 italic" required></input>
            </div>
            </div>

            <div className="flex flex-row justify-between w-full items-center">
              <div className="flex flex-row gap-2 items-center">
                <input type="checkbox" id="remember" name="remember" className="cursor-pointer" />
                <h6 className="bg-white text-gray-800 font-regular tracking-tight leading-3 text-xs h-full">Remember me</h6>
              </div>
              <h6 className="bg-white text-gray-800 font-regular text-xs tracking-tight h-full cursor-pointer hover:underline">Forgot Password?</h6>
            </div>

            <button type="submit" className="w-full flex flex-row bg-slate-900 rounded-2xl items-center justify-center cursor-pointer gap-2">
              <h6 className="text-violet-300 font-light text-xs h-full cursor-pointer py-1.5">Continue with an Influx Account</h6>
            </button>
          </form>

          <div className="flex flex-row gap-1 items-center py-2">
            <Link href="/auth/register" className="text-gray-800 font-regular text-xs h-full cursor-pointer leading-2 hover:underline">New to Influx?&ensp;Sign up here.</Link>
            <ChevronRight className="opacity-70" color="black" size={14} strokeWidth={3}/>
          </div>
        </div>
      </div>
    </main>
  )
}