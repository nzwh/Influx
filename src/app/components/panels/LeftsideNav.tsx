import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { User, Bookmark, Inbox, ShoppingBag, Settings, Sparkle, Truck, Moon, Megaphone, LayoutGrid } from 'lucide-react';
import { UserInterface } from '@/libraries/interfaces';

interface WrapperInterface {
  active: UserInterface;
  wrapper_props: string;
}

const Leftside: React.FC<WrapperInterface> = ({ active, wrapper_props }) => {
  return (
    <section id="profile" className={`gap-6 flex flex-col fixed ${wrapper_props}`}>
    <Link href="/profile" className="flex flex-row items-center gap-2">
      <Image className="rounded-full" src={active.user_icon} alt="User Icon" width={36} height={36} />
      <div className="flex flex-col justify-center">
        <div className="flex flex-row items-center gap-0.5 h-[0.9rem]">
          <h6 className="text-gray-800 font-medium text-md leading-4 tracking-tight">{active.user_name}</h6>
          <Image src="/root/verified.svg" width={20} height={20} alt="Verified" />
        </div>
        <h6 className="text-gray-500 font-regular text-xs leading-4">{active.user_handle}</h6>
      </div>
    </Link>

    <ul className="flex flex-col gap-3">
      <li className="flex flex-row items-center gap-2 text-gray-700">
        <Sparkle size={16} strokeWidth={3}/>
        <h6 className="font-regular text-sm">Explore</h6>
      </li>
      <li className="flex flex-row items-center gap-2 text-gray-700">
        <Bookmark size={16} strokeWidth={3}/>
        <h6 className="font-regular text-sm">Bookmarks</h6>
      </li>
      <li className="flex flex-row items-center gap-2 text-gray-700">
        <Megaphone size={16} strokeWidth={3}/>
        <h6 className="font-regular text-sm">Notifications</h6>
      </li>
      <hr />
      <li className="flex flex-row items-center gap-2 text-gray-700">
        <Inbox size={16} strokeWidth={3}/>
        <h6 className="font-regular text-sm">Messages</h6>
      </li>
      <li className="flex flex-row items-center gap-2 text-gray-700">
        <Truck size={16} strokeWidth={3}/>
        <h6 className="font-regular text-sm">Tracking</h6>
      </li>
      <li className="flex flex-row items-center gap-2 text-gray-700">
        <ShoppingBag size={16} strokeWidth={3}/>
        <h6 className="font-regular text-sm">Shopping Cart</h6>
      </li>
      <hr />
      <li className="flex flex-row items-center gap-2 text-gray-700">
        <Moon size={16} strokeWidth={3}/>
        <h6 className="font-regular text-sm">Theme</h6>
      </li>
      <li className="flex flex-row items-center gap-2 text-gray-700">
        <User size={16} strokeWidth={3}/>
        <h6 className="font-regular text-sm">Profile</h6>
      </li>
      <li className="flex flex-row items-center gap-2 text-gray-700">
        <Settings size={16} strokeWidth={3}/>
        <h6 className="font-regular text-sm">Settings</h6>
      </li>
      <hr />
      <li className="flex flex-row items-center gap-2 text-gray-700">
        <LayoutGrid size={16} strokeWidth={3}/>
        <h6 className="font-regular text-sm">More</h6>
      </li>
    </ul>
  </section>
  );
};

export default Leftside;