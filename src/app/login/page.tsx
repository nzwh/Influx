import Image from 'next/image';
import Link from 'next/link';

import React from 'react';

export default function Home() {
    return (
      <main className="flex flex-col w-screen">
      
      <div className="fixed top-0 left-0 z-[-1] w-screen h-screen bg-gradient-to-b from-zinc-100 to-zinc-300"></div>

      <div className="flex justify-center items-center w-screen h-screen">
        <div className="bg-white rounded-lg p-4 flex">
          <section id="left" className="p-4">
            <p>Left div</p>
          </section>
          <section id="right" className="p-4">
            <p>Right div</p>
          </section>
        </div>
      </div>

      </main>
    )
}
  