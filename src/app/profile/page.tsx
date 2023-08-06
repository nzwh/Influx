"use client"

// Layouts
import Timeline from '@/src/app/backend/components/layouts/TimelineLayout';

// Panels
import About from '@/src/app/backend/components/panels/columns/AboutPanel';
import Listings from '@/src/app/backend/components/panels/timeline/ProfileListingsPanel';
import ProfileAccount from '@/src/app/backend/components/panels/columns/ProfileAccountPanel';
import ProfileComments from '@/src/app/backend/components/panels/columns/ProfileCommentsPanel';

// Hooks & Classes
import useFetchPosts from '@/src/app/backend/hooks/FetchPosts';
import { useRefreshContext, useGlobalContext } from '@/src/app/backend/hooks/GlobalContext';

export default function Home() {
  
  useRefreshContext();

  const { user,  setUser, posts, setPosts } = useGlobalContext();
  useFetchPosts({ query: "author", posts, setPosts });

  return (
    <Timeline 
      header={<>
        <Listings />
      </>}
      panels={<>
        <ProfileAccount />
        <ProfileComments user={user} />
        <About />
      </>}
    />
  )
}



