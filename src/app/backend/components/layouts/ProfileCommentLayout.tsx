// 'use server'

import React from 'react';
import Image from 'next/image';

// Hooks & Classes
import { CommentClass, PostClass } from '@/libraries/structures';
import { useToRelativeTime } from '@/src/app/backend/hooks/useToConvert';

interface Props {
  comment: CommentClass;
  post: PostClass;
}

const ProfileCommentLayout: React.FC<Props> = ({ comment, post }) => {

  return (
    <main className="flex flex-col justify-center gap-1">

      <div className="flex flex-row items-center gap-1">
        <Image className="rounded-full" src={post.origin?.icon ?? '/avatars/temp.jpg'} alt="Shop Icon" width={10} height={10} />
        <h6 className="text-gray-800 font-regular text-[0.65rem] leading-3">{post.origin.name}</h6>
        <h6 className="text-gray-500 font-regular text-[0.65rem] leading-3">{`@c/${post.origin.handle}`}&ensp;•&ensp;{useToRelativeTime(comment.posted_at)}</h6>
      </div>
      <h6 className="text-gray-800 font-regular text-sm tracking-tight leading-4">{comment.content}</h6>
      <h6 className="text-gray-400 font-light text-[0.65rem] leading-3">Commented on {`@${post.author.handle}`} listing “{post?.title}”</h6>

    </main>
  );
};
  
export default ProfileCommentLayout;
