import { Dispatch, SetStateAction, useEffect } from 'react';

import { CommunityClass } from '@/libraries/structures';
import Supabase from '@/src/app/backend/model/supabase';

type Dispatcher<S> = Dispatch<SetStateAction<S>>;

interface Props {
  type?: string;
  communities: CommunityClass[];
  setCommunities: Dispatcher<CommunityClass[]>;
  uuids?: string[];
}

const FetchCommunities = ({ type, communities, setCommunities, uuids }: Props) => {

  const fetchCommunities = async () => {

    let SupabaseQuery = Supabase
      .from('communities')
      .select('*')

    if (uuids)
      SupabaseQuery = SupabaseQuery.in('uuid', uuids);

    const { data, error } = await SupabaseQuery;
    if (error) throw error;
    if (!data) return;

    if (type === 'all') {
      setCommunities(data.map((community) => new CommunityClass(community)));
    } else {
      communities.push(...data.map((community) => new CommunityClass(community)));
    }
  };

  if (type === 'all') {
    useEffect(() => {
      if (communities.length === 0)
        fetchCommunities();
    }, [communities]);
  }

  return fetchCommunities;
};

export default FetchCommunities;