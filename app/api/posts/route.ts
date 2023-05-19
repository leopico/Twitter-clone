import getCurrentUser from "@/app/actions/getCurrentUser";
import { db } from "@/app/libs/prismadb";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    const currentUser = await getCurrentUser();
    const req = await request.json();
    const {body} = req

    if (!currentUser) {
        return null
    }

    const posts = await db.post.create({
        data: {
            body,
            userId: currentUser.id
        }
    })

    return NextResponse.json(posts)
}

export async function GET(request: Request) {
    const body = await request.json();
    const { userId } = body;

    let posts;

    if (userId && typeof userId === "string") {
        posts = await db.post.findMany({
            where: {
                userId
            },
            include: {
                user: true,
                comments: true,
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
    } else {
        posts = await db.post.findMany({
            include: {
                user: true,
                comments: true,
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
    }

    return NextResponse.json(posts)
}