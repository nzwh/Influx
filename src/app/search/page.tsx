"use client"

import { useSearchParams } from 'next/navigation'

// Layouts
import Timeline from '@/src/app/backend/components/layouts/TimelineLayout';

// Panels
import About from '@/src/app/backend/components/panels/columns/AboutPanel';
import SearchFilters from '@/src/app/backend/components/panels/columns/SearchFiltersPanel';

// Hooks & Classes
import { useRefreshContext, useGlobalContext } from '@/src/app/backend/hooks/useGlobalContext';

export default function Home() {
  
  useRefreshContext();
  const { user, posts, setPosts } = useGlobalContext();

  let query = useSearchParams().toString();
  query.split('&').map((q) => {
    let [key, value] = q.split('=');
    
    if (key === 'q') { // Search query
      setPosts(posts.filter((post) => 
      post.title.includes(value) ||
      post.description.includes(value) ||
      post.tags?.join(',').includes(value)));
    }

    if (key === 'u') { // User
      setPosts(posts.filter((post) =>
        post.author.handle.includes(value)));
    }

    if (key === 'c') { // Condition
      setPosts(posts.filter((post) =>
        post.condition = (value)));
    }

    if (key === 't') { // Type
      setPosts(posts.filter((post) =>
        post.type = (value)));
    }

    if (key === 'tg') { // Tags
      setPosts(posts.filter((post) =>
        post.tags?.some((substring) => post.title.includes(substring)) ||
        post.tags?.some((substring) => post.description.includes(substring)) ||
        post.tags?.some((substring) => post.tags?.join(',').includes(substring))
      ));
    }

    if (key === 'o') {
      setPosts(posts.filter((post) => post.is_open === (value === 'true' ? true : false)));
    }

    if (key === 'rs') { // Range
      setPosts(posts.filter((post) => post.type === 'buying' && 
      post.range_start! >= parseInt(value)));
      console.log(value);
    }

    if (key === 're') { // Range
      setPosts(posts.filter((post) => post.type === 'buying' && post.range_end! <= parseInt(value)));
    }

    if (key === 's') { // Sort
      
      switch (value) {
        case 'date_posted':
          setPosts(posts.sort((a, b) => a.posted_at.getSeconds() - b.posted_at.getSeconds()).reverse());
          break;
        case 'upvotes':
          setPosts(posts.sort((a, b) => (a.upvotes?.length || 0) - (a.downvotes?.length || 0) - (b.upvotes?.length || 0) + (b.downvotes?.length || 0)).reverse());
          
          break;
        case 'price':
          setPosts(posts.filter((post) => post.type === 'selling'));
          setPosts(posts.sort((a, b) => (a.price || 0) - (b.price || 0)).reverse());

          break;
        case 'popularity': 
          setPosts(posts.sort((a, b) => (a.cart?.length || 0) - (a.bookmarks?.length || 0) - (b.cart?.length || 0) + (b.bookmarks?.length || 0)).reverse());
          break;
        default:
          break;
      }

    }

    if (key === 'so' && value === 'descending') {
      setPosts(posts.reverse());
    }
    

  });

  return (
    <Timeline 
      user={user}
      posts={posts}
      header={<>
        <section className="w-full flex flex-row justify-between bg-white rounded-sm p-4 gap-4">
          <h6 className="text-gray-800 font-regular text-xs leading-4">Showing results for {query.split('q=')[0]}</h6>
        </section>
      </>}
      panels={<>
        <SearchFilters />
        <About />
      </>}
    />
  )
}