import { Dispatch, SetStateAction, useState, useEffect } from 'react';

import useFetchUsers from '@/src/app/backend/hooks/useFetchUsers';
import useFetchCommunities from '@/src/app/backend/hooks/useFetchCommunities';
import { PostClass, CommunityClass, UserClass } from '@/libraries/structures';
import Supabase from '@/src/app/backend/model/supabase';

type Dispatcher<S> = Dispatch<SetStateAction<S>>;

interface Props {
  u?: string;
  s?: string;
  so?: string;
  c?: string;
  t?: string;
  rs?: string;
  re?: string;
  tg?: string;
  o?: string;
  ow?: string;
  setPosts: Dispatcher<PostClass[]>;
}

const SearchPosts = ({ u, s, so, c, t, rs, re, tg, o, ow, setPosts }: Props) => {

  const [users, setUsers] = useState<UserClass[]>([]);
  const [communities, setCommunities] = useState<CommunityClass[]>([]);
  
  const searchPosts = async () => {

    let SupabaseQuery = Supabase
      .from('posts')
      .select('*');

    if(c && c !== 'all') SupabaseQuery = SupabaseQuery.eq('condition', c);
    if(t && t !== 'all') SupabaseQuery = SupabaseQuery.eq('type', t);
    if (rs) {
        if (t==='selling') SupabaseQuery = SupabaseQuery.gte('price', rs);
        else if (t==='buying') SupabaseQuery = SupabaseQuery.gte('range_start', rs);
    }
    if (re) {
        if (t==='selling') SupabaseQuery = SupabaseQuery.lte('price', re);
        else if (t==='buying') SupabaseQuery = SupabaseQuery.lte('range_end', re);
    }
    if(o) SupabaseQuery = SupabaseQuery.eq('is_open', o);  
    if(so === 'ascending') SupabaseQuery = SupabaseQuery.order('posted_at', { ascending: true });
    else {SupabaseQuery = SupabaseQuery.order('posted_at', { ascending: false });}

    const { data, error } = await SupabaseQuery;
    if (error) throw error;
    if (!data) return;

    console.log(`search data -> ${data.length}`)
    let newData = data.map((post) => new PostClass({
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

    if (u || ow) {
        newData = newData.filter((post) => {
            const postUser = users?.find((user: UserClass) => 
                user.uuid === post.author.uuid
            )
            if (u) return postUser?.handle == u
            else return postUser?.handle == 'katarinabluu'; // change katarinabluu to get the user handle
        })
    }
    newData.forEach((post) => {
      post.author = users?.find(
        (user: UserClass) => user.uuid === post.author.uuid) || new UserClass();
      post.origin = communities?.find(
        (community: CommunityClass) => community.uuid === post.origin.uuid) || new CommunityClass();
    });

    if (s) {
        if (['upvotes', 'popularity'].includes(s)) {
            newData.sort((a, b) => {
                let interactionCountA = (a.upvotes && a.upvotes.length) || 0;
                let interactionCountB = (b.upvotes && b.upvotes.length) || 0;

                if (s === 'popularity') {
                    interactionCountA += (a.bookmarks && a.bookmarks.length) || 0;
                    interactionCountB += (b.bookmarks && b.bookmarks.length) || 0;
                    interactionCountA += (a.comments && a.comments.length) || 0;
                    interactionCountB += (b.comments && b.comments.length) || 0;
                }
                return (interactionCountB - interactionCountA) * (so && so === 'ascending' ? -1 : 1);
            }) 
        }  else if (s == 'price') {
            newData.sort((a, b) => {
                return (((b.price || 0) + (b.range_start || 0)) - ((a.price || 0) + (a.range_start || 0))) *
                (so && so === 'ascending' ? -1 : 1);
            })
        } 
           
    }
    


    
    setPosts(newData);
  };

  useEffect(() => {
   searchPosts()
  }, []);

  return { searchPosts };
};

export default SearchPosts;