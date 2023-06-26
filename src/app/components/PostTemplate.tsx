"use client"

import Image from 'next/image';
import React, { useState, useEffect } from 'react';

import PostOpen from '@/src/app/components/PostOpen';

import { PostInterface } from "@/libraries/interfaces";
import { ArrowDown, ArrowUp, MessageCircle, MoreHorizontal, Share2, ShoppingBag } from 'lucide-react';

const PostTemplate: React.FC<PostInterface> = ({ shop_icon, shop_name, shop_handle, user_icon, user_name, user_handle, timestamp, price, negotiable, header, description, condition, tags, images, upvotes, downvotes, shares, interested, comments }) => {

  const post: PostInterface = {
    shop_icon: shop_icon, 
    shop_name: shop_name,
    shop_handle: shop_handle,
    user_icon: user_icon,
    user_name: user_name,
    user_handle: user_handle,
    timestamp: timestamp,
    price: price,
    negotiable: negotiable,
    header: header,
    description: description,
    condition: condition,
    tags: tags,
    images: images,
    upvotes: upvotes,
    downvotes: downvotes,
    shares: shares,
    interested: interested,
    comments: comments,
  };
  
  const [isPostOpenOpen, setIsPostOpenOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<PostInterface | null>(null);

  const handlePostOpenOpen = (post: PostInterface) => {
    setSelectedPost(post);
    setIsPostOpenOpen(true);
  };

  const handlePostOpenClose = () => {
    setSelectedPost(null);
    setIsPostOpenOpen(false);
  };
  
  tags.sort(function(a, b){return b.length - a.length});

	return (
		<main>
			<article className="bg-white flex flex-col w-full rounded-sm p-4 gap-3 overflow-visible">
				<div className="flex flex-row justify-between">
					<div className="flex flex-col gap-3">
					<div className="flex flex-row items-center gap-2">
						<Image className="rounded-full" src={shop_icon} alt="Shop Icon" width={16} height={16} />
						<h6 className="text-gray-800 font-medium text-[0.65rem]">{shop_name}</h6>
						<h6 className="text-gray-500 font-regular text-[0.65rem]">{shop_handle}</h6>
					</div>
					
					<div className="flex flex-row items-center gap-2">
						<Image className="rounded-full" src={user_icon} alt="User Icon" width={36} height={36} />
						<div className="flex flex-col justify-center">
							<h6 className="text-gray-800 font-medium text-md leading-4 tracking-tight">{user_name}</h6>
							<h6 className="text-gray-500 font-regular text-[0.65rem] leading-4">{user_handle}&ensp;•&ensp;{timestamp}</h6>
						</div>
					</div>
					</div>

					<div className="flex flex-row items-start mt-1 mr-1">
					<div className="flex flex-row items-center gap-3">
						<div className="bg-gray-800 rounded-full px-2 py-0.5">
							<h6 className="text-white font-semibold tracking-wider text-[0.5rem] leading-3">{negotiable ? "NEGOTIABLE" : "FIXED"}</h6>
						</div>
						<h1 className="text-gray-950 font-regular text-2xl tracking-tight leading-4">${price}</h1>
						<MoreHorizontal color="black" size={12} className="cursor-pointer" />
					</div>
					</div>
				</div>

				<div className="flex flex-col gap-2 cursor-pointer" onClick={() => {
          handlePostOpenOpen(post);
        }}>
				<h1 className="text-gray-950 font-regular text-lg tracking-tight leading-5 truncate break h-auto whitespace-pre-line">
					{header}
					<span className="text-white font-extralight tracking-wide text-[0.7rem] bg-gray-400 relative top-[-0.1rem] rounded-md px-1.5 py-0.5 ml-2">{condition}</span>
				</h1>
				<p className="text-gray-800 font-light text-sm tracking-tight leading-4 truncate break h-auto whitespace-pre-line">
					{description}
				</p>
				</div>

        {isPostOpenOpen && (
              <PostOpen post={selectedPost} onClose={handlePostOpenClose} />
        )}

				{(tags.length === 0) ? <></> : 
					<div className="flex flex-row gap-2 items-start w-full">
						<div className="flex flex-wrap gap-1">
							{tags.map((tag) => (
								<span className="text-gray-600 font-light	 text-[0.65rem] leading-3 bg-gray-200 rounded-xl px-2 py-[0.2rem] tracking-normal block"># {tag}</span>
							))}
						</div>
					</div>
				}
				
				{(images.length == 0) ? <></> :
					<Image className="w-full h-full rounded-sm" src={images[0]} alt="Media" width={0} height={0} sizes="100vw" />
				}
			
				<div className="flex flex-row justify-between items-center">
					<div className="flex flex-row items-center gap-4">
					<div className="flex flex-row gap-1 items-center">
						<ArrowUp className="opacity-70" color="black" size={14} strokeWidth={3}/>
						<h6 className="text-gray-800 font-regular text-xs">{upvotes - downvotes}</h6>
						<ArrowDown className="opacity-70" color="black" size={14} strokeWidth={3}/>
					</div>

					<div className="flex flex-row gap-1 items-center">
						<Share2 className="opacity-70" color="black" size={12} strokeWidth={3} /> 
						<h6 className="text-gray-800 font-regular text-xs">{shares} shares</h6>
					</div>
					<div className="flex flex-row gap-1 items-center">
						<ShoppingBag className="opacity-70" color="black" size={12} strokeWidth={3} />  
						<h6 className="text-gray-800 font-regular text-xs">{interested} interested</h6>
					</div>
					<MoreHorizontal className="opacity-70" color="black" size={12} strokeWidth={3} /> 
					</div>

					<div className="flex flex-row gap-1 items-center">
						<MessageCircle className="opacity-70" color="black" size={12} strokeWidth={3} />
						<h6 className="text-gray-800 font-regular text-xs">{comments} comments</h6>
					</div>
				</div>
			</article>
		</main>
	);
};
  
export default PostTemplate;