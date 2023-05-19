'use client'

import useLoginModal from "@/app/hooks/useLoginModal";
import { User } from "@prisma/client";
import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/navigation"
import { useCallback, useMemo } from "react";
import Avatar from "../Avatar";
import { AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import useLike from "@/app/hooks/useLike";
import { toast } from "react-hot-toast";

interface PostItemProps {
    posts: Record<string, any>
    currentUser?: User | null
}

const PostItem: React.FC<PostItemProps> = ({ posts, currentUser }) => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const goToUser = useCallback((e: any) => {
        e.stopPropagation();
        router.push(`/users/${posts.user.id}`)
    }, [router, posts.user.id]);

    const goToPost = useCallback((e: any) => {
        router.push(`/posts/${posts.id}`)
    }, [router, posts.id]);

    const onLike = useCallback((e: any) => {
        e.stopPropagation();
        if (!currentUser) {
            return loginModal.onOpen()
        }
        toast.success('Coming soon!')
    }, [currentUser, loginModal]);

    const createdAt = useMemo(() => {
        if (!posts?.createdAt) {
            return null
        }

        return formatDistanceToNowStrict(new Date(posts.createdAt)) //counting time that start from action
    }, [posts?.createdAt])

    return (
        <div onClick={goToPost}
            className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition"
        >
            <div className="flex flex-row items-start gap-3">
                <Avatar userId={posts.user.id} image={posts.user.profileImage} />
                <div>
                    <div className="flex flex-row items-center gap-2">
                        <p onClick={goToUser} className="text-white font-semibold cursor-pointer hover:underline">
                            {posts.user.name}
                        </p>
                        <span onClick={goToUser} className="text-neutral-500 cursor-pointer hover:underline hidden md:block">
                            @{posts.user.username}
                        </span>
                        <span className="text-neutral-500 text-sm">
                            {createdAt}
                        </span>
                    </div>
                    <div className="text-white mt-1">
                        {posts.body}
                    </div>
                    <div className="flex flex-row items-center mt-3 gap-10">
                        <div onClick={onLike} className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500">
                            <AiOutlineMessage size={20} />
                            <p>
                                {posts.comments?.length || 0}
                            </p>
                        </div>
                        <div onClick={onLike} className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500">
                            <AiOutlineHeart size={20} />
                            <p>
                                {posts.comments?.length || 0}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostItem