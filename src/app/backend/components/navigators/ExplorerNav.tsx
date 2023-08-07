import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Layouts
import Wrapper from '@/src/app/backend/components/layouts/WrapperLayout';

// Hooks & Classes
import { useGlobalContext } from '@/src/app/backend/hooks/useGlobalContext';

// Icons
import { User, Bookmark, ShoppingBag, Sparkle, Search } from 'lucide-react';

// Module Component for Links
const Module = (
  { elements }: { elements: [string, JSX.Element, string][]}
  ) => {
  return (
    <Wrapper className='flex flex-col gap-1'>
    {elements.map((element, index) => {
      const [name, icon, route] = element;
      return (
        <Link key={index} href={route} className="flex flex-row items-center gap-2 text-gray-700 px-2 py-1.5 rounded-sm hover:bg-slate-300 transition-colors duration-200">
          {icon}
          <h6 className="font-normal leading-4 text-sm">{name}</h6>
        </Link>
      )
    })}
    </Wrapper>
  )
};

const ExplorerNav: React.FC = () => {

  // Export user from global context
  const { user } = useGlobalContext();

  return (
    <aside className="w-40 min-w-[10rem] ex-br gap-4 flex flex-col fixed">

      {/* Profile */}
      <Link href="/profile" className="flex flex-row items-center gap-2">

        {/* Icon */}
        <Image className="rounded-full w-9 h-9 object-cover" src={user.icon} alt="User Icon" width={36} height={36} />

        {/* Name */}
        <Wrapper className="flex flex-col justify-center h-full pb-1">
          <h6 className="flex flex-row gap-0.5 items-start flex-wrap text-gray-800 font-medium text-sm leading-5 tracking-tight w-full">
            <span>
              {user.first_name}
            </span>
            { user.is_verified ? (
            <span className="inline-block w-4 h-4 relative top-[0.125rem]"> 
              <Image src="/root/verified.svg" alt="verified" width={16} height={16} />
            </span>
            ) : null }
          </h6>
          <h6 className="text-gray-500 font-regular text-[0.625rem] leading-3">
            {`@${user.handle}`}
          </h6>
        </Wrapper>

      </Link>
      
      {/* Modules */}
      <Wrapper className="flex flex-col gap-2 relative right-2">
        <hr className="border-gray-200" />
        <Module elements={[
          ['Explore', <Sparkle size={16} strokeWidth={3} />, '/'],
          ['Your Cart', <ShoppingBag size={16} strokeWidth={3} />, '/cart'],
          ['Bookmarks', <Bookmark size={16} strokeWidth={3} />, '/bookmarks'],
        ]} />
        <hr className="border-gray-200" />
        <Module elements={[
          ['Search', <Search size={16} strokeWidth={3} />, '/search'],
          ['Profile', <User size={16} strokeWidth={3} />, '/profile'],
        ]} />
        <hr className="border-gray-200" />
      </Wrapper>
      
    </aside>
  );
};

export default ExplorerNav;