interface Post {
    id: number; 
    origin: Community;
    author: User;

    type: string;
    posted_at: Date;
    price: number;

    title: string;
    description: string;
    condition: string;
    tags: string[];
    media: string[];

    edited: boolean;
    edited_at: Date;

    upvotes?: number[];
    downvotes?: number[];
    shares?: number[];
    interests?: number[];
    comments?: number[];

    open?: boolean;
    range?: Range;
}

interface User {
    id: number;
    handle: string;
    email_address: string;

    icon: string;
    first_name: string;
    last_name: string;

    phone_number: string;
    location: string;
    biography: string;

    payment_method: string[];
    delivery_method: string[];
    
    bookmarks: number[];
    shopping_cart: number[];
    posts: number[];
}

interface Community {
    id: number;
    name: string;
    handle: string;
    description: string;
    
    icon: string;
    banner: string;
    
    posts: number[];
    users: number[];
}

interface Range {
    start: Date;
    end: Date;
}

export type {
    Post, User, Community
}