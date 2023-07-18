"use client"

import React, { useState, useEffect } from 'react';

import supabase from '@/src/app/supabase';

import TopbarNav from '@/src/app/components/navigators/TopbarNav';
import ExplorerNav from '@/src/app/components/navigators/ExplorerNav';

import Post from '@/src/app/components/template/PostTemplate';
import Panel from '@/src/app/components/template/PanelTemplate';
import NewPost from '@/src/app/components/panels/NewPostPanel';
import About from '@/src/app/components/panels/AboutPanel';
import Background from '@/src/app/components/panels/BackgroundPanel';

import { Post as PostInterface, 
         Community as CommunityInterface, 
         User as UserInterface } from '@/libraries/structures';

export default function Home() {

  const [posts, setPosts] = useState<PostInterface[]>([]);
  let user = require('@/json/active.json'); // TODO: Load user info dynamically through auth

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
            origin: { id: post.origin } as CommunityInterface,
            author: { id: post.author } as UserInterface,
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

          const authorIds = formattedData.map((post) => post.author.id); // TODO: Read User data from database
          const { data: profiles, error: profilesError } = await supabase
            .from('profiles')
            .select('*')
            .in('user_id', authorIds);

          const communityIds = formattedData.map((post) => post.origin.id);
          const { data: communities, error: communitiesError } = await supabase
            .from('communities')
            .select('*')
            .in('id', communityIds);

          formattedData.forEach((post) => {
            const user = profiles?.find((user: UserInterface) => user.id === post.author.id);
            const community = communities?.find((community: CommunityInterface) => community.id === post.origin.id);
            
            if (user) {
              post.author = {
                id: user.id,
                handle: user.handle,
                icon: user.icon,
                first_name: user.first_name,
                last_name: user.last_name,
                location: user.location,
                biography: user.biography,
                payment_methods: user.payment_methods,
                delivery_methods: user.delivery_methods,
                is_verified: user.is_verified,
                email_address: "",
                phone_number: "",
              };
            }
            
            if (community) {
              post.origin = community;
            }
          });
          setPosts(formattedData);
          if (data.length > 0) {
            console.log('Fetched posts:', data); // Log the formatted data if it's not empty
          } else {
            console.log('No posts found.'); // Log a message if no posts are found
          }
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
      setPosts((prevPosts) => [data[0], ...prevPosts]);
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
  };

  return (
    <main>

      {/* Templates */}
      <Background />
      <TopbarNav />
      
      <div id="wrapper" className="flex flex-row gap-2 w-full h-full align-center py-20 px-[12%] wr-br justify-between">

        {/* ExplorerNav & Padder */}
        <ExplorerNav user={user} wrapperClass="w-40 min-w-[10rem] ex-br" />
        <div id="padder" className="w-40 min-w-[10rem] ex-br"></div>

        <div className="flex flex-row gap-2 justify-center w-full ">

          {/* New Post & Post Loader */}
          <div className="flex flex-col gap-2 h-full overflow-y-visible w-[32rem] lg:mr-[16.5rem]">
            <NewPost onPostRecieve={handleAddPost}/>
            {posts && (
              <ul className="flex flex-col gap-2 h-full w-[32rem] z-[50]">
                {posts.map((post: PostInterface) => (
                  <li key={post.id}>
                    <Post post={post} onDelete={handlePostDelete} />
                  </li>
                ))}
              </ul>
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