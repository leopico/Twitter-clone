import getCurrentUser from "@/app/actions/getCurrentUser";
import { db } from "@/app/libs/prismadb";
import { NextResponse } from "next/server";


export async function PATCH(request: Request) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error()
    }

    const body = await request.json();

    const { name, username, bio, profileImage, coverImage } = body;

    const updatedUser = await db.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            name, username, bio, profileImage, coverImage
        }
    })

    return NextResponse.json(updatedUser)
}