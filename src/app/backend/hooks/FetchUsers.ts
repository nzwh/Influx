import { Dispatch, SetStateAction, useEffect } from 'react';

import { UserClass } from '@/libraries/structures';
import Supabase from '@/src/app/backend/model/supabase';

type Dispatcher<S> = Dispatch<SetStateAction<S>>;

interface Props {
  type: string;
  users: UserClass[];
  setUsers: Dispatcher<UserClass[]>;
  uuids?: string[];
}

const FetchUsers = ({ type, users, setUsers, uuids }: Props) => {

  const fetchUsers = async () => {

    let SupabaseQuery = Supabase
      .from('profiles')
      .select('*')

    if (uuids)
      SupabaseQuery = SupabaseQuery.in('uuid', uuids);

    const { data, error } = await SupabaseQuery;
    if (error) throw error;
    if (!data) return;

    if (type === 'state') {
      setUsers(data.map((user) => new UserClass(user)));
    } else {
      users.push(...data.map((user) => new UserClass(user)));
    }
  };

  return fetchUsers;
};

export default FetchUsers;