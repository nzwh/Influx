'use client';

import React, { useState, useEffect } from "react";

import { PostClass } from "@/libraries/structures";
import { ArrowUp, ArrowDown } from 'lucide-react';
import Supabase from '@/src/app/backend/model/supabase';
import { useGlobalContext } from '@/src/app/backend/hooks/GlobalContext';

interface Props {
  type: string,
  post: PostClass,
  commentId?: number;
}

const ToggleVote: React.FC<Props> = ({ type, post, commentId }) => {

  const savePostUpvotes = async () => {
    const { data, error } = await Supabase
      .from('posts')
      .update({ upvotes: post.upvotes })
      .eq('id', post.id);

    if (error) throw error;
  };

  const savePostDownvotes = async () => {
    const { data, error } = await Supabase
      .from('posts')
      .update({ downvotes: post.downvotes })
      .eq('id', post.id);

    if (error) throw error;
  };

  const { user } = useGlobalContext();

  const [upvoted, setUpvoted] = useState(post.upvotes?.includes(user.uuid));
  const [downvoted, setDownvoted] = useState(post.downvotes?.includes(user.uuid));

  const handleUpvote = () => {

    if (!upvoted) { 
      if (downvoted) { 
        post.downvotes?.splice(post.downvotes?.indexOf(user.uuid), 1);
        savePostDownvotes();
        setDownvoted(false);
      }
      post.upvotes?.push(user.uuid);
      savePostUpvotes();
      setUpvoted(true);
    } else { 
      post.upvotes?.splice(post.upvotes?.indexOf(user.uuid), 1);
      savePostUpvotes();
      setUpvoted(false);
    }

  };

  const handleDownvote = () => {

    if (!downvoted) {
      if (upvoted) {
        post.upvotes?.splice(post.upvotes?.indexOf(user.uuid), 1);
        savePostUpvotes();
        setUpvoted(false);
      }
      post.downvotes?.push(user.uuid);
      savePostDownvotes();
      setDownvoted(true);
    } else {
      post.downvotes?.splice(post.downvotes?.indexOf(user.uuid), 1);
      savePostDownvotes();
      setDownvoted(false);
    }

  };
  
  return (
    <main>
      <div className="flex flex-row items-center mr-2">

        <div className={`flex items-center justify-center cursor-pointer hover:bg-gray-200 h-6 w-6 transition-colors duration-200 ${upvoted ? "bg-gray-300" : ""}`}>
          <ArrowUp className="text-gray-800 m-1" size={14} strokeWidth={3} onClick={handleUpvote}/>
        </div>

        <h6 className="text-gray-800 font-normal text-xs px-2">{(post.upvotes?.length || 0) - (post.downvotes?.length || 0)}</h6>

        <div className={`flex items-center justify-center cursor-pointer hover:bg-gray-200 h-6 w-6 transition-colors duration-200 ${downvoted ? "bg-gray-300" : ""}`}>
          <ArrowDown className="text-gray-800 m-1" size={14} strokeWidth={3} onClick={handleDownvote}/>
        </div>
        
      </div>
    </main>
  );
};

export default ToggleVote;