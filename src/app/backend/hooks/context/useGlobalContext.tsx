'use client' //* Uses interactable components

import { Dispatch, SetStateAction, createContext, useContext, useState } from 'react';
import { UserClass, PostClass } from '@/libraries/structures';

import useFetchToken from '@/src/app/backend/hooks/fetching/useFetchToken';
import useFetchPosts from '@/src/app/backend/hooks/fetching/useFetchPosts';

type Dispatcher<S> = Dispatch<SetStateAction<S>>;

interface Props {
  user: UserClass;
  setUser: Dispatcher<UserClass>;
  posts: PostClass[];
  setPosts: Dispatcher<PostClass[]>;
}

const GlobalContext = createContext<Props>({
  user: new UserClass({
    icon: '/root/temp.jpg',
    banner: '/root/temp.jpg'
  }),
  setUser: () => {},
  posts: [],
  setPosts: () => {},
});

export const useGlobalContext = () => useContext(GlobalContext);

export const useRefreshContext = () => {
  const { user, setUser, posts, setPosts } = useGlobalContext();
  useFetchToken({ user, setUser });
  useFetchPosts({ posts, setPosts });
}

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  
  const [user, setUser] = useState<UserClass>(new UserClass({
    icon: '/root/temp.jpg',
    banner: '/root/temp.jpg'
  }));
  const [posts, setPosts] = useState<PostClass[]>([]);
  useRefreshContext();

  return (
    <GlobalContext.Provider value={{ user, setUser, posts, setPosts }}>
      {children}
    </GlobalContext.Provider>
  );
};
