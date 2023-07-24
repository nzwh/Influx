interface Post {
    id: number; 
    origin: Community;
    author?: User;

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

interface Comment {
    id: number;
    enclosing_post: number;
    enclosing_comment: number;
    author: User;
    posted_at: Date;

    content: string;
    upvotes?: string[];
    downvotes?: string[];
    replies?: number[];
}

interface User {
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

interface Community {
    uuid: string;
    name: string;
    handle: string;
    description: string;
    
    icon: string;
    banner: string;
    
    posts?: number[];
    users?: number[];
}

interface Filter {
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

interface PM {
    apple_pay: boolean;
    cash_on_delivery: boolean;
    gcash: boolean;
    google_pay: boolean;
    mastercard: boolean;
    maya: boolean;
    other: boolean;
    paypal: boolean;
    visa: boolean;
}

interface DM {
    gogo_express: boolean;
    grab_express: boolean;
    jnt_express: boolean;
    lalamove: boolean;
    lbc_express: boolean;
    meetup: boolean;
    ninjavan: boolean;
    other: boolean;
    spx: boolean;
}

export type {
    Post, User, Community, Filter, PM, DM
}