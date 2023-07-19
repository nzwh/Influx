"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

import TopbarNav from '@/src/app/backend/components/navigators/TopbarNav';
import ExplorerNav from '@/src/app/backend/components/navigators/ExplorerNav';

import Post from '@/src/app/backend/components/template/PostTemplate';
import Panel from '@/src/app/backend/components/template/PanelTemplate';
import About from '@/src/app/backend/components/panels/AboutPanel';
import Background from '@/src/app/backend/components/panels/BackgroundPanel';

import NewPost from '@/src/app/backend/components/panels/TimelineNewPostPanel';
import { Post as PostInterface, 
         Community as CommunityInterface, 
         User as UserInterface } from '@/libraries/structures';

import supabase from '@/src/app/backend/supabase';

export default function Home() {

  let user = require('@/json/active.json'); // TODO: Load user info dynamically through auth
  const [posts, setPosts] = useState<PostInterface[]>([]);

  // Renders existing posts on page load.
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log('Fetching posts...');
        const { data, error } = await supabase.from('posts').select('*');
        if (error) {
          throw error;
        }
        if (data) {
          const formattedData = data.map((post) => ({
            id: post.id,
            origin: { uuid: post.origin } as CommunityInterface,
            author: { uuid: post.author } as UserInterface,
            type: post.type,
            posted_at: post.posted_at,
            price: post.price,
            title: post.title,
            description: post.description,
            condition: post.condition,
            tags: post.tags,
            media: post.media,
            is_edited: post.is_edited,
            edited_at: post.edited_at,
            upvotes: post.upvotes,
            downvotes: post.downvotes,
            shares: post.shares,
            interests: post.interests,
            bookmarks: post.bookmarks,
            comments: post.comments,
            is_open: post.is_open,
            range: {
              start: post.range_start,
              end: post.range_end,
            },
          }));

          const authorIds = formattedData.map((post) => post.author.uuid); // TODO: Read User data from database
          const { data: profiles, error: profilesError } = await supabase
            .from('profiles')
            .select('*')
            .in('uuid', authorIds);

          const communityIds = formattedData.map((post) => post.origin.uuid);
          const { data: communities, error: communitiesError } = await supabase
            .from('communities')
            .select('*')
            .in('uuid', communityIds);

          formattedData.forEach((post) => {
            const user = profiles?.find((user: UserInterface) => user.uuid === post.author.uuid);
            const community = communities?.find((community: CommunityInterface) => community.uuid === post.origin.uuid);
            user ? post.author = user : null;
            community ? post.origin = community : null;
          });

          setPosts(formattedData);
          console.log(data.length > 0 ? `Fetched ${data.length} posts.` : `'No posts found.'`)
        }
      } catch (error) {
        console.log('Error reading posts:', error);
      }
    };

    fetchPosts();
  }, []);
  
  // Handles adding new posts to the top of the list.
  // TODO: Push to database
  const handleAddPost = async (post: PostInterface) => {
    /*try {
      const { data, error } = await supabase.from('posts').insert([post]);
      if (error) {
        throw error;
      }
      if (data) {
        setPosts((prevPosts) => [data[0], ...prevPosts]);
      }
    } catch (error) {
      console.log('Error adding post:', error);
    }*/
  };

  // Handles removing a post from the list.
  // TODO: Relocate to popup
  // TODO: Push to database
  const handlePostDelete = async (postId: number) => {
    try {
      const { error } = await supabase.from('posts').delete().match({ id: postId });
      if (error) {
        throw error;
      }
      const newPosts = posts.filter((post) => post.id !== postId);
      setPosts(newPosts);
    } catch (error) {
      console.log('Error deleting post:', error);
    }
  }

  return (
    <main>

      {/* Templates */}
      <Background />
      <TopbarNav /> { /*// TODO: Add Create Post hook */ }
      
      <div id="wrapper" className="flex flex-row gap-2 w-full h-full align-center py-20 px-[12%] wr-br justify-between">

        {/* ExplorerNav & Padder */}
        <ExplorerNav user={user} wrapperClass="w-40 min-w-[10rem] ex-br" />
        <div id="padder" className="w-40 min-w-[10rem] ex-br"></div>

        <div className="flex flex-row gap-2 justify-center w-full ">

          {/* New Post & Post Loader */}
          <div className="flex flex-col gap-2 h-full overflow-y-visible w-[32rem] lg:mr-[16.5rem] z-50">
            <NewPost onPostRecieve={handleAddPost}/>
            {posts && (
              <ul className="flex flex-col gap-2 h-full w-[32rem] z-0">
                {posts.map((post: PostInterface) => (
                  <li key={post.id}>
                    <Post post={post} onDelete={handlePostDelete} />
                  </li>
                ))}
              </ul>
            )}
            {posts.length == 0 && (
              <span className="flex flex-col items-center justify-center z-0">
                <Image src={'/empty-illustration.png'} width={1000} height={1000} alt="No posts" className=" w-[50%]"/>
                <p className='text-gray-700 text-sm'>No posts to show</p>
              </span>
            )}
          </div>
          
          {/* Panels */}
          <div className="flex flex-col gap-2 h-full fixed w-[16rem] ml-[32.5rem] ra-br">

            <Panel title="Explore" />
            <Panel title="Communities" />
            <About />

          </div>
        </div>
        
        {/* Quick Access & Padder */}
        <div id="quick" className="h-full w-40 min-w-[10rem] gap-4 flex flex-col fixed right-[12%] ex-br"></div>
        <div id="padder" className="w-40 min-w-[10rem] ex-br"></div>

      </div>
    </main>
  )
}