// 'use server'

import React from 'react';
import Image from 'next/image';

// Layouts
import Wrapper from '@/src/app/backend/components/layouts/WrapperLayout';
import Post from '@/src/app/backend/components/layouts/PostLayout';

// Navigators
import TopbarNav from '@/src/app/backend/components/navigators/TopbarNav';
import ExplorerNav from '@/src/app/backend/components/navigators/ExplorerNav';

// Panels, Popovers & Popups
import Background from '@/src/app/backend/components/Background';

// Hooks & Classes
import { PostClass, UserClass } from '@/libraries/structures';

interface Props {
  type?: string;
  user: UserClass;
  posts: PostClass[];
  header?: React.ReactNode;
  panels?: React.ReactNode;
}

const Timeline: React.FC<Props> = ({ type, user, header, panels, posts }) => {

  return (
    <main>

      <Background />
      <TopbarNav type={type} />
      
      <Wrapper className="flex flex-row gap-2 w-full h-full align-center py-20 px-[12%] wr-br justify-between z-50">

        {/* Left */}
        <ExplorerNav />
        <div id="padder" className="w-40 min-w-[10rem] ex-br"></div>

        {/*  Middle */}
        <Wrapper className="flex flex-row gap-2 justify-center w-full">

          {/* Timeline */}
          <div className="flex flex-col gap-2 h-full overflow-y-visible w-[32rem] lg:mr-[16.5rem]" id="right-wrapper">

          {header}
          {posts.length ? (
            <ul className="flex flex-col gap-2 h-full w-[32rem]">
              {posts.map((post: PostClass) => (
                <li key={post.id}>
                  <Post post={post} />
                </li>
              ))}
            </ul>
          ):(
            <span className="flex flex-col items-center justify-center z-[-2]">
              <Image src={'/illustrations/no-posts.png'} width={1000} height={1000} alt="No posts" className=" w-[50%]" priority={true}/>
              <p className='text-gray-700 text-sm'>No posts to show</p>
            </span>
          )}

          </div>

          {/* Panels */}
          <div className="flex flex-col gap-2 h-full fixed w-[16rem] ml-[32.5rem] ra-br z-30" id="left-wrapper">
            {panels}
          </div>
        </Wrapper>
        
        {/* Right */}
        <div id="quick" className="h-full w-40 min-w-[10rem] gap-4 flex flex-col fixed right-[12%] ex-br"></div>
        <div id="padder" className="w-40 min-w-[10rem] ex-br"></div>

      </Wrapper>
      
    </main>
  );
};

export default Timeline;