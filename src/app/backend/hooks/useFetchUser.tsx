import { useState, useEffect } from 'react';

import { User as UserInterface } from '@/libraries/structures';

import supabase from '@/src/app/backend/model/supabase';

interface Props {
  type: string;
  userId?: string;
  handle?: string;
}

const useFetchUser = ({ type, userId, handle }: Props) => {

  const [user, setUser] = useState<UserInterface[]>([]);

  const fetchUser = async () => {
    try {
      console.log('Fetching user...');
      let supabaseQuery = supabase.from('profiles').select('*');

      if (type === 'userId') {
        supabaseQuery = supabaseQuery.eq('uuid', userId);
      } else if (type === 'handle') {
        supabaseQuery = supabaseQuery.eq('handle', handle);
      }

      const { data, error } = await supabaseQuery;
      if (error) {
        throw error;
      }
      if (data && data.length > 0) {
        const formattedData = data.map((user) => ({
          id: user.id,
          uuid: user.uuid,
          handle: user.handle,
          email_address: '',
          icon: user.icon,
          banner: user.banner,
          first_name: user.first_name,
          last_name: user.last_name,
          phone_number: '',
          location: user.location,
          biography: user.biography,
          payment_methods: user.payment_methods,
          delivery_methods: user.delivery_methods,
          is_verified: user.is_verified,
        }));

        setUser(formattedData);
        console.log(`Fetched user:`, formattedData);
      } else {
        console.log('No user found.');
      }
    } catch (error) {
      console.log('Error fetching user:', error);
    }
  };

  useEffect(() => {
    fetchUser();
  });

  return { user, fetchUser };
};

export default useFetchUser;
