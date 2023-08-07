"use client"

import React from 'react';
import { useSearchParams } from 'next/navigation'

// Layouts
import Timeline from '@/src/app/backend/components/layouts/TimelineLayout';

// Panels
import About from '@/src/app/backend/components/panels/columns/AboutPanel';
import SearchFilters from '@/src/app/backend/components/panels/columns/SearchFiltersPanel';

// Hooks & Classes
import { useRefreshContext, useGlobalContext } from '@/src/app/backend/hooks/useGlobalContext';
import { PostClass } from '@/libraries/structures';

export default function Home() {
  
  useRefreshContext();
  const { user, posts, setPosts } = useGlobalContext();

  const applyFilter = (posts: PostClass[], key: string, value: string): PostClass[] => {
    switch (key) {
      case 'q':
        return posts.filter(
          (post) =>
            post.title.includes(value) ||
            post.description.includes(value) ||
            (post.tags && post.tags.join(',').includes(value))
        );
      case 'u':
        return posts.filter((post) => post.author.handle.includes(value));
      case 'c':
        return posts.filter((post) => post.condition === value);
      case 't':
        return posts.filter((post) => post.type === value);
      case 'tg':
        return posts.filter(
          (post) =>
            (post.tags && post.tags.some((substring: string) => post.title.includes(substring))) ||
            (post.tags && post.tags.some((substring: string) => post.description.includes(substring))) ||
            (post.tags && post.tags.some((substring: string) => post.tags?.join(',').includes(substring)))
        );
      case 'o':
        return posts.filter((post) => post.is_open === (value === 'true'));
      case 'rs':
        return posts.filter((post) => post.type === 'buying' && post.range_start! >= parseInt(value, 10));
      case 're':
        return posts.filter((post) => post.type === 'buying' && post.range_end! <= parseInt(value, 10));
      default:
        return posts;
    }
  };

  const applySort = (posts: PostClass[], sortBy: string, sortOrder: string): PostClass[] => {
    let sortedPosts = [...posts];
    switch (sortBy) {
      case 'date_posted':
        sortedPosts.sort((a, b) => a.posted_at.getSeconds() - b.posted_at.getSeconds());
        break;
      case 'upvotes':
        sortedPosts.sort((a, b) => (a.upvotes?.length || 0) - (a.downvotes?.length || 0) - (b.upvotes?.length || 0) + (b.downvotes?.length || 0));
        break;
      case 'price':
        sortedPosts = sortedPosts.filter((post) => post.type === 'selling');
        sortedPosts.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'popularity':
        sortedPosts.sort((a, b) => (a.cart?.length || 0) - (a.bookmarks?.length || 0) - (b.cart?.length || 0) + (b.bookmarks?.length || 0));
        break;
      default:
        break;
    }
    if (sortOrder === 'ascending') {
      sortedPosts.reverse();
    }
    return sortedPosts;
  };

  const search = useSearchParams();


  const query = search.toString();
  const queryParams = new URLSearchParams(query);

  let filteredPosts = posts;
  queryParams.forEach((value, key) => {
    if (value && key) {
      filteredPosts = applyFilter(filteredPosts, key, value);
    }
  });

  const sortBy = queryParams.get('s');
  const sortOrder = queryParams.get('so') || 'ascending';

  if (sortBy) {
    filteredPosts = applySort(filteredPosts, sortBy, sortOrder);
  }

  setPosts(filteredPosts);

  return (
    <Timeline 
      user={user}
      posts={posts}
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