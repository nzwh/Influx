import React from 'react';
import Image from 'next/image';

import useRelativeDateFormatter from "@/src/app/backend/hooks/useRelativeDateFormatter";
import Popover from '@/src/app/backend/components/layouts/PopoverLayout';

import { CommentInterface, UserInterface } from '@/libraries/structures';
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';

import { useGlobalContext } from '@/src/app/backend/hooks/GlobalContext';
import Supabase from '@/src/app/backend/model/supabase';

interface Props {
  comment: CommentInterface;
  onDelete: (postId: number) => void;
  onEdit: (postId: number) => void;
}

const CommentTemplate: React.FC<Props> = ({ comment }) => {

  const convertToRelativeDate = useRelativeDateFormatter();

  return (
    <div>
      <div className="flex flex-row gap-10">
        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex-row items-start gap-2">
            <Image className="rounded-full cursor-pointer mt-0.5" src="/avatars/temp.jpg" alt="User Icon" width={28} height={28} />
            <div className="flex flex-col w-full">
              <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-2">
                  <h6 className="text-gray-800 font-regular text-xs cursor-pointer">{`${comment.author?.first_name} ${comment.author?.last_name}`}</h6>
                  <h6 className="text-gray-500 font-light text-xs">{convertToRelativeDate(comment.posted_at.toLocaleString())}</h6>
                </div>
                <div>
                  {editMode ? (
                    <></>
                  ) : (
                    <>
                    <div className="flex flex-row gap-2">
                      <Popover classes={"top-4 z-[45]"} 
                        trigger={
                          <MoreHorizontal className="opacity-70 cursor-pointer relative" color="black" size={12} strokeWidth={3} />
                        }
                        elements={[
                          ["Edit", <Pencil size={12} strokeWidth={3}/>, () => handleEdit(post.id)],
                          ["Delete", <Trash2 size={12} strokeWidth={3}/>, () => handleDelete(post.id)]
                        ]} 
                      />
                      {/*
                      <h6 className="text-gray-800 font-regular text-xs cursor-pointer">
                        <Action className="reply" type="E" handleClick={() => {
                          setEditMode(true);
                        }} 
                        />
                      </h6>
                      <h6 className="text-gray-800 font-regular text-xs cursor-pointer">
                        <Action className="reply" type="D" handleClick={handleDelete}/>
                      </h6>*/}
                    </div>
                    </>
                  )}
                </div>    
              </div>
              <p className="text-gray-800 font-light text-xs word-wrap">
              <span 
                contentEditable={editMode} 
                suppressContentEditableWarning={editMode}
                style={{ wordWrap: "break-word" }}
                ref={inputRef}
              >
                {comment.content}
              </span>
              </p>
            </div>
          </div>
          <div className="flex flex-row items-center gap-2 ">
            {editMode ? (
            <>
            <h6 className="text-gray-800 font-regular text-xs cursor-pointer">
              <Action className="reply" type="Save" handleClick={onAddComment}/>
            </h6>
            <h6 className="text-gray-800 font-regular text-xs cursor-pointer">
              <Action className="reply" type="Cancel" handleClick={() => {
                if (inputRef.current)
                  inputRef.current.innerText = comment.name;
                setEditMode(false);
            }} />
            </h6>
            </>
            ) : (
            <>
            <div className="flex flex-row gap-1">
              <ArrowUp className="opacity-70 cursor-pointer" color="black" size={14} strokeWidth={3} onClick={upvote}/>
              <h6 className="text-gray-800 font-regular text-xs">{comment.upvotes.length - comment.downvotes.length}</h6>
              <ArrowDown className="opacity-70 cursor-pointer" color="black" size={14} strokeWidth={3} onClick={downvote}/>
            </div>
            <div className="flex flex-row gap-1 cursor-pointer">
              <Reply className="opacity-70 cursor-pointer" color="black" size={14} strokeWidth={3} onClick={upvote}/>
              <h6 className="text-gray-800 font-regular text-xs">
                <Action className="reply" type="Reply" handleClick={handleNewComment}/>
              </h6>
            </div>
            </>
            )}
          </div>
        </div>
      </div>

      <div className="pt-2 pb-2 pl-2">
        {showInput && (
          <div className="inputContainer">
            <div className= "flex flex-row items-center rounded-lg w-auto">
              <Image className="rounded-full" src="/avatars/temp.jpg" alt="User Icon" width={24} height={24} />
              <input 
                type="text" 
                className="inputContainer__input first_input font-extralight text-xs p-2" 
                autoFocus value={input} 
                onChange={(e) => setInput(e.target.value)} 
                placeholder="Reply to comment..."
              />
            </div>
            <div className="flex flex-row items-center gap-2">
              <h6 className="text-gray-800 font-regular text-xs cursor-pointer">
                <Action className="reply" type="Reply" handleClick={onAddComment} />
              </h6>
              <h6 className="text-gray-800 font-regular text-xs cursor-pointer">
                <Action className="reply" type="Cancel" handleClick={() => {
                  setShowInput(false);
                }} /> 
              </h6>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
  
export default CommentTemplate;
