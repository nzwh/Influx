"use client"

import React, { useState } from 'react';

// Layouts
import Timeline from '@/src/app/backend/components/layouts/TimelineLayout';

// Panels
import About from '@/src/app/backend/components/panels/columns/AboutPanel';
import Welcome from '@/src/app/backend/components/panels/columns/WelcomePanel';
import NewPost from '@/src/app/backend/components/panels/timeline/DashNewPostPanel';

// Hooks
import useFetchToken from '@/src/app/backend/hooks/FetchToken';
import useFetchPosts from '@/src/app/backend/hooks/useFetchPosts';

// Classes
import { UserClass } from '@/libraries/structures';

// Page
export default function Home() {

  const { posts, fetchPosts } = useFetchPosts({ type: 'all' });
  const { handleAddPost, handleDeletePost, handleEditPost } = usePostActions();

  // Instantiate the user, set the icon to a default value
  const [user, setUser] = useState<UserClass>(new UserClass({
    icon: '/root/temp.jpg',
    banner: '/root/temp.jpg'
  }));

  // Fetch the user data
  useFetchToken({user, setUser});

  return (
    <Timeline 
      user={user}
      posts={posts}
      header={
        <NewPost onCreatePost={handleAddPost} user={user}/>
      }
      panels={<>
        <Welcome user={user} />
        <About />
      </>}
    />
  )
}