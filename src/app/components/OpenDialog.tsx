'use client';

import Image from 'next/image';
import React from "react";
import { useState } from "react";
import Comment from "../components/Comment";
import useNode from "../hooks/useNode";

import { PostInterface } from "@/libraries/interfaces";

interface OpenDialogProps {
  onClose: () => void;
  post: PostInterface | null;
}


const comments = {
  id: 1,
  items: []
};

const OpenDialog: React.FC<OpenDialogProps> = ({ post, onClose }) => {
  const [commentsData, setCommentsData] = useState(comments);

  const { insertNode, editNode, deleteNode } = useNode();

  const handleInsertNode = (folderId, item) => {
    const finalStructure = insertNode(commentsData, folderId, item);
    setCommentsData(finalStructure);
  };

  const handleEditNode = (folderId, value) => {
    const finalStructure = editNode(commentsData, folderId, value);
    setCommentsData(finalStructure);
  };

  const handleDeleteNode = (folderId) => {
    const finalStructure = deleteNode(commentsData, folderId);
    const temp = { ...finalStructure };
    setCommentsData(temp);
  };

  return (
    <main className="text-gray-950 fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50"> 
      <div className="flex flex-row gap-2 w-1/2 h-1/2">
        <Image className="h-full w-[38rem] bg-white rounded-lg" src={post!.images} alt="Images" />
        <div id="rightarea" className="flex flex-col gap-2 h-full w-[18rem">
          <div className="flex flex-col gap-5 bg-white rounded-lg p-6">
            <div className="flex flex-row justify-between">
              <div className="flex flex-row gap-2 cursor-pointer">
                <h6 className="text-gray-950 font-bold text-xs tracking-tighter leading-4">Return to post</h6>
                <Image src="/icons/b-chvrg.svg" alt="Return to post" width={14} height={14} />
              </div>
              <Image src="/icons/b-x.svg" alt="Close" width={14} height={14} onClick={onClose} className="cursor-pointer" />
            </div>
            <div className="flex flex-row gap-2">
              <h1 className="text-gray-950 font-bold text-3xl tracking-tighter leading-4">${post!.price}</h1>
              <div className=" bg-slate-700 rounded-full px-2 py-0.5">
                <h6 className="text-white font-bold text-[0.5rem]">{post!.negotiable ? "NEGOTIABLE" : "FIXED"}</h6>
              </div>
            </div>
            <h1 className="text-gray-950 font-bold text-lg tracking-tighter leading-5">{post!.header}</h1>
            <p className="text-gray-800 font-medium text-sm tracking-tighter leading-5 truncate break h-auto whitespace-pre-line">
					  {post!.description}
				    </p>
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row gap-2">
                <Image src="/icons/b-arrup.svg" alt="Upvote Button" width={14} height={14} className="cursor-pointer"/>  
                <h6 className="text-gray-950 font-bold text-sm tracking-tighter leading-4">{post!.upvotes - post!.downvotes}</h6>
                <Image src="/icons/b-arrdw.svg" alt="Upvote Button" width={14} height={14} className="cursor-pointer" /> 
              </div>
              <div className="flex flex-row gap-2 cursor-pointer">
                <Image src="/icons/b-cart.svg" alt="Add to cart" width={14} height={14} />  
                <h6 className="text-gray-950 font-bold text-sm tracking-tighter leading-4">Add to cart</h6>
              </div>
              <div className="flex flex-row gap-2 cursor-pointer">
                <Image src="/icons/b-share.svg" alt="Share" width={14} height={14} />  
                <h6 className="text-gray-950 font-bold text-sm tracking-tighter leading-4">Share</h6>
              </div>
              <div className="flex flex-row gap-2 cursor-pointer">
                <Image src="/icons/b-msgcrc.svg" alt="Message" width={14} height={14} />  
                <h6 className="text-gray-950 font-bold text-sm tracking-tighter leading-4">Message</h6>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 bg-white rounded-lg p-6">
            <div className="flex flex-row gap-10">
              <div className="flex flex-row gap-2">
                <Image className="rounded-full cursor-pointer" src={post!.user_icon} alt="User Icon" width={40} height={40} />
                <div className="flex flex-col">
                  <div className="flex flex-row">
                    <h6 className="text-gray-950 font-bold text-md tracking-tighter leading-5 cursor-pointer">{post!.user_name}</h6>
                  </div>
                  <div className="flex flex-row">
                    <div className="flex flex-row gap-0.5">
                      <h6 className="text-gray-500 font-bold text-xs tracking-tighter leading-4 cursor-pointer">{post!.user_handle}</h6>
                      <span className="text-black font-extrabold text-[0.5rem] bg-gray-300 rounded-xl px-2 py-0.5 tracking-normal ml-2">SELLER</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex flex-row items-center gap-2">
                  <Image src="/icons/b-map-t.svg" alt="Location" width={12} height={12} />
                  <h6 className="text-gray-800 font-bold text-xs tracking-tighter leading-4">[User location]</h6>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <Image src="/icons/b-box.svg" alt="Delivery Method" width={12} height={12} />
                  <h6 className="text-gray-800 font-bold text-xs tracking-tighter leading-4">[User MOD]</h6>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-2 bg-white rounded-lg p-6">
            <div className="flex flex-row justify-between">
              <h6 className="text-gray-950 font-bold text-sm tracking-tighter leading-4">Comments</h6>
              <Image src="/icons/b-filter.svg" alt="Filter" width={14} height={14} className="cursor-pointer" />
            </div>
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
    </main>
  );
};

export default OpenDialog;