interface PostInterface {
    shop_icon: string;
    shop_name: string;
    shop_handle: string;

    user_icon: string;
    user_name: string;
    user_handle: string;

    timestamp: string;

    price: number;
    negotiable: boolean;

    header: string;
    description: string;
    condition: string;

    tags: string[];
    images: string[];

    upvotes: number;
    downvotes: number;
    shares: number;
    interested: number;
    comments: number;
}

export type {
    PostInterface
}