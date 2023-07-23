import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { User, Bookmark, Inbox, ShoppingBag, Settings, Sparkle, Truck, Moon, Megaphone, LayoutGrid } from 'lucide-react';
import { User as UserInterface } from '@/libraries/structures';

interface WrapperProps {
  user: UserInterface;
  wrapperClass: string;
}

const ExplorerNav: React.FC<WrapperProps> = ({ user, wrapperClass }) => {
  return (
    <section id="profile" className={`gap-6 flex flex-col fixed ${wrapperClass}`}>
    <Link href="/profile" className="flex flex-row items-center gap-2">
      <Image className="rounded-full" src={user.icon} alt="User Icon" width={36} height={36} />
      <div className="flex flex-col justify-center">
        <div className="flex flex-row items-center gap-0.5 h-[1rem]">
          <h6 className="text-gray-800 font-medium text-base leading-4 tracking-tight">{`${user.first_name} ${user.last_name}`}</h6>
          <Image src="/root/verified.svg" width={20} height={20} alt="Verified" />
        </div>
        <h6 className="text-gray-500 font-regular text-xs leading-4">{`@${user.handle}`}</h6>
      </div>
    </Link>

    <ul className="flex flex-col gap-0.5 relative right-2">
      <Link href="/explore" className="flex flex-row items-center gap-2 text-gray-700 px-2 py-1.5 rounded-sm hover:bg-slate-300 transition-colors duration-200">
        <Sparkle size={16} strokeWidth={3}/>
        <h6 className="font-regular text-sm">Explore</h6>
      </Link>
      <Link href="/bookmarks" className="flex flex-row items-center gap-2 text-gray-700 px-2 py-1.5 rounded-sm hover:bg-slate-300 transition-colors duration-200">
        <Bookmark size={16} strokeWidth={3}/>
        <h6 className="font-regular text-sm">Bookmarks</h6>
      </Link>
      <Link href="/cart" className="flex flex-row items-center gap-2 text-gray-700 px-2 py-1.5 rounded-sm hover:bg-slate-300 transition-colors duration-200">
        <ShoppingBag size={16} strokeWidth={3}/>
        <h6 className="font-regular text-sm">Shopping Cart</h6>
      </Link>
      <hr className="my-1"/>
      <Link href="/theme" className="flex flex-row items-center gap-2 text-gray-700 px-2 py-1.5 rounded-sm hover:bg-slate-300 transition-colors duration-200">
        <Moon size={16} strokeWidth={3}/>
        <h6 className="font-regular text-sm">Theme</h6>
      </Link>
      <Link href="/profile" className="flex flex-row items-center gap-2 text-gray-700 px-2 py-1.5 rounded-sm hover:bg-slate-300 transition-colors duration-200">
        <User size={16} strokeWidth={3}/>
        <h6 className="font-regular text-sm">Profile</h6>
      </Link>
      <Link href="/settings" className="flex flex-row items-center gap-2 text-gray-700 px-2 py-1.5 rounded-sm hover:bg-slate-300 transition-colors duration-200">
        <Settings size={16} strokeWidth={3}/>
        <h6 className="font-regular text-sm">Settings</h6>
      </Link>
      {/* <hr />
      <li className="flex flex-row items-center gap-2 text-gray-700">
        <LayoutGrid size={16} strokeWidth={3}/>
        <h6 className="font-regular text-sm">More</h6>
      </li> */}
    </ul>
  </section>
  );
};

export default ExplorerNav;