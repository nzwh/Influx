'use client';

import React, { useState } from "react";

import { Post as PostInterface } from "@/libraries/structures";
import { ArrowUp, ArrowDown } from 'lucide-react';

const VoteMechanism: React.FC<{ post: PostInterface }> = ({ post }) => {
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);

  const upvote = () => {
    if (!upvoted && !downvoted) {
      post!.upvotes += 1;
      setUpvoted(true);
    }
    else if (upvoted && !downvoted) {
      post!.upvotes -= 1;
      setUpvoted(false);
    }
    else if (!upvoted && downvoted) {
      post!.upvotes += 1;
      post!.downvotes -= 1;
      setUpvoted(true);
      setDownvoted(false);
    }
  };

  const downvote = () => {
    if (!upvoted && !downvoted) {
      post!.downvotes += 1;
      setDownvoted(true);
    }
    else if (!upvoted && downvoted) {
      post!.downvotes -= 1;
      setDownvoted(false);
    }
    else if (upvoted && !downvoted) {
      post!.upvotes -= 1;
      post!.downvotes += 1;
      setUpvoted(false);
      setDownvoted(true);
    }
  };
  
  return (
    <main>
      <div className="flex flex-row gap-1 items-center">
        <ArrowUp className="opacity-70 cursor-pointer" color="black" size={14} strokeWidth={3} onClick={upvote}/>
        <h6 className="text-gray-800 font-regular text-xs">{post!.upvotes - post!.downvotes}</h6>
        <ArrowDown className="opacity-70 cursor-pointer" color="black" size={14} strokeWidth={3} onClick={downvote}/>
      </div>
    </main>
  );
};

export default VoteMechanism;