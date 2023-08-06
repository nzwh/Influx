import { CommunityClass, PostClass, UserClass } from '@/libraries/structures';
import Supabase from '@/src/app/backend/model/supabase';
import { useGlobalContext } from '@/src/app/backend/hooks/GlobalContext';

const PostActions = () => {

  const { posts, setPosts } = useGlobalContext();

  const AddPost = async (post: PostClass) => {
    const { data, error } = await Supabase
      .from('posts')
      .insert([post])
      .select()
      .single();

    if (error) throw error;
    return data;
  };

  const AddItem = async (post: PostClass, author: UserClass, origin: CommunityClass) => {
    const data = await AddPost(post);
    const newPost = new PostClass({
      ...data, author, origin, posted_at: new Date(data.posted_at),
    });
    setPosts([newPost, ...posts]);
  };

  const DeletePost = async (postId: number) => {
    const { data, error } = await Supabase
      .from('posts')
      .delete()
      .match({ id: postId });

    if (error) throw error;
  };

  const DeletePhotos = async (post_media: string[]) => {
    const filenames = post_media
      .map((url) => url.split("data/")[1]);
    console.log("files to delete: ", filenames.join(", "));
    const { data, error } = await Supabase
      .storage
      .from('data')
      .remove(filenames);

    if (error) throw error;
  };

  const DeleteItem = async (postId: number, post_media: string[]) => {
    await Promise.all([
      DeletePost(postId),
      post_media.length > 1 && DeletePhotos(post_media),
    ]);
    const newPosts = posts.filter((post) => post.id !== postId);
    setPosts(newPosts);
  };

  return { AddItem, DeleteItem };
};

export default PostActions;