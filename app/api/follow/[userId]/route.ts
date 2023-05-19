import getCurrentUser from "@/app/actions/getCurrentUser"
import { db } from "@/app/libs/prismadb";
import { NextResponse } from "next/server";


interface IParams {
    userId?: string
}

export async function POST(request: Request, {params}: {params: IParams}) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { userId } = params;

    if (!userId || typeof userId !== 'string') {
        throw new Error("Invalid ID");
    }

    let followingIds = [...(currentUser.followingIds || [])];

    followingIds.push(userId);

    const user = await db.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            followingIds: followingIds
        }
    })

    return NextResponse.json(user)
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { userId } = params;

    if (!userId || typeof userId !== 'string') {
        throw new Error("Invalid ID")
    }

    let followingIds = [...(currentUser.followingIds || [])];

    followingIds = followingIds.filter((id) => id !== userId);

    const user = await db.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            followingIds: followingIds
        }
    });

    return NextResponse.json(user);

}