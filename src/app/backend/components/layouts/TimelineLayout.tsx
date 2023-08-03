import React from 'react';
import Image from 'next/image';

// Layouts
import Wrapper from '@/src/app/backend/components/layouts/WrapperLayout';

// Navigators
import TopbarNav from '@/src/app/backend/components/navigators/TopbarNav';
import ExplorerNav from '@/src/app/backend/components/navigators/ExplorerNav';

// Panels & Popups
import Post from '@/src/app/backend/components/layouts/PostLayout';
import Background from '@/src/app/backend/components/Background';

// Hooks & Classes
import { PostClass } from '@/libraries/structures';
import { useGlobalContext } from '@/src/app/backend/hooks/GlobalContext';

interface Props {
  header?: React.ReactNode;
  panels?: React.ReactNode;
}

const Timeline: React.FC<Props> = ({ header, panels }) => {

  // Export posts from global context
  const { posts } = useGlobalContext();

  return (
    <main>

      <Background />
      <TopbarNav />
      
      <Wrapper className="flex flex-row gap-2 w-full h-full align-center py-20 px-[12%] wr-br justify-between z-50">

        {/* Left */}
        <ExplorerNav />
        <div id="padder" className="w-40 min-w-[10rem] ex-br"></div>

        {/*  Middle */}
        <Wrapper className="flex flex-row gap-2 justify-center w-full">

          {/* Timeline */}
          <Wrapper className="flex flex-col gap-2 h-full overflow-y-visible w-[32rem] lg:mr-[16.5rem]">

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
              <Image src={'/empty-illustration.png'} width={1000} height={1000} alt="No posts" className=" w-[50%]"/>
              <p className='text-gray-700 text-sm'>No posts to show</p>
            </span>
          )}

          </Wrapper>

          {/* Panels */}
          <Wrapper className="flex flex-col gap-2 h-full fixed w-[16rem] ml-[32.5rem] ra-br z-40">
            {panels}
          </Wrapper>
        </Wrapper>
        
        {/* Right */}
        <div id="quick" className="h-full w-40 min-w-[10rem] gap-4 flex flex-col fixed right-[12%] ex-br"></div>
        <div id="padder" className="w-40 min-w-[10rem] ex-br"></div>

      </Wrapper>
      
    </main>
  );
};

export default Timeline;