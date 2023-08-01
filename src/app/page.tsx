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
import useFetchPosts from '@/src/app/backend/hooks/FetchPosts';
import usePostActions from '@/src/app/backend/hooks/usePostActions';

// Classes
import { UserClass, PostClass } from '@/libraries/structures';

// Page
export default function Home() {

  const { handleAddPost, handleDeletePost, handleEditPost } = usePostActions();

  const [posts, setPosts] = useState<PostClass[]>([]);
  useFetchPosts({ posts, setPosts });

  // Instantiate the user, set the icon to a default value
  const [user, setUser] = useState<UserClass>(new UserClass({
    icon: '/root/temp.jpg',
    banner: '/root/temp.jpg'
  }));

  // Fetch the user data
  useFetchToken({ user, setUser });

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