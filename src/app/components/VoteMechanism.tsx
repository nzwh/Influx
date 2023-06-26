'use client';

import Image from 'next/image';

import React, { useState } from "react";

import { PostInterface } from "@/libraries/interfaces";
import { ArrowUp, ArrowDown } from 'lucide-react';

interface PostOpenProps {
  onClose: () => void;
  post: PostInterface | null;
}

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
      <div className="flex flex-row gap-2">
        <ArrowUp strokeWidth={3} width={14} height={14} className="cursor-pointer" onClick={upvote} />  
        <h6 className="text-gray-950 font-bold text-sm tracking-tighter leading-4">{post!.upvotes - post!.downvotes}</h6>
        <ArrowDown strokeWidth={3} width={14} height={14} className="cursor-pointer" onClick={downvote} /> 
      </div>
    </main>
  );
};

export default VoteMechanism;