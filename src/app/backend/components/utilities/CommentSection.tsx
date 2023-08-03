'use client';

import React, { useState, useRef, useEffect } from "react";
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Action from "@/src/app/backend/components/utilities/Action";
import useFetchUser from "@/src/app/backend/hooks/useFetchUser";
import { ArrowDown, ArrowUp, Film, Paperclip, Reply, Send, Smile, Tag } from 'lucide-react';

import { CommentInterface, UserInterface } from '@/libraries/structures';

import { useGlobalContext } from '@/src/app/backend/hooks/GlobalContext';
import Supabase from '@/src/app/backend/model/supabase';

interface Props {
  postId: number,
  comment: any,
  handleInsertNode: (folderId: any, item: any) => void,
  handleEditNode: (folderId: any, value: any) => void,
  handleDeleteNode: (folderId: any) => void
}

const Comment = ({ postId, comment, handleInsertNode, handleEditNode, handleDeleteNode }: Props) => {

  const { user, setUser, posts, setPosts } = useGlobalContext();

  const [comments, setComments] = useState<CommentInterface[]>([]);

  // Loads comments from the database.
  useEffect(() => {

    // Fetches and sets comments under the post based on the comment IDs.
    async function fetchComments(commentIds: number[]) {
      const commentPromises = commentIds.map(async (commentId) => {
        const { data: commentData, error } = await Supabase
          .from('comments')
          .select('*')
          .eq('commentid', commentId)
          .single();

        if (error) {
          console.error(`Error fetching comment with ID ${commentId}:`, error);
          return null;
        } else {
          return commentData as CommentInterface;
        }
      });

      const fetchedComments = await Promise.all(commentPromises);
      setComments(fetchedComments.filter(comment => comment !== null) as CommentInterface[]);
    }

    // Fetches comment IDs of comments under the post. 
    async function fetchCommentsArray() {
      const { data: postData, error } = await Supabase
        .from('posts')
        .select('comments')
        .eq('id', postId)
        .single();

      if (error) {
        console.error('Error fetching comments array from post with ID ${postId}:', error);
      } else {
        const commentsArray = postData.comments || [];
        fetchComments(commentsArray);
      }
    }

    fetchCommentsArray();
  }, [postId]);

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

  // Handles adding and editing comments.
  const onAddComment = async () => {
    if (editMode) { // Handles editing an existing comment.
      // handleEditNode(comment.id, inputRef?.current?.innerText + " (edited)");
      const editedContent = inputRef?.current?.innerText + " (edited)";

      setComments(prevComments => {
        return prevComments.map(prevComment => {
          if (prevComment.id === comment.id) {
            return { ...prevComment, content: editedContent };
          }
          return prevComment;
        });
      });

      const { data, error } = await Supabase
      .from('comments')
      .update({ content: editedContent })
      .eq('id', comment.id);

      if (error) {
        console.error('Error updating comment with ID ${commentId}:', error);
      }
    } else { // Handles adding a new comment.
      const newComment : any = {
        id: 0, // Auto
        enclosing_post: postId,
        // enclosing_comment: 0, // If the comment is a reply
        author: user as UserInterface,
        posted_at: new Date(),
        is_edited: false,
        content: input,
        upvotes: [],
        downvotes: [],
        replies: []
      };

      setComments(prevComments => [
        newComment,
        ...prevComments,
      ]);

      newComment.author = user.uuid;

      const { data, error } = await Supabase.from('comments').insert([newComment]);

      if (error) {
        console.error('Error inserting new comment:', error);
      }

      // handleInsertNode(comment.id, input);
      setShowInput(false);
      setInput("");
    }

    if (editMode) setEditMode(false);
  };

  const handleDelete = async () => {
    // handleDeleteNode(comment.id);
    const { data, error } = await Supabase
    .from('comments')
    .delete()
    .eq('id', comment.id);

    if (error) {
      console.error('Error deleting comment with ID ${comment.id}:', error);
    } else {
      setComments(prevComments => prevComments.filter(prevComment => prevComment.id !== comment.id));
    }
  };

  return ( 
    <main>

      <div style={{ width: "100%" }}>
        <div className="inputContainer">
          <div className="flex flex-row items-center justify-between w-full gap-4">
            <div className="flex flex-row gap-2 w-full">
              <Image className="rounded-full" src={user ? user.icon : "/root/temp.jpg"} alt="User Icon" width={20} height={20} />
              <input 
                type="text" 
                className="inputContainer__input font-extralight text-xs w-full" 
                autoFocus 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                placeholder="Write a comment..."
              />
            </div>
            <div className="flex flex-row items-center gap-2">
              <Send className="opacity-70 cursor-pointer" color="black" size={12} strokeWidth={3} onClick={onAddComment}/>
            </div>
          </div>
        </div>
      </div>


      {/*
      <div className={comment?.id === 1? "inputContainer" : "commentContainer"} style={{ width: "100%" }}>
        {comment?.id === 1 ? (
          <>
            <div className= "flex flex-row items-center justify-between w-full gap-4">
              <div className="flex flex-row gap-2 w-full">
                <Image className="rounded-full"src={user ? user.icon : "/root/temp.jpg"} alt="User Icon" width={20} height={20} />
                <input 
                  type="text" 
                  className="inputContainer__input font-extralight text-xs w-full" 
                  autoFocus value={input} 
                  onChange={(e) => setInput(e.target.value)} 
                  placeholder="Write a comment..."
                />
              </div>
              <div className= "flex flex-row items-center gap-2">
                <Send className="opacity-70 cursor-pointer" color="black" size={12} strokeWidth={3} onClick={onAddComment}/>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-row gap-10">
              <div className="flex flex-col gap-2 w-full">
                <div className="flex flex-row items-start gap-2">
                  <Image className="rounded-full cursor-pointer mt-0.5" src="/avatars/temp.jpg" alt="User Icon" width={28} height={28} />
                  <div className="flex flex-col w-full">
                    <div className="flex flex-row justify-between">
                      <div className="flex flex-row gap-2">
                        <h6 className="text-gray-800 font-regular text-xs cursor-pointer">Arkustore</h6>
                        <h6 className="text-gray-500 font-light text-xs">{new Date(Date.now()).toLocaleString().split(',')[0]}</h6>
                      </div>
                      <div>
                        {editMode ? (
                          <></>
                          ) : (
                          <>
                          <div className="flex flex-row gap-2">
                          <h6 className="text-gray-800 font-regular text-xs cursor-pointer">
                            <Action className="reply" type="E" handleClick={() => {
                              setEditMode(true);
                            }} 
                            />
                          </h6>
                          <h6 className="text-gray-800 font-regular text-xs cursor-pointer">
                            <Action className="reply" type="D" handleClick={handleDelete}/>
                          </h6>
                          </div>
                          </>
                        )}
                      </div>    
                    </div>
                    <p className="text-gray-800 font-light text-xs word-wrap">
                      {comment?.id === 1 ? (
                        <>
                        {comment.name}
                        </>
                      ) : (
                        <>
                          <span 
                            contentEditable={editMode} 
                            suppressContentEditableWarning={editMode}
                            style={{ wordWrap: "break-word" }}
                            ref={inputRef}
                          >
                            {comment.name}
                          </span>
                        </>
                      )}
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
                        <h6 className="text-gray-800 font-regular text-xs">{upvotes - downvotes}</h6>
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
          </>
        )}

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
        
      
        {comment?.items?.map((cmnt) => {
          return ( 
            <Comment 
              key={cmnt.id}
              handleInsertNode={handleInsertNode} 
              handleEditNode={handleEditNode}
              handleDeleteNode={handleDeleteNode} 
              comment={cmnt}
            />
          )
        })}
      </div>
      </div>
      */}
    </main>
  );
}

export default Comment;