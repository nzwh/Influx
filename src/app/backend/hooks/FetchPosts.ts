import { Dispatch, SetStateAction, useEffect } from 'react';

import { PostClass, CommunityClass, UserClass } from '@/libraries/structures';
import Supabase from '@/src/app/backend/model/supabase';

type Dispatcher<S> = Dispatch<SetStateAction<S>>;

interface Props {
  type?: string;
  query?: string;

  posts: PostClass[];
  setPosts: Dispatcher<PostClass[]>;
}

const FetchPosts = ({ type, query, posts, setPosts }: Props) => {

  const fetchPosts = async () => {

    let SupabaseQuery = Supabase
      .from('posts')
      .select('*')
      .order('posted_at', { ascending: false });

    if (type && ['author', 'community'].includes(type))
      SupabaseQuery = SupabaseQuery.eq(type, query);

    const { data, error } = await SupabaseQuery;

    if (error) throw error;
    if (!data) return;

    const newData = data.map((post) => new PostClass({
      ...post,
      author: { uuid: post.author_id },
      origin: { uuid: post.origin_id }
    }));

    const { data: profiles } = await Supabase
      .from('profiles')
      .select('*')
      .in('uuid', newData.map((post) => post.author.uuid));

    const { data: communities } = await Supabase
      .from('communities')
      .select('*')
      .in('uuid', newData.map((post) => post.origin.uuid));

    newData.forEach((post) => {
      post.author = profiles?.find(
        (user: UserClass) => user.uuid === post.author.uuid) || null;
      post.origin = communities?.find(
        (community: CommunityClass) => community.uuid === post.origin.uuid) || null;
    });

    setPosts(newData);
  };

  useEffect(() => {
    if (posts.length === 0)
      fetchPosts();
  }, [posts]);
};

export default FetchPosts;