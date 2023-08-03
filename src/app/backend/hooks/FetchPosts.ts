import { Dispatch, SetStateAction, useState, useEffect } from 'react';

import useFetchUsers from '@/src/app/backend/hooks/FetchUsers';
import useFetchCommunities from '@/src/app/backend/hooks/FetchCommunities';
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

  const [users, setUsers] = useState<UserClass[]>([]);
  const [communities, setCommunities] = useState<CommunityClass[]>([]);

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
      origin: { uuid: post.origin_id },
      posted_at: new Date(post.posted_at),
      edited_at: post.is_edited ? new Date(post.edited_at) : null,
    }));
    
    const fetchUsers = useFetchUsers({ type: 'subquery', users, setUsers, uuids: newData.map((post) => post.author.uuid) });
    await fetchUsers();

    const fetchCommunities = useFetchCommunities({ type: 'subquery', communities, setCommunities, uuids: newData.map((post) => post.origin.uuid) });
    await fetchCommunities();

    newData.forEach((post) => {
      post.author = users?.find(
        (user: UserClass) => user.uuid === post.author.uuid) || new UserClass();
      post.origin = communities?.find(
        (community: CommunityClass) => community.uuid === post.origin.uuid) || new CommunityClass();
    });

    setPosts(newData);
  };

  useEffect(() => {
    if (posts.length === 0)
      fetchPosts();
  }, [posts]);
};

export default FetchPosts;