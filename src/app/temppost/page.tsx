'use client';

import React from "react";
import { useState } from "react";
import Comment from "../components/Comment";
import useNode from "../hooks/useNode";
import { any } from "prop-types";

const comments = {
  id: 1,
  items: []
};

export default function Home() {
  const [commentsData, setCommentsData] = useState(comments);

  const { insertNode, editNode, deleteNode } = useNode();

  const handleInsertNode = (folderId, item) => {
    const finalStructure = insertNode(commentsData, folderId, item);
    setCommentsData(finalStructure);
  };

  const handleEditNode = (folderId, value) => {
    const finalStructure = editNode(commentsData, folderId, value);
    setCommentsData(finalStructure);
  };

  const handleDeleteNode = (folderId) => {
    const finalStructure = deleteNode(commentsData, folderId);
    const temp = { ...finalStructure };
    setCommentsData(temp);
  };

  return (
    <div className="Home">
      <Comment 
        handleInsertNode={handleInsertNode} 
        handleEditNode={handleEditNode}
        handleDeleteNode={handleDeleteNode} 
        comment={commentsData}
      />
    </div>
  );
}