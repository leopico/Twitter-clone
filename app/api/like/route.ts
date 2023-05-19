import getCurrentUser from "@/app/actions/getCurrentUser";
import { db } from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

interface IParams {
    postId?: string
} 


export async function POST(request: Request,{params}: {params: IParams}) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error()
    }

    const { postId } = params;

    if (!postId || typeof postId !== 'string') {
        throw new Error('Invalid ID')
    }

    const post = await db.post.findUnique({
        where: {
            id: postId
        }
    })

    if (!post) {
        throw new Error("Invalid ID")
    }

    let updatedLikedIds = [...(post.likedIds || [])];

    updatedLikedIds.push(currentUser.id)

    const updatedPosts = await db.post.update({
        where: {
            id: postId
        },
        data: {
            likedIds: updatedLikedIds
        }
    })

    return NextResponse.json(updatedPosts)
}


export async function DELETE(request: Request, { params }: { params: IParams }) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error()
    }

    const { postId } = params;

    if (!postId || typeof postId !== 'string') {
        throw new Error('Invalid ID')
    }

    const post = await db.post.findUnique({
        where: {
            id: postId
        }
    })

    if (!post) {
        throw new Error('Invalid ID')
    }

    let updatedLikedIds = [...(post.likedIds || [])];

    updatedLikedIds.filter((id) => id !== currentUser.id)

    const updatedPosts = await db.post.update({
        where: {
            id: postId
        },
        data: {
            likedIds: updatedLikedIds
        }
    })

    return NextResponse.json(updatedPosts)
}