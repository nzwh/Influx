"use client"

// Layouts
import Timeline from '@/src/app/backend/components/layouts/TimelineLayout';

// Panels
import About from '@/src/app/backend/components/panels/columns/AboutPanel';
import Welcome from '@/src/app/backend/components/panels/columns/WelcomePanel';
import NewPost from '@/src/app/backend/components/panels/timeline/DashNewPostPanel';

// Hooks & Classes
import { useRefreshContext } from '@/src/app/backend/hooks/GlobalContext';

export default function Home() {
  
  useRefreshContext();

  return (
    <Timeline 
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