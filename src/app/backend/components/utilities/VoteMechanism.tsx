'use client';

import React, { useState, useEffect } from "react";

import { PostInterface } from "@/libraries/structures";
import { ArrowUp, ArrowDown } from 'lucide-react';
import Supabase from '@/src/app/backend/model/supabase';
import { useGlobalContext } from '@/src/app/backend/hooks/GlobalContext';

interface Props {
  type: string,
  postId?: number;
  commentId?: number;
}

const VoteMechanism: React.FC<Props> = ({ type, postId, commentId }) => {

  const { user } = useGlobalContext();

  const [upvotes, setUpvotes] = useState<String[]>([]);
  const [downvotes, setDownvotes] = useState<String[]>([]);
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);

  useEffect(() => {
    async function fetchVotes() {
      if (type === "post") {
        const { data, error } = await Supabase
          .from('posts')
          .select('upvotes, downvotes')
          .eq('id', postId)
          .single();
        
        if (error) {
          console.error('Error fetching votes from post with ID ${postId}:', error);
        } else {
          const upvotesArray = data.upvotes || [];
          const downvotesArray = data.downvotes || [];
          setUpvotes(upvotesArray);
          setDownvotes(downvotesArray);
        }
      }
      else if (type === "comment") {
        // for comment votes
      }
    }

    fetchVotes();
  }, []);

  async function updatePostInDatabase(postId: any, upvotes: any, downvotes: any) {
    try {
      const { data, error } = await Supabase
        .from('posts')
        .update({ upvotes, downvotes })
        .eq('id', postId);
  
      console.log('Post updated in the database:', postId, upvotes, downvotes);
    } catch (error) {
      console.error('Error updating post in the database:', error);
    }
  }

  const handleUpvote = () => {
    const userUpvoted = upvotes.includes(user.uuid);
    console.log(userUpvoted);

    if (userUpvoted) {
      // If the user already upvoted, remove their ID from the upvotes array
      setUpvotes(prevUpvotes => prevUpvotes.filter(id => id !== user.uuid));
      console.log(upvotes);
    } else {
      // If the user hasn't upvoted, remove their ID from the downvotes array (if present) and append to the upvotes array.
      setDownvotes(prevDownvotes => prevDownvotes.filter(id => id !== user.uuid));
      setUpvotes(prevUpvotes => [...prevUpvotes, user.uuid]);
    }
  
    // You can also set the upvoted state based on whether the user's ID is in the upvotes array.
    setUpvoted(!userUpvoted);
    console.log(upvoted);

    updatePostInDatabase(postId, upvotes, downvotes);
  };

  const handleDownvote = async () => {
    // Check if the user's ID is already in the downvotes array.
    const userDownvoted = downvotes.includes(user.uuid);
    console.log(userDownvoted);
  
    if (userDownvoted) {
      // If the user already downvoted, remove their ID from the downvotes array.
      setDownvotes(prevDownvotes => prevDownvotes.filter(id => id !== user.uuid));
    } else {
      // If the user hasn't downvoted, remove their ID from the upvotes array (if present) and append to the downvotes array.
      setUpvotes(prevUpvotes => prevUpvotes.filter(id => id !== user.uuid));
      setDownvotes(prevDownvotes => [...prevDownvotes, user.uuid]);
    }
  
    // You can also set the downvoted state based on whether the user's ID is in the downvotes array.
    setDownvoted(userDownvoted);

    await updatePostInDatabase(postId, upvotes, downvotes);
  };
  
  return (
    <main>
      <div className="flex flex-row gap-1 items-center">
        <ArrowUp className="opacity-70 cursor-pointer" color="black" size={14} strokeWidth={3} onClick={handleUpvote}/>
        <h6 className="text-gray-800 font-normal text-xs">{upvotes.length - downvotes.length}</h6>
        <ArrowDown className="opacity-70 cursor-pointer" color="black" size={14} strokeWidth={3} onClick={handleDownvote}/>
      </div>
    </main>
  );
};

export default VoteMechanism;