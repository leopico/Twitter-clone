import { db } from "../libs/prismadb";


interface IParams {
    userId?: string
}

export default async function getPostsById(params: IParams) {
    try {
        const { userId } = params;

        let posts;
        
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

        return posts;
    } catch (error: any) {
        throw new Error(error)
    }
}