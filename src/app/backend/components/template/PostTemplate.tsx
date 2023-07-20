"use client" // * Uses interactable components

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

import ExpandPostPopup from '@/src/app/backend/components/dialogs/ExpandPostPopup';
import VoteMechanism from '@/src/app/backend/components/utilities/VoteMechanism';

import { Post as PostInterface } from "@/libraries/structures";
import { MessageCircle, MoreHorizontal, Trash, Share2, ShoppingBag } from 'lucide-react';

interface Props {
  post: PostInterface;
  onDelete: (postId: number) => void;
}

const PostTemplate: React.FC<Props> = ({ post, onDelete }) => {
  
  const [isExpandPostOpen, setIsExpandPostOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<PostInterface>();

  // Handles opening the ExpandPostPopup.
  const handleExpandPostOpen = ( post: PostInterface ) => {
    setSelectedPost(post);
    setIsExpandPostOpen(true);
  };

  // Handles closing the ExpandPostPopup.
  const handleExpandPostClose = () => {
    setIsExpandPostOpen(false);
  };

  // Handles deleting a post from the list.
  // TODO: Relocate to popup
  const handlePostDelete = (id:number) => {
    onDelete(id);
  };

  // Converts a number to a monetary value.
  // TODO: Move to utilities
  const convertToMonetary = (value: number) => {
    if (value >= 1000000) {
      const formattedValue = (value / 1000000).toFixed(2);
      return `${formattedValue}M`;
    }	

    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return formatter.format(value);
  };

  // Converts a timestamp to a relative date.
  // TODO: Move to utilities
  const convertToRelativeDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
  
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const years = Math.floor(weeks / 52);
  
    if (years > 0) {
      const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
      return formattedDate;
    } 
    else if (weeks > 0) {
      return `${weeks}w ago`;
    } 
    else if (days > 0) {
      return `${days}d ago`;
    } 
    else if (hours > 0) {
      return `${hours}h ago`;
    } 
    else if (minutes > 0) {
      return `${minutes}m ago`;
    } 
    else {
      return `${seconds}s ago`;
    }
  };
  
  // Sorts tags by length.
  post.tags ? post.tags.sort(function(a, b){return b.length - a.length}) : null;

	return (
    <article className="bg-white flex flex-col w-full rounded-sm p-4 gap-3 overflow-visible z-0 shadow-xl hover:shadow-2xl transition-shadow duration-400">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col gap-3">
        <div className="flex flex-row items-center gap-2">
          <Image className="rounded-full" src={post.origin.icon} alt="Shop Icon" width={16} height={16} />
          <h6 className="text-gray-800 font-medium text-[0.65rem]">{post.origin.name}</h6>
          <h6 className="text-gray-500 font-normal text-[0.65rem]">{`@i/${post.origin.handle}`}</h6>
        </div>
        
        <div className="flex flex-row items-center gap-2">
          <Image className="rounded-full" src={post.author?.icon} alt="User Icon" width={36} height={36} />
          <div className="flex flex-col justify-center">
            <h6 className="text-gray-800 font-medium text-base leading-4 tracking-tight">{`${post.author?.first_name} ${post.author?.last_name}`}</h6>
            <h6 className="text-gray-500 font-normal text-[0.65rem] leading-4">{`@${post.author?.handle}`}&ensp;•&ensp;{convertToRelativeDate(post.posted_at.toLocaleString())}</h6>
          </div>
        </div>
        </div>

        <div className="flex flex-row items-start mt-1 mr-1">
        <div className="flex flex-row items-center gap-3">
          <div className="bg-gray-800 rounded-full px-2 py-[0.1875rem]">
            <h6 className="text-white font-normal tracking-wider text-[0.5rem] leading-[0.6rem] mt-[0.04rem]">{post.is_open ? "NEGOTIABLE" : "FIXED"}</h6>
          </div>
          <h1 className="text-gray-950 font-normal text-xl tracking-tight leading-4">{convertToMonetary(post.price || 0)}</h1>
          <MoreHorizontal color="black" size={12} className="cursor-pointer" onClick={() => handlePostDelete(post.id)} />
        </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 cursor-pointer" onClick={() => { handleExpandPostOpen(post) }}>
        <h1 className="text-gray-950 font-normal text-lg tracking-tight leading-[1.375rem] truncate break h-auto whitespace-pre-line">
          {post.title}
          <span className="text-white font-light tracking-wide text-[0.625rem] bg-gray-400 relative top-[-0.15rem] rounded-full px-2 py-1 ml-2 z-[-1]">{post.condition}</span>
        </h1>
        <p className="text-gray-800 font-light text-sm tracking-tight leading-4 truncate break h-auto whitespace-pre-line">
          {post.description}
        </p>
      </div>

      {isExpandPostOpen && (
        <ExpandPostPopup post={selectedPost!} onClose={handleExpandPostClose} />
      )}

      {(post.tags?.length === 0) ? <></> : 
        <div className="flex flex-row gap-2 items-start w-full">
          <div className="flex flex-wrap gap-2">
            {post.tags?.map((tag) => (
              <span className="text-gray-600 font-medium text-[0.65rem] leading-3 bg-gray-200 rounded-xl px-2 py-1 tracking-normal block"># {tag}</span>
            ))}
          </div>
        </div>
      }
      
      {(post.media?.length == 0) ? <></> :
        <Image className="w-full h-full rounded-sm cursor-pointer" src={post.media![0]} alt="Media" width={0} height={0} sizes="100vw" onClick={() => {
          handleExpandPostOpen(post);
        }} />
      }
    
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center gap-4">
        <VoteMechanism post={post!} />

        <div className="flex flex-row gap-1 items-center">
          <Share2 className="opacity-70" color="black" size={12} strokeWidth={3} /> 
          <h6 className="text-gray-800 font-normal text-xs">{post.shares} shares</h6>
        </div>
        <div className="flex flex-row gap-1 items-center">
          <ShoppingBag className="opacity-70" color="black" size={12} strokeWidth={3} />  
          <h6 className="text-gray-800 font-normal text-xs">{post.interests?.length} interested</h6>
        </div>
        <MoreHorizontal className="opacity-70" color="black" size={12} strokeWidth={3} /> 
        </div>

        <div className="flex flex-row gap-1 items-center">
          <MessageCircle className="opacity-70" color="black" size={12} strokeWidth={3} />
          <h6 className="text-gray-800 font-normal text-xs">{post.comments?.length} comments</h6>
        </div>
      </div>
    </article>
	);
};
  
export default PostTemplate;