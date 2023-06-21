import React from 'react';
import Image from 'next/image'
import Link from 'next/link'

const Navbar: React.FC = () => {
  return (
    <nav className="flex flex-row h-20 w-full justify-between items-center px-[8%] fixed">
        <h6 className="text-slate-950 font-bold text-md tracking-tighter">Influx</h6>
        <div className="flex align-center gap-4">
          <Image src="/icons/b-search.svg" alt="Vercel Logo" width={16} height={16} />
          <Image src="/icons/b-msgsqr.svg" alt="Vercel Logo" width={15} height={16} />
          <Image src="/icons/b-bell.svg" alt="Vercel Logo" width={15} height={16} />          

          <Link href="/profile" className="flex flex-row">
            <Image className="rounded-full ml-2" src="/avatars/temp.jpg" alt="Profile" width={24} height={24} />
            <div className="w-2 h-2 bg-gray-700 rounded-full"></div>
          </Link>
        </div>
      </nav>
  );
};

export default Navbar;