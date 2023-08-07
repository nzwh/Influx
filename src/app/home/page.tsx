'use client' //* Uses interactable components

import React from 'react';
import Link from 'next/link';

import TopbarNav from '@/src/app/backend/components/navigators/TopbarNav';
import { useRefreshContext } from '@/src/app/backend/hooks/context/useGlobalContext';
import { ArrowRight } from 'lucide-react';

import { useGlobalContext } from '@/src/app/backend/hooks/context/useGlobalContext';
import { useRouter } from 'next/navigation';

export default function Register() {

  useRefreshContext();

  const { user } = useGlobalContext();
  const router = useRouter();
  if (user.uuid)
    router.push('/');
  
  return (
    <main className="flex flex-col w-screen h-screen bg-[url('/images/bg-home.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="fixed top-0 left-0 z-[-1] w-screen h-screen from-zinc-100 to-zinc-300"></div>
      <TopbarNav type="homepage" />

      <div className="flex flex-row bg-cover bg-center bg-no-repeat bg-[url('/backgrounds/landing.jpg')] rounded-l-lg h-full aspect-square justify-center items-center gap-10">

        <h6 className="text-white font-black text-[8rem] leading-[5rem] tracking-tighter italic w-[40rem]" style={{ WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black' }}>Find 
          <span className="hover:text-violet-300 transition-colors duration-200"> everything </span>
        you need in one place.</h6>

        <div className="w-[18rem] flex flex-col gap-8">
          <h6 className="text-white font-bold text-[2rem] leading-[1.6rem] italic tracking-tight" style={{ WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black' }}>Discover bargains at an affordable price without breaking the bank.</h6>
          <Link href="/auth/register" className="bg-white text-black py-3 px-7 flex items-center w-fit rounded-full cursor-pointer hover:bg-slate-900 hover:text-violet-300 transition-colors duration-200 border-[1px] border-black">
            <ArrowRight className="w-5 h-5 mr-2" />
            <h6 className="text-m font-regular leading-3 italic">Get Started</h6>
          </Link>
        </div>

      </div>
    </main>
  )
}