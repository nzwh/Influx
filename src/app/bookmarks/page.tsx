'use client' //* Uses interactable components

import { useRouter } from 'next/navigation';

// Layouts
import Timeline from '@/src/app/backend/components/layouts/TimelineLayout';

// Panels
import About from '@/src/app/backend/components/panels/columns/AboutPanel';
import ProfileAccount from '@/src/app/backend/components/panels/columns/ProfileAccountPanel';

// Hooks & Classes
import { useRefreshContext, useGlobalContext } from '@/src/app/backend/hooks/context/useGlobalContext';
import { useEffect } from 'react';

export default function Home() {
  
  useRefreshContext();
  const { user, posts } = useGlobalContext();

  const router = useRouter();
  useEffect(() => {
    if (user.uuid === '') 
      router.push('/auth/login');
  }, [user.uuid])

  return (
    <Timeline 
      user={user}
      posts={
        posts.filter((post) => user.bookmarks?.includes(post.id))
      }
      header={<>
        <section className="w-full flex flex-row justify-between bg-white rounded-sm p-4 gap-4">
          <h6 className="text-gray-800 font-regular text-xs leading-4">Showing {posts.filter((post) => user.cart?.includes(post.id)).length} results</h6>
        </section>
      </>}
      panels={<>
        <ProfileAccount user={user}/>
        <About />
      </>}
    />
  )
}