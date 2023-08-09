'use client' //* Uses interactable components

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'

// Layouts
import Timeline from '@/src/app/backend/components/layouts/TimelineLayout';

// Panels
import About from '@/src/app/backend/components/panels/columns/AboutPanel';
import SearchFilters from '@/src/app/backend/components/panels/columns/SearchFiltersPanel';

// Hooks & Classes
import { PostClass } from '@/libraries/structures';
import { useRefreshContext, useGlobalContext } from '@/src/app/backend/hooks/context/useGlobalContext';
import useFilterPosts from '@/src/app/backend/hooks/useFilterPosts';

export default function Home() {
  
  useRefreshContext();
  const { user, posts } = useGlobalContext();

  const search = useSearchParams();
  const query = search.toString();
  const queryParams = new URLSearchParams(query);

  const [showFilteredPosts, setShowFilteredPosts] = useState<PostClass[]>([]);

  useEffect(() => {
    if (posts.length > 0) {
      setShowFilteredPosts(useFilterPosts([...posts], queryParams, user));
    }
  }, [posts]);

  return (
    <Timeline 
      user={user}
      posts={showFilteredPosts}
      header={<>
        <section className="w-full flex flex-row justify-between bg-white rounded-sm p-4 gap-4">
          <h6 className="text-gray-800 font-regular text-xs leading-4">Showing {posts.length} results</h6>
        </section>
      </>}
      panels={<>
        <SearchFilters />
        <About />
      </>}
    />
  )
}