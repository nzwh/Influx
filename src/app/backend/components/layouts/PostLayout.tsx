"use client" // * Uses interactable components

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Layouts
import Popover from '@/src/app/backend/components/layouts/PopoverLayout';
import Panel from '@/src/app/backend/components/layouts/PanelLayout';
import Wrapper from '@/src/app/backend/components/layouts/WrapperLayout';

// Panels & Popups
import ExpandPostPopup from '@/src/app/backend/components/dialogs/ExpandPostPopup';

// Hooks & Classes
import { PostClass } from "@/libraries/structures";
import { ToTitleCase, ToRelativeTime, ToMonetary } from '@/src/app/backend/hooks/ToConvert';
import { useGlobalContext } from '@/src/app/backend/hooks/GlobalContext';

// Icons
import { Bookmark, Focus, MessageCircle, MoreHorizontal, Pencil, ShoppingBag, Trash2 } from 'lucide-react';

// TODO
import useNavigateToProfile from '@/src/app/backend/hooks/useNavigateToProfile';
import ToggleVote from '@/src/app/backend/components/utilities/ToggleVote';
import ToggleBookmark from '@/src/app/backend/components/utilities/ToggleBookmark';
import ToggleCart from '@/src/app/backend/components/utilities/ToggleCart';

interface Props {
  p_post: PostClass;
  userId: string;
}

const PostTemplate: React.FC<Props> = ({ p_post, userId }) => {

  const router = useRouter();

  const { user } = useGlobalContext();
  const post = new PostClass(p_post);

  const navigateToProfile = useNavigateToProfile();
  const handleProfileClick = () => {
    navigateToProfile(post.author.handle);
  };

  const [selectedPost, setSelectedPost] = useState<PostClass>();
  const handleExpandPostOpen = (post: PostClass) => {
    setSelectedPost(post);
    setIsExpandPostOpen(true);
  };

  const [isExpandPostOpen, setIsExpandPostOpen] = useState(false);
  const handleExpandPostClose = () => {
    setIsExpandPostOpen(false);
  };

  const [isEditPostOpen, setIsEditPostOpen] = useState(false);
  const handleEditPostOpen = (post_id: number) => {
    setIsEditPostOpen(true);
  };
  const handleEditPostClose = () => {
    setIsEditPostOpen(false);
  };

  const [isDeletePostDialogOpen, setIsDeletePostDialogOpen] = useState(false);
  const handleDeletePostDialogOpen = (post_id: number) => {
    setIsDeletePostDialogOpen(true);
  };
  const handleDeletePostDialogClose = () => {
    setIsDeletePostDialogOpen(false);
  };

  // TODO: Handle delete and edit using hooks

	return (
    <Panel classes="flex-col p-4 gap-4">

      {/* Header */}
      <div className="flex flex-row justify-between">
        <div className="flex flex-col gap-3 w-full">

          <div className="flex flex-row items-center gap-2">

            {/* Community Avatar */}
            <Image className="rounded-full" src={post.origin.icon} alt="Shop Icon" width={16} height={16} />

            {/* Community Details */}
            <h6 className="text-gray-800 font-medium text-[0.65rem]">{post.origin.name}</h6>
            <h6 className="text-gray-500 font-normal text-[0.65rem]">{`@c/${post.origin.handle}`}</h6>
            
          </div>
          
          <div className="flex flex-row items-center gap-2 w-full" onClick={handleProfileClick}>

            {/* Author Avatar */}
            <Image  className="rounded-full cursor-pointer" src={post.author.icon} alt="User Icon" width={36} height={36} />

            <div className="flex flex-col justify-center w-full">
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
        </div>

        <div className="flex flex-row items-center h-fit mt-1 mr-1 gap-3">

          {/* Open */}
          { post.type === "selling" ? (
            <span className="text-white font-light tracking-wider text-[0.5rem] bg-slate-500 rounded-full px-1.5 py-0.5 pt-[0.2rem] leading-[0.5rem]">
              {post.is_open ? "NEGOTIABLE" : "FIXED"}
            </span>
          ) : null}

          {/* Price */}
          { post.type === "selling" ? (
            <h1 className="text-gray-950 font-normal text-xl tracking-tight leading-4">{ToMonetary(post.price || 0)}</h1>
          ) : post.type === "buying" ? (
            <div className="flex flex-row gap-2 items-center">
            <h1 className="text-gray-950 font-normal text-xl tracking-tight leading-4">{ToMonetary(post.range_start || 0)}</h1>
            <h1 className="text-gray-950 font-normal text-[0.625rem]">to</h1>
            <h1 className="text-gray-950 font-normal text-xl tracking-tight leading-4">{ToMonetary(post.range_end || 0)}</h1>
            </div>
          ) : null }

          {/* More */}
          { post.author.uuid === user.uuid ? (
            <Popover classes={"top-4 z-[45]"} 
              trigger={
                <MoreHorizontal className="opacity-70 cursor-pointer relative" color="black" size={12} strokeWidth={3} />
              }
              elements={[
                ["Edit", <Pencil size={12} strokeWidth={3}/>, () => handleEditPostOpen(post.id)],
                ["Delete", <Trash2 size={12} strokeWidth={3}/>, () => handleDeletePostDialogOpen(post.id)]
              ]} 
            />
          ) : null }

        </div>
      </div>

      <Wrapper>
        <div className="flex flex-col gap-2 cursor-pointer" onClick={() => { handleExpandPostOpen(post) }}>

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

          {/* Description */}
          <p className="text-gray-800 font-light text-sm tracking-tight leading-4 truncate break h-auto whitespace-pre-line">
            {post.description.trim()}
          </p>

        </div>

        {isExpandPostOpen && selectedPost && (
          <ExpandPostPopup post={selectedPost} onClose={handleExpandPostClose} />
        )}
      </Wrapper>

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
      
      {/* Media */}
      { post.media && post.media.length >= 1 && !post.media.includes("") ? (
        <Wrapper className="relative w-full h-full rounded-sm cursor-pointer overflow-hidden">
          
          <Image className="w-full h-full text-xs" src={post.media[0]} alt="Media" width={0} height={0} sizes="100vw" priority={false} />

          <div className="absolute top-0 left-0 w-full h-full rounded-sm bg-black opacity-0 hover:opacity-20 transition-all duration-300" onClick={() => { handleExpandPostOpen(post) }}></div>

          { post.media.length > 1 ? (
            <div className="absolute right-4 top-4 bg-black bg-opacity-20 px-2 rounded-sm flex flex-row gap-1 items-center py-1 ">
              <Focus className="text-white" color="white" size={10} strokeWidth={2} />
              <h6 className="text-white font-light text-[0.5rem] leading-3">{post.media.length} photos</h6>
            </div>
          ) : null }
          
        </Wrapper>
      ) : null }

      {/* Controls */}
      <div className="flex flex-row justify-between items-center">
        
        <Wrapper className="flex flex-row items-center gap-1">
          <ToggleVote type="post" post={post} />
          <ToggleCart value={true} name="interested" post={post} />
          <ToggleBookmark value={true} name="bookmarks" post={post} />
        </Wrapper>

        {/* Comments */}
        <Wrapper className="flex flex-row gap-1 items-center">
          <MessageCircle className="opacity-70" color="black" size={12} strokeWidth={3} />
          <h6 className="text-gray-800 font-normal text-xs">{post.comments?.length || 0} comments</h6>
        </Wrapper>
        
      </div>
    </Panel>
	);
};
  
export default PostTemplate;