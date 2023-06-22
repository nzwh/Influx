'use client';

import React from "react";
import { useState } from "react";
import Comment from "../components/Comment";

const comments = {
  id: 1,
  items: [
    {
      id: 2,
      name: "hello",
      items: [
        {
          id: 3,
          name: "hello",
          items: []
        }
      ]
    }
  ]
};

export default function Home() {
  const [commentsData, setCommentsData] = useState(comments);

  return (
    <div className="Home">
      <Comment comment={commentsData}/>
    </div>
  );
}