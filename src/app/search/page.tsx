import React, { useState } from 'react';
import Navbar from '@/src/app/components/Navbar';

export default function Home() {
    return (
      <main className="flex flex-col w-screen">
        <div className="fixed top-0 left-0 z-[-1] w-screen h-screen bg-gradient-to-b from-zinc-100 to-zinc-300"></div>
      <Navbar />
      
      </main>
    )
}
  