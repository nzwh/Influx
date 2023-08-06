'use client';

import React, { useRef, useState } from "react";
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Layouts
import Wrapper from '@/src/app/backend/components/layouts/WrapperLayout';
import Carousel from "@/src/app/backend/components/layouts/ImageCarousel";
import Comment from "@/src/app/backend/components/utilities/CommentSection";

// Hooks & Classes
import { PostClass } from "@/libraries/structures";
import { CommentsProvider } from '@/src/app/backend/hooks/CommentsContext';
import OutsideClick from "@/src/app/backend/hooks/OutsideClick";
import ToggleBookmark from "@/src/app/backend/components/utilities/ToggleBookmark";
import ToggleCart from "@/src/app/backend/components/utilities/ToggleCart";
import ToggleVote from "@/src/app/backend/components/utilities/ToggleVote";
import { ToTitleCase, ToRelativeTime, ToMonetary } from '@/src/app/backend/hooks/ToConvert';
import { X,MessageCircle } from 'lucide-react';

import useNavigateToProfile from "@/src/app/backend/hooks/useNavigateToProfile";

interface Props {
  post: PostClass;
  onClose: () => void;
}

const ExpandPostPopup: React.FC<Props> = ({ post, onClose }) => {

  const router = useRouter();
  post = new PostClass(post);

  // Allow outside click to close modal
  const modalRef = useRef<HTMLDivElement | null>(null);
  OutsideClick(modalRef, onClose);

  const navigateToProfile = useNavigateToProfile();
  const handleProfileClick = () => {
    navigateToProfile(post.author.handle);
  };

  return (
    <main 
      className="text-gray-950 fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50"> 
      <div className="flex flex-row gap-2 h-[72%] w-auto justify-center z-50" ref={modalRef}>

        <Carousel media={post.media || []} />
              
        <Wrapper className="flex flex-col gap-4 h-full w-[26rem] bg-white rounded-sm p-6 shadow-xl hover:shadow-2xl transition-shadow duration-400">

          <div className="flex flex-col gap-4 w-full">

            {/* Community */}
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row items-center gap-2">

                {/* Community Avatar */}
                <Image className="rounded-full" src={post.origin.icon} alt="Shop Icon" width={16} height={16} />

                {/* Community Details */}
                <h6 className="text-gray-800 font-medium text-[0.65rem]">{post.origin.name}</h6>
                <h6 className="text-gray-500 font-normal text-[0.65rem]">{`@c/${post.origin.handle}`}</h6>

              </div>

              <X className="cursor-pointer" color="black" size={14} strokeWidth={3} onClick={onClose} />
            </div>

          { post.type === "article" ? null : (
          <div className="flex flex-row gap-2 items-start h-fit">

            {/* Price */}
            { post.type === "selling" ? (
              <h1 className="text-gray-950 font-normal text-[1.75rem] tracking-tight leading-5">{ToMonetary(post.price || 0)}</h1>
            ) : post.type === "buying" ? (
              <div className="flex flex-row gap-2 items-center">
              <h1 className="text-gray-950 font-normal text-[1.75rem] tracking-tight leading-5">{ToMonetary(post.range_start || 0)}</h1>
              <h1 className="text-gray-950 font-normal text-[0.625rem]">to</h1>
              <h1 className="text-gray-950 font-normal text-[1.75rem] tracking-tight leading-5">{ToMonetary(post.range_end || 0)}</h1>
              </div>
            ) : null }
            
            {/* Open */}
            { post.type === "selling" ? (
              <span className="text-white font-light tracking-wider text-[0.5rem] bg-slate-500 rounded-full px-1.5 py-0.5 pt-[0.2rem] leading-[0.5rem]">
                {post.is_open ? "NEGOTIABLE" : "FIXED"}
              </span>
            ) : null}
          </div>
          )}
          
          <div className="flex flex-col gap-2">

          {/* Title */}
          <h1 className="text-gray-950 font-normal text-lg tracking-tight leading-[1.375rem] truncate break h-auto whitespace-pre-line">
            {post.title}

            {/* Condition */}
            {post.type === "selling" ? (
            <span className="text-black font-light tracking-wider text-[0.55625rem] bg-violet-200 relative top-[-0.20rem] rounded-full px-2 py-1 ml-2">
              {ToTitleCase(post.condition || "")}
            </span>
            ) : null}

          </h1>

          {/* Description */ }
          <p className="text-gray-800 font-light text-sm tracking-tight leading-4 truncate break h-auto whitespace-pre-line">
            {post.description.trim()}
          </p>

          </div>

          {/* Tags */}
          {(post.tags?.length === 0) ? <></> : 
            <div className="flex flex-row gap-2 items-start w-full">
              <div className="flex flex-wrap gap-1">
                {post.tags?.map((tag) => (
                  <span className="text-gray-600 font-medium text-[0.65rem] leading-3 bg-gray-200 rounded-xl px-2 py-1 tracking-normal block cursor-pointer hover:bg-gray-300 transition-colors duration-200" onClick={() => router.push(`/search?q=${tag}`)}>
                    # {tag}
                  </span>
                ))}
              </div>
            </div>
          }

            {/* Controls */}
            <div className="flex flex-row justify-between items-center">

            <Wrapper className="flex flex-row items-center gap-1">
              <ToggleVote type="post" post={post} />
              <ToggleCart value={false} enabled="Added to cart" disabled="Add to cart" post={post} />
              <ToggleBookmark value={false} enabled="Saved" disabled="Save" post={post} />
            </Wrapper>

              {/* Comments */}
              <div className="flex flex-row gap-1 items-center">
                <MessageCircle className="opacity-70" color="black" size={12} strokeWidth={3} />
                <h6 className="text-gray-800 font-normal text-xs">Message</h6>
              </div>

            </div>
          </div>
          
          <hr />

          <div className="flex flex-row items-center gap-2 w-full" onClick={handleProfileClick}>

            {/* Author Avatar */}
            <Image className="rounded-full cursor-pointer w-9 h-9 object-cover" src={post.author.icon} alt="User Icon" width={36} height={36} />

            <div className="flex flex-col justify-center">
              <div className="flex flex-row gap-0.5 items-center">

                {/* Author Name */}
                <h6 className="text-gray-800 font-medium text-sm leading-4 tracking-tight cursor-pointer hover:underline">
                  {`${post.author.first_name} ${post.author.last_name}`}
                </h6>

                {/* Verified Status */}
                { post.author.is_verified ? (
                  <Image src="/root/verified.svg" width={18} height={18} alt="Verified" />
                ) : (
                  <div className="w-1"></div>
                )}

                {/* Post Type */}
                <span className="bg-gray-200 rounded-full px-1.5 text-black  font-light tracking-wider text-[0.5rem] py-0.5 pt-[0.2rem] leading-[0.5rem]">
                  {ToTitleCase(post.type)}
                </span>

              </div>

              {/* Author Handle */}
              <h6 className="text-gray-500 font-light text-[0.65rem] leading-4 cursor-pointer gap-1 flex flex-row">
                <span className="hover:underline">{`@${post.author.handle}`}</span>•
                <span>{ToRelativeTime(post.posted_at)}</span>
              </h6>

            </div>
          </div>

          <hr />
          
          <div className="flex flex-col gap-4 py-1 max-h-full h-full overflow-auto">
            <div className="flex flex-row justify-between">
              <h6 className="text-gray-800 font-regular text-xs">Comments</h6>
            </div>
            <div className="flex flex-col gap-4 max-h-full overflow-auto no-scrollbar w-full">
              <div className="Home">
                <CommentsProvider>
                <Comment
                  postId={post.id}
                />
                </CommentsProvider>
              </div>
            </div>
          </div>
        </Wrapper>
      </div>
    </main>
  );
};

export default ExpandPostPopup;