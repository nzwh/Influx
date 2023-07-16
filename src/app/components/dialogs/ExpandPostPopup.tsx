'use client';

import React, { useState } from "react";
import Image from 'next/image';

import Comment from "@/src/app/components/utilities/Comment";
import useNode from "@/src/app/hooks/useNode";
import VoteMechanism from "@/src/app/components/utilities/VoteMechanism";
import Action from "@/src/app/components/utilities/Action";

import { Post } from "@/libraries/structures";
import { ChevronRight, MessageSquare, Share2, ShoppingBag, Sparkles, X } from 'lucide-react';

interface Props {
  onClose: () => void;
  post: Post;
}

const comments = {
  id: 1,
  items: []
};

const ExpandPostPopup: React.FC<Props> = ({ post, onClose }) => {
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

  return (
    <main className="text-gray-950 fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50"> 
      <div className="flex flex-row gap-2 h-[72%]">

        {post.media.length > 0 && (
          <Image className="h-full w-auto bg-white rounded-sm" src={post.media[0]} alt="Images" width={0} height={0} sizes="100%" />
        )}
              
        <div id="rightarea" className="flex flex-col gap-2 h-full w-[22rem]">

          <div className="flex flex-col gap-2 bg-white rounded-sm p-6">
            <div className="flex flex-row justify-between items-center cursor-pointer" onClick={onClose}>
              <div className="flex flex-row gap-2">
                <h6 className="text-gray-800 font-regular text-xs">Return to post</h6>
                <ChevronRight className="opacity-70" color="black" size={14} strokeWidth={3}/>
              </div>
              <X className="opacity-70" color="black" size={14} strokeWidth={3}/>
            </div>

            <div className="flex flex-row gap-2 items-start">
              <h1 className="text-gray-800 font-regular text-3xl tracking-tight">{convertToMonetary(post!.price)}</h1>
              <div className=" bg-slate-700 rounded-full px-2 mt-[0.4rem] py-0.5">
                <h6 className="text-white font-medium text-[0.5rem]">{post.open ? "NEGOTIABLE" : "FIXED"}</h6>
              </div>
            </div>

            <h1 className="text-gray-800 font-regular text-md tracking-tight leading-5">{post.title}</h1>
            <p className="text-gray-800 font-light text-xs truncate break h-auto whitespace-pre-line">
					  {post.description}
				    </p>

            <div className="flex flex-row items-center justify-between pt-2">
              <VoteMechanism post={post} />

              <div className="flex flex-row gap-1 cursor-pointer items-center">
                <ShoppingBag className="opacity-70" color="black" size={12} strokeWidth={3}/>
                <h6 className="text-gray-800 font-regular text-xs">Add to cart</h6>
              </div>

              <div className="flex flex-row gap-1 cursor-pointer items-center">
                <Share2 className="opacity-70" color="black" size={12} strokeWidth={3}/>
                <h6 className="text-gray-800 font-regular text-xs">Share</h6>
              </div>

              <div className="flex flex-row gap-1 cursor-pointer items-center">
                <MessageSquare className="opacity-70" color="black" size={12} strokeWidth={3}/>
                <h6 className="text-gray-800 font-regular text-xs">Message</h6>
              </div>
            </div>
          </div>

          <div className="flex flex-row w-full bg-white rounded-sm px-6 py-4 gap-2">
            <Image className="rounded-full" src={post.author.icon} alt="User Icon" width={36} height={36} />
            <div className="flex flex-col justify-center">
              <h6 className="text-gray-800 font-medium text-md leading-4 tracking-tight">{`${post.author.first_name} ${post.author.last_name}`}</h6>
              <h6 className="text-gray-500 font-regular text-xs leading-4">{post.author.handle}<span className="text-gray-600 bg-gray-200 font-regular text-[0.5rem] relative top-[-0.05rem] tracking-wider rounded-xl px-1.5 py-0.5 ml-2">VERIFIED</span></h6>
            </div>
          </div>
          
          <div className="flex flex-col gap-4 max-h-full h-full overflow-auto bg-white rounded-sm px-6 py-4">
            <div className="flex flex-row justify-between">
              <h6 className="text-gray-800 font-regular text-xs">Comments</h6>
              <Sparkles className="opacity-70" color="black" size={12} strokeWidth={3}/>
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