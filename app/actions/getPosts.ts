import { db } from "../libs/prismadb";

export default async function getPosts() {
    try {
        let posts = await db.post.findMany({
            include: {
                user: true,
                comments: true,
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return posts;
    } catch (error: any) {
        throw new Error(error)
    }
}