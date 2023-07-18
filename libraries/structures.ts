interface Post {
    id: number; 
    origin: Community;
    author: User;

    type: string;
    posted_at: Date;
    price?: number;

    title: string;
    description: string;
    condition?: string;
    tags?: string[];
    media?: string[];

    is_edited: boolean;
    edited_at: Date;

    upvotes?: string[];
    downvotes?: string[];
    shares?: number;
    interests?: string[];
    bookmarks?: string[];
    comments?: number[];

    is_open?: boolean;
    range?: Range;
}

interface User {
    id: string;
    handle: string;
    email_address: string;

    icon: string;
    first_name: string;
    last_name: string;

    phone_number: string;
    location: string;
    biography: string;

    payment_methods: string[];
    delivery_methods: string[];

    is_verified: boolean;
}

interface Community {
    id: string;
    name: string;
    handle: string;
    description: string;
    
    icon: string;
    banner: string;
    
    posts: number[];
    users: number[];
}

interface Range {
    start: number;
    end: number;
}

export type {
    Post, User, Community
}