import { db } from "../libs/prismadb";



export default async function getUsers() {
    try {
        const users = await db.user.findMany({
        orderBy: {
            createdAt: 'desc'
            }
        })
    return users
    } catch (error: any) {
        throw new Error(error)
    }
}