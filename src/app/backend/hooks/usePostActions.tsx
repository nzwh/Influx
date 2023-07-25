import { PostInterface } from '@/libraries/structures';

import supabase from '@/src/app/backend/model/supabase';

const usePostActions = () => {

  // Handles adding new posts to the top of the list.
  const handleAddPost = async (post: PostInterface) => {
    try {
      console.log('Adding post...');
      const { data, error } = await supabase.from('posts').insert([post]);
      if (error) {
        throw error;
      }
      if (data) {
        console.log('Post added successfully:', data[0]);
      }
    } catch (error) {
      console.log('Error adding post:', error);
    }
  };

  // Handles removing a post from the list.
  const handleDeletePost = async (postId: number) => {
    try {
      console.log('Deleting post...');
      const { error } = await supabase.from('posts').delete().match({ id: postId });
      if (error) {
        throw error;
      }
      console.log('Post deleted successfully.');
    } catch (error) {
      console.log('Error deleting post:', error);
    }
  }

   // Handles adding new posts to the top of the list.
   const handleEditPost = async (post: PostInterface) => {
    try {
      console.log('Editing post...');
      const { error } = await supabase.from('posts').delete().match({ id: postId });
      if (error) {
        throw error;
      }
      console.log('Post deleted successfully.');
    } catch (error) {
      console.log('Error deleting post:', error);
    }
  }

  return { handleAddPost, handleDeletePost, handleEditPost };
};

export default usePostActions;