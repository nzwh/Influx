"use client"

// Layouts
import Timeline from '@/src/app/backend/components/layouts/TimelineLayout';

// Panels
import About from '@/src/app/backend/components/panels/columns/AboutPanel';
import Welcome from '@/src/app/backend/components/panels/columns/WelcomePanel';
import NewPost from '@/src/app/backend/components/panels/timeline/DashNewPostPanel';

// Hooks & Classes
import { useRefreshContext, useGlobalContext } from '@/src/app/backend/hooks/GlobalContext';

export default function Home() {
  
  useRefreshContext();
  const { user, posts } = useGlobalContext();

  return (
    <Timeline 
      user={user}
      posts={posts}
      header={<>
        <NewPost />
      </>}
      panels={<>
        <Welcome />
        <About />
      </>}
    />
  )
}