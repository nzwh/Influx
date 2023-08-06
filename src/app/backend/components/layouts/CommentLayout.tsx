import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import useRelativeDateFormatter from "@/src/app/backend/hooks/useRelativeDateFormatter";
import Popover from '@/src/app/backend/components/layouts/PopoverLayout';

import { CommentClass, UserClass } from '@/libraries/structures';
import ToggleVote from '@/src/app/backend/components/utilities/ToggleVote';
import { ArrowDown, ArrowUp, MoreHorizontal, Pencil, Reply, Trash2 } from 'lucide-react';

import { useGlobalContext } from '@/src/app/backend/hooks/GlobalContext';
import { useCommentsContext } from '@/src/app/backend/hooks/CommentsContext';
import Supabase from '@/src/app/backend/model/supabase';
import Action from '../utilities/Action';

interface Props {
  comment: CommentClass;
}

const CommentTemplate: React.FC<Props> = ({ comment }) => {
  
  const { user, setUser, posts, setPosts } = useGlobalContext();
  const { comments, setComments, commentsArray, setCommentsArray } = useCommentsContext();  

  const [input, setInput] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef(null);
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);
  let upvotes = 0;
  let downvotes = 0;

  useEffect(() => {
    inputRef?.current?.focus();
  }, [editMode]);

  const handleNewComment = () => {
    setShowInput(true);
  };

  async function updatePostInDatabase(postId: any, comments: any) {
    try {
      const { data, error } = await Supabase
        .from('posts')
        .update({ comments })
        .eq('id', postId);
  
      console.log('Post updated in the database:', postId, comments);
    } catch (error) {
      console.error('Error updating post in the database:', error);
    }
  }

     // Handles replying to an existing comment.
     const handleReply = async () => {

      const newComment : any = {
        enclosing_post: comment.enclosing_post,
        enclosing_comment: comment.id, 
        posted_at: new Date(),
        is_edited: false,
        content: input, 
        upvotes: [],
        downvotes: [],
        replies: []
      };
      
      const commentInstance = new CommentClass({
        ...newComment, author: user
      });
  
      setComments(prevComments => [commentInstance, ...(prevComments)]);
      newComment.author = user.uuid;
      
      try {
        const { data: commentData, error: insertError } = await Supabase
          .from('comments')
          .insert([newComment]);
      
        if (insertError) {
          console.error('Error inserting new comment:', insertError);
        } else {
          const { data: latestComment } = await Supabase
          .from('comments')
          .select('id')
          .eq('author', user.uuid)
          .order('posted_at', { ascending: false })
          .limit(1);
  
          if (latestComment && latestComment.length > 0) {
            const updatedCommentsArray = [...commentsArray, latestComment[0].id];
            setCommentsArray(updatedCommentsArray);
  
            await updatePostInDatabase(comment.enclosing_post, updatedCommentsArray);
            console.log('Comments array updated:', updatedCommentsArray);
          }
        }
      } catch (e) {
        console.error('Error during insertion:', e);
      }
  
      // handleInsertNode(comment.id, input);
      setShowInput(false);
      setInput("");
    };

  // Handles editing an existing comment.
  const handleEdit = async () => {

    setEditMode(true);

    if (editMode) { 
      // handleEditNode(comment.id, inputRef?.current?.innerText + " (edited)");
      const editedContent = inputRef?.current?.innerText;
  
      setComments(prevComments => {
        return prevComments.map(prevComment => {
          if (prevComment.id === comment.id) {
            return { ...prevComment, content: editedContent, is_edited: true, edited_at: new Date() };
          }
          return prevComment;
        });
      });
  
      const { data, error } = await Supabase
        .from('comments')
        .update({ 
          content: editedContent,
          is_edited: true,
          edited_at: new Date() 
        })
        .eq('id', comment.id);
  
      if (error) {
        console.error('Error updating comment with ID ${commentId}:', error);
      }
    }

    if (editMode) setEditMode(false);
  };

  const handleDelete = async () => {
    // handleDeleteNode(comment.id);
    const { data, error } = await Supabase
    .from('comments')
    .update({
      is_deleted: true,
      enclosing_comment: null,
      author: null,
      content: '',
      upvotes: [],
      downvotes: [],
      replies: []
    })
    .eq('id', comment.id);

    if (error) {
      console.error('Error deleting comment with ID ${comment.id}:', error);
    } else {
      {/*setComments(prevComments => prevComments.filter(prevComment => prevComment.id !== comment.id));

      const updatedCommentsArray = commentsArray.filter(commentId => commentId !== comment.id);
      setCommentsArray(updatedCommentsArray);
    
      await updatePostInDatabase(comment.enclosing_post, updatedCommentsArray);*/}
    }
  };

  const convertToRelativeDate = useRelativeDateFormatter();

  return (
    <div>
      <div className="flex flex-row gap-10">
        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex-row items-start gap-2">
            <Image className="rounded-full cursor-pointer mt-0.5 w-7 h-7 object-cover" src={comment.is_deleted ? "/root/temp.jpg" : comment.author.icon} alt="User Icon" width={28} height={28} />
            <div className="flex flex-col w-full">
              <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-2">
                  <h6 className="text-gray-800 font-regular text-xs cursor-pointer">
                    {comment.is_deleted ? "Deleted" : `${comment.author?.first_name} ${comment.author?.last_name}`}
                  </h6>
                  {!comment.is_deleted && (
                    <>
                      <h6 className="text-gray-500 font-light text-xs">
                        {convertToRelativeDate(comment.posted_at.toLocaleString())}
                      </h6>
                      {comment.is_edited && (
                        <>
                          <h6 className="text-gray-500 font-light text-xs">•</h6>
                          <h6 className="text-gray-500 font-light text-xs">
                            Edited {convertToRelativeDate(comment.edited_at!.toLocaleString())}
                          </h6>
                        </>
                      )}
                    </>
                  )}
                </div>
                <div>
                  {editMode ? (
                    <></>
                  ) : (
                    <>
                      {!comment.is_deleted && (
                        <div className="flex flex-row gap-2">
                          {comment.author.uuid === user.uuid ? (
                            <Popover
                              classes={"top-4 z-[45]"}
                              trigger={
                                <MoreHorizontal
                                  className="opacity-70 cursor-pointer relative"
                                  color="black"
                                  size={12}
                                  strokeWidth={3}
                                />
                              }
                              elements={[
                                ["Edit", <Pencil size={12} strokeWidth={3} />, () => handleEdit()],
                                ["Delete", <Trash2 size={12} strokeWidth={3} />, () => handleDelete()],
                              ]}
                            />
                          ) : null}
                        </div>
                      )}
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
                {comment.is_deleted ? "This comment has been deleted." : comment.content}
              </span>
              </p>
            </div>
          </div>
          {!comment.is_deleted && (
          <div className="flex flex-row items-center gap-2 ">
            {editMode ? (
            <>
            <h6 className="text-gray-800 font-regular text-xs cursor-pointer">
              <Action className="reply" type="Save" handleClick={handleEdit}/>
            </h6>
            <h6 className="text-gray-800 font-regular text-xs cursor-pointer">
              <Action className="reply" type="Cancel" handleClick={() => {
                if (inputRef.current)
                  inputRef.current.innerText = comment.content;
                setEditMode(false);
            }} />
            </h6>
            </>
            ) : (
            <>
            <ToggleVote type="comment" comment={comment} />
            <div className="flex flex-row gap-1 cursor-pointer">
              <Reply className="opacity-70 cursor-pointer" color="black" size={14} strokeWidth={3} onClick={handleNewComment}/>
              <h6 className="text-gray-800 font-regular text-xs">
                <Action className="reply" type="Reply" handleClick={handleNewComment}/>
              </h6>
            </div>
            </>
            )}
          </div>
          )}
        </div>
      </div>

      <div className="pt-2 pb-2 pl-2">
        {showInput && (
          <div className="inputContainer">
            <div className= "flex flex-row items-center rounded-lg w-auto">
              <Image className="rounded-full w-6 h-6 object-cover" src={user ? user.icon : "/root/temp.jpg"} alt="User Icon" width={24} height={24} />
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
                <Action className="reply" type="Reply" handleClick={handleReply} />
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
