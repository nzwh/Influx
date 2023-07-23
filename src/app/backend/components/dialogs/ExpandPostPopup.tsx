'use client';

import React, { useRef, useState, useEffect } from "react";
import Image from 'next/image';

import useModal from "@/src/app/backend/hooks/useModal";
import useMonetaryFormatter from "@/src/app/backend/hooks/useMonetaryFormatter";
import useRelativeDateFormatter from "@/src/app/backend/hooks/useRelativeDateFormatter";
import useNode from "@/src/app/backend/hooks/useNode";
import Comment from "@/src/app/backend/components/utilities/Comment";
import VoteMechanism from "@/src/app/backend/components/utilities/VoteMechanism";
import Action from "@/src/app/backend/components/utilities/Action";

import { Post as PostInterface } from "@/libraries/structures";
import { MessageSquare, Share2, ShoppingBag, Filter, X, MapPin, Package } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  post: PostInterface;
}

const comments = {
  id: 1,
  items: []
};

const ExpandPostPopup: React.FC<Props> = ({ post, isOpen, onClose }) => {

  const { modalRef, handleClickOutside } = useModal({ isOpen: isOpen, onClose: onClose });
  const convertToMonetary = useMonetaryFormatter();
  const convertToRelativeDate = useRelativeDateFormatter();
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
      className="text-gray-950 fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50"
      ref={modalRef} onClick={handleClickOutside}
    > 
      <div className="flex flex-row gap-2 h-[72%] z-50">

        {post.media && post.media.length > 0 && (
          <Image className="h-full w-auto bg-white rounded-sm" src={post.media[0]} alt="Images" width={0} height={0} sizes="100%" />
        )}
              
        <div id="rightarea" className="flex flex-col gap-2 h-full w-[22rem] bg-white rounded-sm p-6">

          <div className="flex flex-col gap-2 py-1">
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row items-center gap-2">
                <Image className="rounded-full" src={post.origin.icon} alt="Shop Icon" width={16} height={16} />
                <h6 className="text-gray-800 font-medium text-[0.65rem]">{post.origin.name}</h6>
                <h6 className="text-gray-500 font-normal text-[0.65rem]">{`@c/${post.origin.handle}`}</h6>
              </div>
              <X className="cursor-pointer" color="black" size={14} strokeWidth={3} onClick={onClose} />
            </div>

            <div className="flex flex-row gap-2 items-start">
              <h1 className="text-gray-800 font-regular text-3xl tracking-tight">{convertToMonetary(post.price || 0)}</h1>
              <div className="bg-gray-800 rounded-full px-2 mt-[0.4rem] py-0.5">
                <h6 className="text-white font-medium text-[0.5rem]">{post.is_open ? "NEGOTIABLE" : "FIXED"}</h6>
              </div>
            </div>

            <h1 className="text-gray-800 font-regular text-md tracking-tight leading-5">
              {post.title}
              <span className="text-white font-light tracking-wide text-[0.625rem] bg-gray-800 relative top-[-0.15rem] rounded-full px-2 py-1 ml-2">{post.condition}</span>
            </h1> 
            <p className="text-gray-800 font-light text-xs truncate break h-auto whitespace-pre-line">
					  {post.description}
				    </p>

            {(post.tags?.length === 0) ? <></> : 
              <div className="flex flex-row gap-2 items-start w-full">
                <div className="flex flex-wrap gap-2">
                  {post.tags?.map((tag) => (
                    <span className="text-gray-600 font-medium text-[0.65rem] leading-3 bg-gray-200 rounded-xl px-2 py-1 tracking-normal block"># {tag}</span>
                  ))}
                </div>
              </div>
            }

            <div className="flex flex-row items-center justify-between pt-2">
              <div className="flex flex-row items-center gap-3">
                <VoteMechanism post={post} />

                <div className="flex flex-row gap-1 cursor-pointer items-center">
                  <Share2 className="opacity-70" color="black" size={12} strokeWidth={3}/>
                  <h6 className="text-gray-800 font-regular text-xs">Share</h6>
                </div>

                <div className="flex flex-row gap-1 cursor-pointer items-center">
                  <ShoppingBag className="opacity-70" color="black" size={12} strokeWidth={3}/>
                  <h6 className="text-gray-800 font-regular text-xs">Add to cart</h6>
                </div>
              </div>

              <div className="flex flex-row gap-1 cursor-pointer items-center">
                <MessageSquare className="opacity-70" color="black" size={12} strokeWidth={3}/>
                <h6 className="text-gray-800 font-regular text-xs">Message</h6>
              </div>
            </div>
          </div>

          <div className="w-full h-[2px] bg-gray-500 opacity-30"></div>

          <div className="flex flex-row w-full py-1 items-center gap-3">
            <div className="flex flex-row items-center gap-2">
              <Image className="rounded-full" src={post.author.icon} alt="User Icon" width={36} height={36} />
              <div className="flex flex-col justify-center">
                <h6 className="text-gray-800 font-medium text-sm leading-4 tracking-tight">{`${post.author.first_name} ${post.author.last_name}`}</h6>
                <h6 className="text-gray-500 font-regular text-xs leading-4">{convertToRelativeDate(post.posted_at.toLocaleString())}&ensp;•&ensp;{`@${post.author?.handle}`}</h6>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="ml-2">
                <h6 className="text-gray-600 font-medium text-xs tracking-tighter leading-4 flex items-center">
                  <MapPin size={12} strokeWidth={3} className="mr-1" /> Located at
                </h6>
                <div className="text-gray-600 font-medium text-xs tracking-tighter leading-4 flex items-center">
                  <span className="break-words">{post.author.location}</span>
                </div>
              </div>
              <div className="ml-2">
                <h6 className="text-gray-600 font-medium text-xs tracking-tighter leading-4 flex items-center">
                  <Package size={12} strokeWidth={3} className="mr-1" /> Delivers using
                </h6>
                {(post.author.delivery_methods.length === 0) ? (
                  <></>
                ) : (
                  <div className="text-gray-600 font-medium text-xs tracking-tighter leading-4 flex items-center">
                    <span className="break-words">
                      {post.author.delivery_methods.map((delivery_method, index) => (
                        <React.Fragment key={index}>
                          {delivery_method}
                          {index !== post.author.delivery_methods.length - 1 ? ', ' : ''}
                        </React.Fragment>
                      ))}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="w-full h-[2px] bg-gray-500 opacity-30"></div>
          
          <div className="flex flex-col gap-4 py-1 max-h-full h-full overflow-auto">
            <div className="flex flex-row justify-between">
              <h6 className="text-gray-800 font-regular text-xs">Comments</h6>
              <Filter className="opacity-70" color="black" size={12} strokeWidth={3}/>
            </div>
            <div className="flex flex-col gap-4 max-h-full overflow-auto no-scrollbar w-full">
              <div className="Home">
                <Comment 
                  handleInsertNode={handleInsertNode} 
                  handleEditNode={handleEditNode}
                  handleDeleteNode={handleDeleteNode} 
                  comment={commentsData}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ExpandPostPopup;