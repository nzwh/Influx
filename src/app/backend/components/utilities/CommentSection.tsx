'use client';

import React, { useState, useRef, useEffect } from "react";
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Action from "@/src/app/backend/components/utilities/Action";
import useFetchUsers from '@/src/app/backend/hooks/FetchUsers';
import CommentLayout from '@/src/app/backend/components/layouts/CommentLayout';

import { ArrowDown, ArrowUp, Film, Paperclip, Reply, Send, Smile, Tag } from 'lucide-react';

import { CommentClass, UserClass } from '@/libraries/structures';

import { useGlobalContext } from '@/src/app/backend/hooks/GlobalContext';
import { useCommentsContext } from '@/src/app/backend/hooks/CommentsContext';
import Supabase from '@/src/app/backend/model/supabase';

interface Props {
  postId: number
}

const Comment = ({ postId }: Props) => {

  const { user, setUser, posts, setPosts } = useGlobalContext();
  const { comments, setComments, commentsArray, setCommentsArray } = useCommentsContext();
  const [users, setUsers] = useState<UserClass[]>([]);

  const [input, setInput] = useState("");
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef(null);

  // Loads comments from the database.
  useEffect(() => {

    // Fetches and sets comments under the post based on the comment IDs.
    const fetchComments = async (commentIds: number[]) => {
      const commentPromises = commentIds.map(async (commentId) => {
        const { data: commentData, error } = await Supabase
          .from('comments')
          .select('*')
          .eq('id', commentId)
          .single();

        if (error) {
          console.error(`Error fetching comment with ID ${commentId}:`, error);
          return null;
        } else {
          if (commentData.author) {
            // Fetch user data based on the UUID
            const fetchUsers = useFetchUsers({
              type: 'subquery',
              users,
              setUsers,
              uuids: [commentData.author]
            });
            await fetchUsers();
    
            // Find the user data based on the UUID
            const foundUser = users?.find((user: UserClass) => user.uuid === commentData.author);
    
            // If the user is found, update the comment's author field
            if (foundUser) {
              commentData.author = foundUser;
            } else {
              // Create a new UserClass instance as a fallback
              commentData.author = new UserClass();
            }
          }

          return commentData as CommentInterface;
        }
      });

      const fetchedComments = await Promise.all(commentPromises);
      setComments(fetchedComments.filter(comment => comment !== null) as CommentClass[]);
    };

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
        console.log(commentsArray);
        setCommentsArray(commentsArray);
        fetchComments(commentsArray);
      }
    }

    fetchCommentsArray();
  }, [postId]);

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

   // Handles adding a new comment.
  const handleAdd = async () => {

    const newComment : any = {
      enclosing_post: postId,
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

      console.log('Comment inserted:', commentData);
    
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

          await updatePostInDatabase(postId, updatedCommentsArray);
          console.log('Comments array updated:', updatedCommentsArray);
        }
        /*console.log('Comment inserted into query:', newComment);
        console.log('Comment inserted:', commentData);
    
        setComments(prevComments => [commentInstance, ...prevComments]); 
        console.log('After setComments:', comments);
    
        setCommentsArray(prevCommentsArray => [...prevCommentsArray, commentData[0].id]);
    
        await updatePostInDatabase(postId, commentsArray);
        console.log('Comments array updated:', commentsArray);*/
      }
    } catch (e) {
      console.error('Error during insertion:', e);
    }

    // handleInsertNode(comment.id, input);
    setShowInput(false);
    setInput("");
  };

  const renderCommentTree = (comments, parentCommentId) => {
    const childComments = comments.filter(comment => comment.enclosing_comment === parentCommentId);
  
    if (childComments.length === 0) {
      return null; // No child comments, terminate recursion
    }
  
    return (
      <div className="nestedComment">
        {childComments.map(comment => (
          <div key={comment.id} className="nestedComment">
            <CommentLayout comment={comment} />
            {renderCommentTree(comments, comment.id)}
          </div>
        ))}
      </div>
    );
  };
  
  const rootComments = comments.filter(comment => !comment.enclosing_comment);

  return ( 
    <main>

      <div className="flex flex-col" style={{ width: "100%" }}>
        <div className="commentContainer">
          {rootComments.map(rootComment => (
            <div key={rootComment.id} className="rootComment">
              <CommentLayout comment={rootComment} />
              <div className="pl-2">
                {renderCommentTree(comments, rootComment.id)}
              </div>
            </div>
          ))}
        </div>
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
              <Send className="opacity-70 cursor-pointer" color="black" size={12} strokeWidth={3} onClick={handleAdd}/>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Comment;