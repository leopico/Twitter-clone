'use client'

import { Post, User } from "@prisma/client"
import PostItem from "./PostItem"


interface PostFeedProps {
    posts?: Post[]
    currentUser?: User | null
}

const PostFeed: React.FC<PostFeedProps> = ({ posts, currentUser }) => {
    return (
        <>
            {
                posts?.map(post => (
                    <PostItem
                        key={post.id}
                        posts={post}
                        currentUser={currentUser}
                    />
                ))
            }
        </>
    )
}

export default PostFeed