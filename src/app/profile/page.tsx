"use client"

// Layouts
import Timeline from '@/src/app/backend/components/layouts/TimelineLayout';

// Panels
import About from '@/src/app/backend/components/panels/columns/AboutPanel';
import Listings from '@/src/app/backend/components/panels/timeline/ProfileListingsPanel';
import ProfileAccount from '@/src/app/backend/components/panels/columns/ProfileAccountPanel';
import ProfileComments from '@/src/app/backend/components/panels/columns/ProfileCommentsPanel';

// Hooks & Classes
import { useRefreshContext, useGlobalContext } from '@/src/app/backend/hooks/useGlobalContext';
import { useRouter } from 'next/navigation';

export default function Home() {
  
  useRefreshContext();
  const { user, posts } = useGlobalContext();

  const router = useRouter();
  if (user.uuid === '') 
    router.push('/auth/login');

  return (
    <Timeline 
      user={user}
      posts={
        posts.filter(post => post.author.uuid === user.uuid )
      }
      header={<>
        <Listings user={user} />
      </>}
      panels={<>
        <ProfileAccount user={user}/>
        <ProfileComments user={user} />
        <About />
      </>}
    />
  )
}



