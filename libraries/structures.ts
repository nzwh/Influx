interface UserInterface {
  id: number;
  uuid: string;
  handle: string;
  email_address: string;

  icon: string;
  banner: string;
  first_name: string;
  last_name: string;

  phone_number: string;
  location: string;
  biography: string;

  payment_methods: string[];
  delivery_methods: string[];

  is_verified: boolean;
}

interface PostInterface {
  id: number; 
  origin: CommunityInterface;
  author?: UserInterface;

  type: string;
  posted_at: Date;
  price?: number;

  title: string;
  description: string;
  condition?: string;
  tags?: string[];
  media?: string[];

  is_edited: boolean;
  edited_at?: Date;

  upvotes?: string[];
  downvotes?: string[];
  interests?: string[];
  bookmarks?: string[];
  comments?: number[];

  is_open?: boolean;
  range_start?: number;
  range_end?: number;
}

interface CommunityInterface {
  uuid: string;
  name: string;
  handle: string;
  description: string;
  
  icon: string;
  banner: string;
  
  posts?: number[];
  users?: number[];
}

interface CommentInterface {
  id: number;
  enclosing_post: number;
  enclosing_comment?: number;
  author: UserInterface;
  posted_at: Date;

  is_edited: boolean;
  edited_at?: Date;

  content: string;
  upvotes?: string[];
  downvotes?: string[];
  replies?: number[];

  is_deleted: boolean;
}

interface FilterInterface {
  username: string;

  sort: string;
  sort_order: string;

  condition: string;
  type: string;

  range_start: number;
  range_end: number;

  tags: string[];
  
  open: boolean;
  owner: boolean;
}

export class UserClass {
  id: number = 0;
  uuid: string = '';
  handle: string = '';

  email_address?: string = '';
  icon: string = '';
  banner: string = '';

  first_name: string = '';
  last_name: string = '';
  phone_number?: string = '';

  location: string = '';
  biography: string = '';
  
  payment_methods: string[] = [];
  delivery_methods: string[] = [];

  bookmarks?: number[] = [];
  cart?: number[] = [];

  is_verified: boolean = false;

  constructor(userObj?: Partial<UserClass>) {
    Object.assign(this, userObj);
  }
}

export class PostClass {
  id: number = 0;
  origin: CommunityClass = new CommunityClass();
  author: UserClass = new UserClass();

  type: string = '';
  posted_at: Date = new Date();
  price?: number = 0;

  title: string = '';
  description: string = '';
  condition?: string = '';
  tags?: string[] = [];
  media?: string[] = [];

  is_edited: boolean = false;
  edited_at?: Date;

  upvotes?: string[] = [];
  downvotes?: string[] = [];
  cart?: string[] = [];
  bookmarks?: string[] = [];
  comments?: number[] = [];

  is_open?: boolean = false;
  range_start?: number = 0;
  range_end?: number = 0;

  constructor(postObj?: Partial<PostClass>) {
    Object.assign(this, postObj);
  }
}

export class CommunityClass {
  uuid: string = '';
  name: string = '';
  handle: string = '';
  description: string = '';

  icon: string = '';
  banner: string = '';

  posts?: number[] = [];
  users?: number[] = [];

  constructor(communityObj?: Partial<CommunityClass>) {
    Object.assign(this, communityObj);
  }
}

export class CommentClass {
  id: number = 0;
  enclosing_post: number = 0;
  enclosing_comment?: number;
  author: UserClass = new UserClass();
  posted_at: Date = new Date();

  is_edited: boolean = false;
  edited_at?: Date;

  content: string = '';
  upvotes?: string[] = [];
  downvotes?: string[] = [];
  replies?: number[] = [];

  is_deleted: boolean = false;

  constructor(commentObj?: Partial<CommentClass>) {
    Object.assign(this, commentObj);
  }
}

export class FilterClass {
  username: string = '';
  sort: string = '';
  sort_order: string = '';
  condition: string = '';
  type: string = '';
  range_start: number = 0;
  range_end: number = 0;
  tags: string[] = [];
  open: boolean = false;
  owner: boolean = false;

  constructor(filterObj?: Partial<FilterClass>) {
    Object.assign(this, filterObj);
  }
}

export type {
  UserInterface, PostInterface, CommunityInterface, CommentInterface, FilterInterface
}