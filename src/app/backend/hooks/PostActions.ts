import { PostClass } from '@/libraries/structures';
import Supabase from '@/src/app/backend/model/supabase';

const PostActions = () => {

  const AddPost = async (post: PostClass) => {
    const { data, error } = await Supabase
      .from('posts')
      .insert([post]);

    if (error) throw error;
    if (!data) return;
  };

  const DeletePost = async (postId: number) => {
    const { data : post, error } = await Supabase
      .from('posts')
      .delete()
      .match({ id: postId });

    if (error) throw error;
    if (!post) return;
  };

  const DeletePhotos = async (post_media : string[]) => {
    const filenames = post_media.map((url) => url.substring(url.lastIndexOf('/') + 1));
    const { data, error } = await Supabase
      .storage
      .from('images')
      .remove(filenames);

    if (error) throw error;
    if (!data) return;
  };

  return { AddPost, DeletePost, DeletePhotos };
};

export default PostActions;