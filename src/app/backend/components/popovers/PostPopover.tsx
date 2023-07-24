import React from 'react';

import Popover from '@/src/app/backend/components/template/PopoverTemplate';
import { Pencil, Trash2 } from 'lucide-react';

interface Props {
  handleEditPost: () => void;
  handleDeletePost: () => void;
}

const PostPopover: React.FC<Props> = ({ handleEditPost, handleDeletePost}) => {
  return (
    <Popover classes="top-10">
      <div className="text-gray-600 flex flex-row gap-2 items-center hover:bg-gray-200 py-1 px-2 justify-start cursor-pointer select-none transition-colors duration-200" onClick={handleEditPost}>
        <Pencil size={12} strokeWidth={3}/>
        <h6 className="text-xs font-normal">Edit post</h6>
      </div>
      <div className="text-gray-600 flex flex-row gap-2 items-center hover:bg-gray-200 py-1 px-2 justify-start cursor-pointer select-none transition-colors duration-200" onClick={handleDeletePost}>
        <Trash2 size={12} strokeWidth={3}/>
        <h6 className="text-xs font-normal">Delete post</h6>
      </div>
    </Popover>
  )
}
export default PostPopover;