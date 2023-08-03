'use client';

import React, { useRef, useState, useEffect } from "react";
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import useNavigateToProfile from '@/src/app/backend/hooks/useNavigateToProfile';
import OutsideClick from '@/src/app/backend/hooks/OutsideClick';
import useMonetaryFormatter from "@/src/app/backend/hooks/useMonetaryFormatter";
import useRelativeDateFormatter from "@/src/app/backend/hooks/useRelativeDateFormatter";
// import useFetchPost from "@/src/app/backend/hooks/useFetchPost";
import useNode from "@/src/app/backend/hooks/useNode";
import Comment from "@/src/app/backend/components/utilities/CommentSection";
import VoteMechanism from "@/src/app/backend/components/utilities/VoteMechanism";

import { PostInterface } from "@/libraries/structures";
import { MessageSquare, Share2, ShoppingBag, Filter, X, MapPin, Package, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { PostClass } from "@/libraries/structures";
import { useGlobalContext } from '@/src/app/backend/hooks/GlobalContext';
import Wrapper from '@/src/app/backend/components/layouts/WrapperLayout';
import { ToTitleCase, ToRelativeTime, ToMonetary } from '@/src/app/backend/hooks/ToConvert';
import Carousel from "../layouts/ImageCarousel";

interface Props {
  post: PostClass;
  onClose: () => void;
}

const comments = {
  id: 1,
  items: []
};

const ExpandPostPopup: React.FC<Props> = ({ post, onClose }) => {

  // Export posts from global context
  const { user } = useGlobalContext();
  post = new PostClass(post);

  // Allow outside click to close modal
  const modalRef = useRef<HTMLDivElement | null>(null);
  OutsideClick(modalRef, onClose);

  const navigateToProfile = useNavigateToProfile();
  const handleProfileClick = () => {
    navigateToProfile(post.author.handle);
  };

  // TODO: Turn into component @shiopao
  const [commentsData, setCommentsData] = useState(comments);
  const { insertNode, editNode, deleteNode } = useNode();
  const handleInsertNode = (folderId: any, item: any) => {
    const finalStructure = insertNode(commentsData, folderId, item);
    setCommentsData(finalStructure);
  };
  const handleEditNode = (folderId: any, value: any) => {
    const finalStructure = editNode(commentsData, folderId, value);
    setCommentsData(finalStructure);
  };
  const handleDeleteNode = (folderId: any) => {
    const finalStructure = deleteNode(commentsData, folderId);
    const temp = { ...finalStructure };
    setCommentsData(temp);
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
              <span className="text-white font-normal tracking-wide text-[0.5rem] bg-gray-800 rounded-full px-2 py-0.5 pt-[0.2rem] leading-3">
                {post.is_open ? "NEGOTIABLE" : "FIXED"}
              </span>
            ) : null}
          </div>
          )}
          
          <div className="flex flex-col gap-2 cursor-pointer">

          {/* Title */}
          <h1 className="text-gray-950 font-normal text-lg tracking-tight leading-[1.375rem] truncate break h-auto whitespace-pre-line">
            {post.title}

            {/* Condition */ }
            {post.type === "selling" ? (
            <span className="text-white font-light tracking-wide text-[0.625rem] bg-gray-800 relative top-[-0.15rem] rounded-full px-2 py-1 ml-2 whitespace-nowrap">
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
                  <span className="text-gray-600 font-medium text-[0.65rem] leading-3 bg-gray-200 rounded-xl px-2 py-1 tracking-normal block"># {tag}</span>
                ))}
              </div>
            </div>
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
          </div>
          
          <hr />

          <div className="flex flex-row items-center gap-2 w-full">

            {/* Author Avatar */}
            <Image onClick={handleProfileClick} className="rounded-full cursor-pointer" src={post.author?.icon || ""} alt="User Icon" width={36} height={36} />

            <div className="flex flex-col justify-center w-full">
              <div className="flex flex-row gap-0.5 items-center">

                {/* Author Name */}
                <h6 onClick={handleProfileClick} className="text-gray-800 font-medium text-base leading-4 tracking-tight cursor-pointer">
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

          <hr />
          
          <div className="flex flex-col gap-4 py-1 max-h-full h-full overflow-auto">
            <div className="flex flex-row justify-between">
              <h6 className="text-gray-800 font-regular text-xs">Comments</h6>
            </div>
            <div className="flex flex-col gap-4 max-h-full overflow-auto no-scrollbar w-full">
              <div className="Home">
                <Comment
                  postId={post.id}
                  handleInsertNode={handleInsertNode} 
                  handleEditNode={handleEditNode}
                  handleDeleteNode={handleDeleteNode} 
                  comment={commentsData}
                />
              </div>
            </div>
          </div>
        </Wrapper>
      </div>
    </main>
  );
};

export default ExpandPostPopup;