'use client' // * Uses interactable components

import React, { useState, useRef, useEffect } from "react";
import Image from 'next/image';

// Layouts
import Comment from '@/src/app/backend/components/layouts/CommentLayout';

// Hooks & Classes
import { CommentClass, UserClass } from '@/libraries/structures';
import { useGlobalContext } from '@/src/app/backend/hooks/context/useGlobalContext';
import { useCommentsContext } from '@/src/app/backend/hooks/context/useCommentsContext';

import useFetchUsers from '@/src/app/backend/hooks/fetching/useFetchUsers';

// Icons
import { Send } from 'lucide-react';

// Model
import Supabase from '@/src/app/backend/model/supabase';

const CommentSection: React.FC<{ postId: number }> = ({ postId }) => {

  const { user } = useGlobalContext();
  const { comments, setComments, commentsArray, setCommentsArray } = useCommentsContext();
  const [users, setUsers] = useState<UserClass[]>([]);

  const [input, setInput] = useState("");
  const [showInput, setShowInput] = useState(false);

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

          return commentData as CommentClass;
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

  const nestComments = (comments: any) => {
    const nestedCommentsMap = new Map();

    // Create a map with parentCommentId as keys and array of child comments as values
    comments.forEach((comment: any) => {
      const parentCommentId = comment.enclosing_comment || 'root';
      if (!nestedCommentsMap.has(parentCommentId)) {
        nestedCommentsMap.set(parentCommentId, []);
      }
      nestedCommentsMap.get(parentCommentId).push(comment);
    });

    // Helper function to recursively render nested comments
    const renderNestedComments = (comment: any) => {
      const nestedComments = nestedCommentsMap.get(comment.id) || [];

      return (
        <div key={comment.id} className="nestedComment">
          <Comment comment={comment} />
          {nestedComments.length > 0 && (
            <div className="pl-3">
              {nestedComments.map((childComment: any) => (
                renderNestedComments(childComment)
              ))}
            </div>
          )}
        </div>
      );
    };

    // Render root comments
    return comments
      .filter((comment: any) => !comment.enclosing_comment)
      .map((rootComment: any) => (
        <div key={rootComment.id} className="rootComment">
          <Comment comment={rootComment} />
          <div className="pl-3">
            {nestedCommentsMap.get(rootComment.id)?.map((childComment: any) => (
              renderNestedComments(childComment)
            ))}
          </div>
        </div>
      ));
  };

  return ( 
    <main>

      <div className="flex flex-col relative" style={{ width: "100%" }}>
        <div className="commentContainer">
          {nestComments(comments)}
        </div>
        <div className="inputContainer sticky bottom-0 z-10 bg-white pb-4 pt-2">
          <div className="flex flex-row items-center gap-4">
            <div className="flex flex-row gap-2 w-full">
              <Image className="rounded-full w-5 h-5 object-cover" src={user ? user.icon : "/root/temp.jpg"} alt="User Icon" width={20} height={20} />
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

export default CommentSection;