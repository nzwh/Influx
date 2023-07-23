import { useMemo } from 'react';

const useRelativeDateFormatter = () => {

  // Converts a timestamp to a relative date.
  const convertToRelativeDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
  
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const years = Math.floor(weeks / 52);
  
    if (years > 0) {
      const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
      return formattedDate;
    } 
    else if (weeks > 0) {
      return `${weeks}w ago`;
    } 
    else if (days > 0) {
      return `${days}d ago`;
    } 
    else if (hours > 0) {
      return `${hours}h ago`;
    } 
    else if (minutes > 0) {
      return `${minutes}m ago`;
    } 
    else {
      return `${seconds}s ago`;
    }
  };

  return useMemo(() => convertToRelativeDate, []);
};

export default useRelativeDateFormatter;