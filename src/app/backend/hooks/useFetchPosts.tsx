import { useState, useEffect } from 'react';

import { PostClass, CommunityInterface, UserInterface } from '@/libraries/structures';

import supabase from '@/src/app/backend/model/supabase';

interface Props {
  type: string;
  userId?: string;
  query?: string;
}

const useFetchPosts = ({type, userId, query}: Props) => {

  const [posts, setPosts] = useState<PostClass[]>([]);

  // Renders existing posts on page load.
  const fetchPosts = async () => {
    try {
      console.log('Fetching posts...');
      let supabaseQuery = supabase.from('posts').select('*').order('posted_at', { ascending: false });

      if (type === 'user') {
        supabaseQuery = supabaseQuery.eq('author', userId);
      } else if (type === 'query') {
        // TODO: Implement fetch queried posts
        // Ex. supabaseQuery = supabaseQuery.ilike('title', `%${query}%`);
      }

      const { data, error } = await supabaseQuery;
      if (error) {
        throw error;
      }
      if (data) {
        const formattedData = data.map((post) => ({
          id: post.id,
          origin: { uuid: post.origin } as CommunityInterface,
          author: { uuid: post.author } as UserInterface,
          type: post.type,
          posted_at: post.posted_at,
          price: post.price,
          title: post.title,
          description: post.description,
          condition: post.condition,
          tags: post.tags,
          media: post.media,
          is_edited: post.is_edited,
          edited_at: post.edited_at,
          upvotes: post.upvotes,
          downvotes: post.downvotes,
          interests: post.interests,
          bookmarks: post.bookmarks,
          comments: post.comments,
          is_open: post.is_open,
          range_start: post.range_start,
          range_end: post.range_end,
        }));

        const authorIds = formattedData.map((post) => post.author.uuid);
        const { data: profiles, error: profilesError } = await supabase
          .from('profiles')
          .select('*')
          .in('uuid', authorIds);

        const communityIds = formattedData.map((post) => post.origin.uuid);
        const { data: communities, error: communitiesError } = await supabase
          .from('communities')
          .select('*')
          .in('uuid', communityIds);

        formattedData.forEach((post) => {
          const user = profiles?.find((user: UserInterface) => user.uuid === post.author.uuid);
          const community = communities?.find((community: CommunityInterface) => community.uuid === post.origin.uuid);
          user ? post.author = user : null;
          community ? post.origin = community : null;
        });

        setPosts(formattedData);
        console.log(data.length > 0 ? `Fetched ${data.length} posts.` : `'No posts found.'`)
      }
    } catch (error) {
      console.log('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return { posts, fetchPosts };
};

export default useFetchPosts;