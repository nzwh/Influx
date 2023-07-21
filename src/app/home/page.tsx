import React from 'react';
import Link from 'next/link';

import { AtSign, ChevronRight, FormInput, Italic, Mail, Phone, SquareAsterisk } from 'lucide-react';
import LandingNav from '@/src/app/backend/components/navigators/HomeNav';

export default function Register() {
  return (
    <main className="flex flex-col w-screen h-screen">
      <div className="fixed top-0 left-0 z-[-1] w-screen h-screen from-zinc-100 to-zinc-300"></div>
      <LandingNav />

      <div className="flex flex-col bg-cover bg-center bg-no-repeat bg-[url('/backgrounds/landing.jpg')] rounded-l-lg h-full aspect-square p-10 justify-center items-center">
        <div className="flex flex-col gap-4 pb-5 justify-center items-center">
          <h6 className="text-gray-800 font-medium text-5xl leading-8 tracking-tight">Find everything you need in one place.</h6>
          <h6 className="text-gray-800 font-light text-lg tracking-tight">Discover bargains at an affordable price without breaking the bank.</h6>
        </div>

        <div className="flex flex-col gap-4 justify-center items-center">
          <Link href="/auth/register" className="bg-slate-900 text-violet-300 // h-6 py-5 px-10 // flex items-center gap-1 
            // rounded-full cursor-pointer // hover:bg-slate-900 hover:text-violet-300 transition-colors duration-100">
            <h6 className="text-m font-regular leading-3">Get Started</h6>
          </Link>
        </div>
      </div>
        </main>
  )
}