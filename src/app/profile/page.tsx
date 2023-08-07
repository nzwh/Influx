"use client"

import dynamic from 'next/dynamic'

// Layouts
import Timeline from '@/src/app/backend/components/layouts/TimelineLayout';

// Panels
import About from '@/src/app/backend/components/panels/columns/AboutPanel';
import Listings from '@/src/app/backend/components/panels/timeline/ListingsPanel';
import ProfileAccount from '@/src/app/backend/components/panels/columns/ProfileAccountPanel';
import ProfileComments from '@/src/app/backend/components/panels/columns/ProfileCommentsPanel';

// Hooks & Classes
import { useRefreshContext, useGlobalContext } from '@/src/app/backend/hooks/context/useGlobalContext';
import { useRouter } from 'next/navigation';

const Home = () => {
  
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

const YourComponent = dynamic(() => Promise.resolve(Home), {
  ssr: false,
})

export default YourComponent