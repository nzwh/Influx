import React, { Dispatch, SetStateAction, useEffect } from 'react';

import { UserClass } from '@/libraries/structures';
import supabase from '@/src/app/backend/model/supabase';

type Dispatcher<S> = Dispatch<SetStateAction<S>>;

interface Props {
  user: UserClass;
  setUser: Dispatcher<UserClass>;
}

const FetchToken = ({ user, setUser }: Props) => {

  const localToken = localStorage.getItem('sb-pmjwqjsoojzbascysdbk-auth-token');

  const fetchUser = async (id : string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('uuid', id)
      .single();

    if (error) {
      throw error;
    }
    
    if (data) {
      setUser((previousData) => ({ ...previousData, ...data }));
    }
  };

  useEffect(() => {
    if (!localToken) {
      setUser(new UserClass({
        id: -1,
        handle: 'Guest',
        first_name: 'Guest',
        last_name: 'User',
        icon: '/root/temp.jpg',
        email_address: '',
      }));
      
    } else {
      const localData = JSON.parse(localToken);
      fetchUser(localData.user.id);
    }
  }, [localToken]);

  useEffect(() => {
    console.log("Logged in as:", user);
  }, [user]);

}

export default FetchToken;