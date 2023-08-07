import { createContext, useContext, useState, Dispatch, SetStateAction } from 'react';
import { CommentClass } from '@/libraries/structures';

type Dispatcher<S> = Dispatch<SetStateAction<S>>;

interface CommentsContextType {
  comments: CommentClass[];
  setComments: Dispatcher<CommentClass[]>;
  commentsArray: number[];
  setCommentsArray: Dispatcher<number[]>;
}

const defaultCommentsValue: CommentsContextType = {
  comments: [],
  setComments: () => {},
  commentsArray: [],
  setCommentsArray: () => {},
};

const CommentsContext = createContext(defaultCommentsValue);

export const CommentsProvider = ({ children }) => {
  const [comments, setComments] = useState<CommentClass[]>([]);
  const [commentsArray, setCommentsArray] = useState<number[]>([]);

  return (
    <CommentsContext.Provider value={{ comments, setComments, commentsArray, setCommentsArray }}>
      {children}
    </CommentsContext.Provider>
  );
};

export const useCommentsContext = () => {
  return useContext(CommentsContext);
};
