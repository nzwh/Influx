'use client';

import Image from 'next/image';
import React from "react";
import { useState, useRef, useEffect } from "react";
import Action from "./Action";

const Comment = ({ 
  comment,
  handleInsertNode,
  handleEditNode,
  handleDeleteNode
  }) => {
  const [input, setInput] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef?.current?.focus();
  }, [editMode]);

  const handleNewComment = () => {
    setShowInput(true);
  };

  const onAddComment = () => {
    if (editMode) {
      handleEditNode(comment.id, inputRef?.current?.innerText);
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

  return ( 
    <main>
      <div className="flex flex-row gap-10">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center gap-2">
            <Image className="rounded-full cursor-pointer" src="/avatars/temp.jpg" alt="User Icon" width={24} height={24} />
            <div className="flex flex-col">
              <div className="flex flex-row">
                <div className="flex flex-row gap-2">
                  <h6 className="text-gray-950 font-bold text-sm tracking-tighter leading-5 cursor-pointer">Arkustore</h6>
                  <h6 className="text-gray-500 font-bold text-xs tracking-tighter leading-5">9h ago</h6>
                </div>
                <div className="relative left-10">
                  {editMode ? (
                    <></>
                    ) : (
                    <>
                    <div className="flex flex-row gap-2">
                    <h6 className="text-gray-950 font-bold text-sm tracking-tighter leading-5 cursor-pointer">
                      <Action className="reply" type="Edit" handleClick={() => {
                        setEditMode(true);
                      }} 
                      />
                    </h6>
                    <h6 className="text-gray-950 font-bold text-sm tracking-tighter leading-5 cursor-pointer">
                      <Action className="reply" type="Delete" handleClick={handleDelete}/>
                    </h6>
                    </div>
                    </>
                  )}
                </div>    
              </div>
              <p className="text-gray-950 font-medium text-sm tracking-tighter leading-4 word-wrap">
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
          <div className="flex flex-row items-center gap-4">
            {editMode ? (
              <>
                <h6 className="text-gray-950 font-bold text-sm tracking-tighter leading-4 cursor-pointer">
                  <Action className="reply" type="Save" handleClick={onAddComment}/>
                </h6>
                <h6 className="text-gray-950 font-bold text-sm tracking-tighter leading-4 cursor-pointer">
                  <Action className="reply" type="Cancel" handleClick={() => {
                    if (inputRef.current)
                      inputRef.current.innerText = comment.name;
                    setEditMode(false);
                  }} />
                </h6>
                </>
              ) : (
                <>
                <div className="flex flex-row gap-2">
                  <Image src="/icons/b-arrup.svg" alt="Upvote Button" width={14} height={14} className="cursor-pointer"/>  
                  <h6 className="text-gray-950 font-bold text-sm tracking-tighter leading-4">127</h6>
                  <Image src="/icons/b-arrdw.svg" alt="Upvote Button" width={14} height={14} className="cursor-pointer" /> 
                </div>
                <div className="flex flex-row gap-2 cursor-pointer">
                  <Image src="/icons/b-reply.svg" alt="Reply" width={14} height={14} />  
                  <h6 className="text-gray-950 font-bold text-sm tracking-tighter leading-4">
                    <Action className="reply" type="Reply" handleClick={handleNewComment}/>
                  </h6>
                </div>
                
              </>
            )}
          </div>
        </div>
      </div>
      <div className="p-4 pl-21">
        {showInput && (
          <div className="inputContainer">
            <div className= "flex flex-row items-center bg-gray-100 rounded-lg p-2 w-auto">
              <Image className="rounded-full" src="/avatars/temp.jpg" alt="User Icon" width={24} height={24} />
              <input 
                type="text" 
                className="inputContainer__input first_input text-sm bg-gray-100 p-2 tracking-tighter" 
                autoFocus value={input} 
                onChange={(e) => setInput(e.target.value)} 
                placeholder="Reply to comment..."
              />
            </div>
            <div className="flex flex-row items-center gap-4">
              <h6 className="text-gray-950 font-bold text-sm tracking-tighter leading-4 cursor-pointer">
                <Action className="reply" type="Reply" handleClick={onAddComment} />
              </h6>
              <h6 className="text-gray-950 font-bold text-sm tracking-tighter leading-4 cursor-pointer">
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
        
      <div className={comment?.id === 1? "inputContainer" : "commentContainer"}>
        {comment?.id === 1 ? (
          <>
            <div className= "flex flex-row items-center bg-gray-100 rounded-lg p-2 w-auto">
              <Image className="rounded-full" src="/avatars/temp.jpg" alt="User Icon" width={24} height={24} />
              <input 
                type="text" 
                className="inputContainer__input text-sm bg-gray-100 p-2 tracking-tighter" 
                autoFocus value={input} 
                onChange={(e) => setInput(e.target.value)} 
                placeholder="Write a comment..."
              />
              <div className= "flex flex-row items-center gap-2">
                <Image src="/icons/b-smiley.svg" alt="Emoji" width={14} height={14} className="cursor-pointer"/>
                <Image src="/icons/b-clip.svg" alt="Attachment" width={14} height={14} className="cursor-pointer"/>  
                <Image src="/icons/b-photo.svg" alt="Media" width={14} height={14} className="cursor-pointer"/>  
                <Image src="/icons/b-send.svg" alt="Comment" width={14} height={14} className="cursor-pointer" onClick={onAddComment}/>    
              </div>
            </div>
          </>
        ) : (
          <>
          </>
        )}
      </div>
    </main>
  );
}

export default Comment;