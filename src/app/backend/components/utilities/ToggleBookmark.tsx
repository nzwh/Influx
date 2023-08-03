"use client"

import React, { useState } from "react";

// Hooks & Classes
import Supabase from '@/src/app/backend/model/supabase';
import { useGlobalContext } from "@/src/app/backend/hooks/GlobalContext";
import { PostClass } from "@/libraries/structures";

// Icons
import { Bookmark } from 'lucide-react';

interface Props {
  post: PostClass;
}

const ToggleBookmark: React.FC<Props> = ({ post }) => {

  const savePostBookmarks = async () => {
    const { data, error } = await Supabase
      .from('posts')
      .update({ bookmarks: post.bookmarks })
      .eq('id', post.id);

    if (error) throw error;
  };

  const saveUserBookmarks = async () => {
    const { data, error } = await Supabase
      .from('profiles')
      .update({ bookmarks: user.bookmarks })
      .eq('uuid', user.uuid);

    if (error) throw error;
  };

  const { user } = useGlobalContext();

  const [bookmarked, setBookmarked] = useState(post.bookmarks?.includes(user.uuid));

  const handleBookmarkToggle = () => {
    if (!bookmarked) {
      post.bookmarks?.push(user.uuid);
      user.bookmarks?.push(post.id);
      savePostBookmarks();
      saveUserBookmarks();
      setBookmarked(true);
    }
    else {
      post.bookmarks?.splice(post.bookmarks?.indexOf(user.uuid), 1);
      user.bookmarks?.splice(user.bookmarks?.indexOf(post.id), 1);
      savePostBookmarks();
      saveUserBookmarks();
      setBookmarked(false);
    }
  };

  return (
    <div className={`flex flex-row gap-1 items-center cursor-pointer hover:bg-gray-200 transition-colors duration-200 px-2 py-1 rounded-sm h-6 ${bookmarked ? "bg-violet-100":""}`} onClick={handleBookmarkToggle}>
  
      { bookmarked ? (<>
        <Bookmark className="text-gray-800" size={12} strokeWidth={3} /> 
        <h6 className="text-gray-800 font-normal text-xs">
          {post.bookmarks?.length || 0} bookmarked
        </h6>
      </>) : (<>
        <Bookmark className="opacity-70" color="black" size={12} strokeWidth={3} /> 
        <h6 className="text-gray-800 font-normal text-xs">
        {post.bookmarks?.length || 0} {post.bookmarks?.length === 1 ? 'bookmarked' : 'bookmarked'}
        </h6>
      </>)}
      
    </div>
  );
}

export default ToggleBookmark;