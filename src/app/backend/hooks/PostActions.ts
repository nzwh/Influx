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

  return { AddPost };
};

export default PostActions;