'use client';

import React, { useState, useRef, useEffect } from "react";
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Action from "@/src/app/backend/components/utilities/Action";
import useFetchUser from "@/src/app/backend/hooks/useFetchUser";
import { ArrowDown, ArrowUp, Film, Paperclip, Reply, Send, Smile, Tag } from 'lucide-react';

const Comment = ({ comment,handleInsertNode,handleEditNode, handleDeleteNode }) => {
  let activeD = JSON.parse(sessionStorage.getItem('token')!)
  let router = useRouter();
  
  useEffect(() => {
    if(sessionStorage.getItem('token')) {
      activeD = JSON.parse(sessionStorage.getItem('token')!)
      console.log(activeD.user.id)
    }
    else {
      router.push('/home')
    }
  }, [])

  const { user, fetchUser} = useFetchUser({ type: 'userId', userId: activeD.user.id as string });
  const activeData = user[0];

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

  const onAddComment = () => {
    if (editMode) {
      handleEditNode(comment.id, inputRef?.current?.innerText + " (edited)");
    } else {
      handleInsertNode(comment.id, input);
      setShowInput(false);
      setInput("");
    }

    if (editMode) setEditMode(false);
  };

  const handleDelete = () => {
    handleDeleteNode(comment.id);
  };

  const upvote = () => {
    if (!upvoted && !downvoted) {
      upvotes += 1;
      setUpvoted(true);
      console.log(upvotes);
      console.log(downvotes);
    }
    else if (upvoted && !downvoted) {
      upvotes -= 1;
      setUpvoted(false);
      console.log(upvotes);
      console.log(downvotes);
    }
    else if (!upvoted && downvoted) {
      upvotes += 1;
      downvotes -= 1;
      setUpvoted(true);
      setDownvoted(false);
      console.log(upvotes);
      console.log(downvotes);
    }
  };

  const downvote = () => {
    if (!upvoted && !downvoted) {
      downvotes += 1;
      setDownvoted(true);
      console.log(upvotes);
      console.log(downvotes);
    }
    else if (!upvoted && downvoted) {
      downvotes -= 1;
      setDownvoted(false);
      console.log(upvotes);
      console.log(downvotes);
    }
    else if (upvoted && !downvoted) {
      upvotes -= 1;
      downvotes += 1;
      setUpvoted(false);
      setDownvoted(true);
      console.log(upvotes);
      console.log(downvotes);
    }
  };

  return ( 
    <main>

      <div className={comment?.id === 1? "inputContainer" : "commentContainer"} style={{ width: "100%" }}>
        {comment?.id === 1 ? (
          <>
            <div className= "flex flex-row items-center justify-between w-full gap-4">
              <div className="flex flex-row gap-2 w-full">
                <Image className="rounded-full" src={activeData ? activeData.icon : "/root/temp.jpg"} alt="User Icon" width={20} height={20} />
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
    </main>
  );
}

export default Comment;