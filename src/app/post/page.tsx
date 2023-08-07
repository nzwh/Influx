"use client"

// Layouts
import Timeline from '@/src/app/backend/components/layouts/TimelineLayout';

// Panels
import About from '@/src/app/backend/components/panels/columns/AboutPanel';
import Welcome from '@/src/app/backend/components/panels/columns/WelcomePanel';
import NewPost from '@/src/app/backend/components/panels/timeline/DashNewPostPanel';

// Hooks & Classes
import { useRefreshContext, useGlobalContext } from '@/src/app/backend/hooks/useGlobalContext';

export default function Home() {
  
  useRefreshContext();
  const { posts } = useGlobalContext();

  return (
    <Timeline 
      posts={posts}
      header={<>
      </>}
      panels={<>
        <Welcome />
        <About />
      </>}
    />
  )
}