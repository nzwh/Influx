'use client';

import Image from 'next/image';

import React, { useState } from "react";

import { PostInterface } from "@/libraries/interfaces";

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
      console.log(post!.upvotes);
      console.log(post!.downvotes);
    }
    else if (upvoted && !downvoted) {
      post!.upvotes -= 1;
      setUpvoted(false);
      console.log(post!.upvotes);
      console.log(post!.downvotes);
    }
    else if (!upvoted && downvoted) {
      post!.upvotes += 1;
      post!.downvotes -= 1;
      setUpvoted(false);
      setDownvoted(true);
      console.log(post!.upvotes);
      console.log(post!.downvotes);
    }
  };

  const downvote = () => {
    if (!downvoted && !upvoted) {
      post!.downvotes += 1;
      setDownvoted(true);
      console.log(post!.upvotes);
      console.log(post!.downvotes);
    }
    else if (downvoted && !upvoted) {
      post!.downvotes -= 1;
      setDownvoted(false);
      console.log(post!.upvotes);
      console.log(post!.downvotes);
    }
    else if (!downvoted && upvoted) {
      post!.downvotes += 1;
      post!.upvotes -= 1;
      setDownvoted(false);
      setUpvoted(true);
      console.log(post!.upvotes);
      console.log(post!.downvotes);
    }
  };
  
  return (
    <main>
      <div className="flex flex-row gap-2">
      <Image src="/icons/b-arrup.svg" alt="Upvote Button" width={14} height={14} className="cursor-pointer" onClick={upvote} />  
      <h6 className="text-gray-950 font-bold text-sm tracking-tighter leading-4">{post!.upvotes - post!.downvotes}</h6>
      <Image src="/icons/b-arrdw.svg" alt="Upvote Button" width={14} height={14} className="cursor-pointer" onClick={downvote} /> 
      </div>
    </main>
  );
};

export default VoteMechanism;