// 'use server'

import React from "react";

interface ActionProps {
  handleClick: () => void;
  type: string;
  className: string;
}

const Action: React.FC<ActionProps> = ({ handleClick, type, className }) => {
  return (
    <div className={className} onClick={handleClick}>
      {type}
    </div>
  );
};

export default Action;