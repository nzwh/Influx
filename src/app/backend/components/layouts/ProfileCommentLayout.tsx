import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import useRelativeDateFormatter from "@/src/app/backend/hooks/useRelativeDateFormatter";

import { CommentClass, PostClass, UserClass } from '@/libraries/structures';

interface Props {
  comment: CommentClass;
  post: PostClass;
}

const ProfileCommentTemplate: React.FC<Props> = ({ comment, post = {} }) => {

  const convertToRelativeDate = useRelativeDateFormatter();

  return (
    <main>
      <div className="flex flex-col justify-center gap-1">
        <div className="flex flex-row items-center gap-1">
          <Image className="rounded-full" src={post.origin?.icon ?? '/avatars/temp.jpg'} alt="Shop Icon" width={10} height={10} />
          <h6 className="text-gray-800 font-regular text-[0.65rem] leading-3">{post.origin?.name}</h6>
          <h6 className="text-gray-500 font-regular text-[0.65rem] leading-3">{`@c/${post.origin?.handle}`}&ensp;•&ensp;{convertToRelativeDate(comment.posted_at.toLocaleString())}</h6>
        </div>
        <h6 className="text-gray-800 font-regular text-sm tracking-tight leading-4">{comment.content}</h6>
        <h6 className="text-gray-400 font-light text-[0.65rem] leading-3">Commented on {`@${post?.author?.handle}`} listing “{post?.title}”</h6>
      </div>
    </main>
  );
};
  
export default ProfileCommentTemplate;
