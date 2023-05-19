import { db } from "../libs/prismadb";

interface IParams {
  userId?: string;
}

export default async function getUserById(params: IParams) {
  try {
    const { userId } = params; 

    const existingUser = await db.user.findUnique({
      where: {
        id: userId, 
      },
    });

    

    if (!existingUser) {
      return null;
    }

    return { ...existingUser };
  } catch (error: any) {
    throw new Error(error);
  }
}
