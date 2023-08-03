"use client" // * Uses interactable components

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

import useNavigateToProfile from '@/src/app/backend/hooks/useNavigateToProfile';
import useMonetaryFormatter from "@/src/app/backend/hooks/useMonetaryFormatter";
import useRelativeDateFormatter from "@/src/app/backend/hooks/useRelativeDateFormatter";
import ExpandPostPopup from '@/src/app/backend/components/dialogs/ExpandPostPopup';
import VoteMechanism from '@/src/app/backend/components/utilities/VoteMechanism';
import Panel from '@/src/app/backend/components/layouts/PanelLayout';

import { PostClass } from "@/libraries/structures";
import { Bookmark, MessageCircle, MoreHorizontal, Pencil, ShoppingBag, Trash2 } from 'lucide-react';

import { ToTitleCase, ToRelativeTime } from '../../hooks/ToConvert';

import Popover from '@/src/app/backend/components/layouts/PopoverLayout';

interface Props {
  post: PostClass;
}

const PostTemplate: React.FC<Props> = ({ post }) => {

  const navigateToProfile = useNavigateToProfile();
  
  const handleProfileClick = () => {
    post.author?.handle ? navigateToProfile(post.author?.handle) : null;
  };

  const convertToMonetary = useMonetaryFormatter();
  const convertToRelativeDate = useRelativeDateFormatter();

  const [isExpandPostOpen, setIsExpandPostOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<PostClass>();

  // Handles opening the ExpandPostPopup.
  const handleExpandPostOpen = ( post: PostClass ) => {
    setSelectedPost(post);
    setIsExpandPostOpen(true);
  };
  // Handles closing the ExpandPostPopup.
  const handleExpandPostClose = () => {
    setIsExpandPostOpen(false);
  };

  // Handles deleting a post from the list.
  // TODO: Relocate to popup
  const handleDelete = (id:number) => {
    onDelete(id);
  };
  const handleEdit = (id:number) => {
    onEdit(id);
  }

	return (
    <Panel classes="flex-col p-4 gap-4">

      {/* Header */}
      <div className="flex flex-row justify-between">
        <div className="flex flex-col gap-3">
          <div className="flex flex-row items-center gap-2">

            {/* Community Avatar */}
            <Image className="rounded-full" src={post.origin.icon} alt="Shop Icon" width={16} height={16} />

            {/* Community Details */}
            <h6 className="text-gray-800 font-medium text-[0.65rem]">{post.origin.name}</h6>
            <h6 className="text-gray-500 font-normal text-[0.65rem]">{`@c/${post.origin.handle}`}</h6>
            
          </div>
          
          <div className="flex flex-row items-center gap-2 w-full">

            {/* Author Avatar */}
            <Image onClick={handleProfileClick} className="rounded-full cursor-pointer" src={post.author?.icon || ""} alt="User Icon" width={36} height={36} />

            <div className="flex flex-col justify-center w-full">
              <div className="flex flex-row gap-0.5 items-center">

                {/* Author Name */}
                <h6 onClick={handleProfileClick} className="text-gray-800 font-medium text-base leading-4 tracking-tight w-full cursor-pointer">
                  {`${post.author?.first_name} ${post.author?.last_name}`}
                </h6>

                {/* Verified Status */}
                { post.author?.is_verified ? (
                  <Image src="/root/verified.svg" width={18} height={18} alt="Verified" />
                ) : (
                  <div className="w-1"></div>
                )}

                {/* Post Type */}
                <span className="bg-gray-200 rounded-full px-2 py-[0.15rem] text-black font-normal tracking-wider text-[0.5rem] leading-[0.6rem] pt-[0.3rem]">
                  {ToTitleCase(post.type || "")}
                </span>

              </div>

              {/* Author Handle */}
              <h6 onClick={handleProfileClick} className="text-gray-500 font-light text-[0.65rem] leading-4 cursor-pointer">{`@${post.author?.handle}`}&ensp;•&ensp;{ToRelativeTime(post.posted_at)}</h6>

            </div>
          </div>
        </div>

        <div className="flex flex-row items-center h-fit mt-1 mr-1 gap-3">

          {/* Open */}
          { post.type === "selling" ? (
            <span className="text-white font-normal tracking-wide text-[0.5rem] bg-gray-800 rounded-full px-2 py-0.5 pt-[0.2rem] leading-3">
              {post.is_open ? "NEGOTIABLE" : "FIXED"}
            </span>
          ) : null}

          {/* Price */}
          { post.type === "selling" ? (
            <h1 className="text-gray-950 font-normal text-xl tracking-tight leading-4">{convertToMonetary(post.price || 0)}</h1>
          ) : post.type === "buying" ? (
            <div className="flex flex-row gap-2 items-center">
            <h1 className="text-gray-950 font-normal text-xl tracking-tight leading-4">{convertToMonetary(post.range_start || 0)}</h1>
            <h1 className="text-gray-950 font-normal text-[0.625rem]">to</h1>
            <h1 className="text-gray-950 font-normal text-xl tracking-tight leading-4">{convertToMonetary(post.range_end || 0)}</h1>
            </div>
          ) : null }

          {/* More */}
          <Popover classes={"top-4 z-[45]"} 
            trigger={
              <MoreHorizontal className="opacity-70 cursor-pointer relative" color="black" size={12} strokeWidth={3} />
            }
            elements={[
              ["Edit", <Pencil size={12} strokeWidth={3}/>, () => handleEdit(post.id)],
              ["Delete", <Trash2 size={12} strokeWidth={3}/>, () => handleDelete(post.id)]
            ]} 
          />

        </div>
      </div>

      <div className="flex flex-col gap-2 cursor-pointer" onClick={() => { handleExpandPostOpen(post) }}>

        {/* Title */}
        <h1 className="text-gray-950 font-normal text-lg tracking-tight leading-[1.375rem] truncate break h-auto whitespace-pre-line">
          {post.title}

          {/* Condition */}
          {post.type === "selling" ? (
          <span className="text-white font-light tracking-wide text-[0.625rem] bg-gray-800 relative top-[-0.15rem] rounded-full px-2 py-1 ml-2">
            {ToTitleCase(post.condition || "")}
          </span>
          ) : null}

        </h1>

        {/* Description */}
        <p className="text-gray-800 font-light text-sm tracking-tight leading-4 truncate break h-auto whitespace-pre-line">
          {post.description.trim()}
        </p>

      </div>

      {isExpandPostOpen && selectedPost && (
        <ExpandPostPopup post={selectedPost} isOpen={isExpandPostOpen} onClose={handleExpandPostClose} />
      )}

      {/* Tags */}
      {(post.tags?.length === 0) ? <></> : 
        <div className="flex flex-row gap-2 items-start w-full">
          <div className="flex flex-wrap gap-1">
            {post.tags?.map((tag) => (
              <span className="text-gray-600 font-medium text-[0.65rem] leading-3 bg-gray-200 rounded-xl px-2 py-1 tracking-normal block"># {tag}</span>
            ))}
          </div>
        </div>
      }
      
      {/* Media */}
      {post.media ? null :
        <Image className="w-full h-full rounded-sm cursor-pointer" src={post.media![0]} alt="Media" width={0} height={0} sizes="100vw" onClick={() => { handleExpandPostOpen(post) }} />
      }

      {/* Controls */}
      <div className="flex flex-row justify-between items-center">

        {/* Upvotes */}
        <VoteMechanism post={post} />

        {/* Comments */}
        <div className="flex flex-row gap-1 items-center">
          <MessageCircle className="opacity-70" color="black" size={12} strokeWidth={3} />
          <h6 className="text-gray-800 font-normal text-xs">{post.comments?.length || 0} comments</h6>
        </div>
        
      </div>
    </Panel>
	);
};
  
export default PostTemplate;