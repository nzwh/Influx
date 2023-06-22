'use client';

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

  const handleNewComment = () => {
    setShowInput(true);
  };

  const onAddComment = () => {
    handleInsertNode(comment.id, input);
    setInput("");
    setShowInput(false);
  };

  return ( 
    <div>
      <div className={comment?.id === 1? "inputContainer" : "commentContainer"}>
        {comment?.id === 1 ? (
          <>
            <input type="text" className="inputContainer__input first_input" autoFocus value={input} onChange={(e) => setInput(e.target.value)} placeholder="type..."/>
            <div className="reply comment" onClick = {onAddComment}>
            <Action className="reply comment" type="COMMENT" handleClick={onAddComment}/>
            </div>
          </>
        ) : (
          <>
            <span style={{ wordWrap: "break-word" }}>{comment.name}</span>

            <div style={{ display: "flex", marginTop: "5px" }}>
              {editMode ? (
                <>
                  <Action className="reply" type="SAVE"/>
                  <Action className="reply" type="CANCEL" handleClick={() => {
                    setEditMode(false);
                  }} 
                  />
                </>
              ) : (
                <>
                  <Action className="reply" type="REPLY" handleClick={handleNewComment}/>
                  <Action className="reply" type="EDIT" handleClick={() => {
                    setEditMode(true);
                  }} 
                  />
                  <Action className="reply" type="DELETE"/>
                </>
              )}
            </div>
          </>
        )}
      </div>
      <div style={{ paddingLeft: 25 }}>
        {showInput && (
          <div className="inputContainer">
            <input type="text" className="inputContainer__input" autoFocus value={input} onChange={(e) => setInput(e.target.value)} placeholder="type..."/>
            <Action className="reply" type="REPLY"/>
            <Action className="reply" type="CANCEL" handleClick={() => {
              setShowInput(false);
            }} 
            />
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
  );
}

export default Comment;