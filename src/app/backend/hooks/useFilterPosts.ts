import { PostClass, UserClass } from '@/libraries/structures';

const FilterPosts = (posts: PostClass[], queryParams: URLSearchParams, user: UserClass): PostClass[] => {

  const applyFilter = (posts: PostClass[], key: string, value: string): PostClass[] => {

    switch (key) {
      case 'query':
        return posts.filter(
          (post) =>
            post.title.includes(value) ||
            post.description.includes(value) ||
            (post.tags && post.tags.join(',').includes(value))
        );
      case 'username':
        return posts.filter((post) => post.author.handle.includes(value));
      case 'condition':
        return value !== 'all' ? posts.filter((post) => post.condition?.replace('-', '_') === value) : posts;
      case 'type':
        return value !== 'all' ? posts.filter((post) => post.type?.replace('-', '_') === value) : posts;
      case 'tags':
        return value !== '' ? posts.filter(
          (post) =>
            (post.tags && post.tags.some((substring: string) => post.title.includes(substring))) ||
            (post.tags && post.tags.some((substring: string) => post.description.includes(substring))) ||
            (post.tags && post.tags.some((substring: string) => post.tags?.join(',').includes(substring)))
        ) : posts;
      case 'open':
        return posts.filter((post) => post.is_open === true);
      case 'min-slider':
        if (Number(value) === 0 || Number(value) === 10)
          return posts;
        else
          return posts.filter((post) => (post.type === 'buying' && post.range_start! >= Number(value)) || (post.type === 'selling' && post.price! >= Number(value)));
      case 'max-slider':
        if (Number(value) === 0 || Number(value) === 1000)
          return posts;
        else
          return posts.filter((post) => (post.type === 'buying' && post.range_end! <= Number(value)) || (post.type === 'selling' && post.price! <= Number(value)));
      case 'owner':
        return posts.filter((post) => post.author.uuid === user.uuid);
      default:
        return posts;
    }
  };

  const applySort = (posts: PostClass[], sortBy: string, sortOrder: string): PostClass[] => {
    let sortedPosts = [...posts];
    switch (sortBy) {
      case 'date_posted':
        sortedPosts.sort((a, b) => a.posted_at.getSeconds() - b.posted_at.getSeconds());
        break;
      case 'upvotes':
        sortedPosts.sort((a, b) => (a.upvotes?.length || 0) - (a.downvotes?.length || 0) - (b.upvotes?.length || 0) + (b.downvotes?.length || 0));
        break;
      case 'price':
        sortedPosts = sortedPosts.filter((post) => post.type === 'selling');
        sortedPosts.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'popularity':
        sortedPosts.sort((a, b) => (a.cart?.length || 0) - (a.bookmarks?.length || 0) - (b.cart?.length || 0) + (b.bookmarks?.length || 0));
        break;
      default:
        break;
    }
    if (sortOrder === 'ascending') {
      sortedPosts.reverse();
    }
    return sortedPosts;
  };

  queryParams.forEach((value, key) => {
    if (value && key) {
      posts = applyFilter(posts, key, value);
    }
  });

  const isAscending = queryParams.get('ascending');
  const isDescending = queryParams.get('descending');

  if (isAscending || !isDescending) {
    posts = applySort(posts, queryParams.get('sort') || 'date_posted', 'ascending');
  } else if (isDescending || !isAscending) {
    posts = applySort(posts, queryParams.get('sort') || 'date_posted', 'descending');
  }

  return posts;
};

export default FilterPosts;