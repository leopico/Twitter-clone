import getUserById from "@/app/actions/getUserById"
import Header from "@/app/components/Header"
import { ClipLoader } from "react-spinners";
import UserHero from "../../components/UserHero";
import UserBio from "@/app/components/UserBio";
import getCurrentUser from "@/app/actions/getCurrentUser";
import PostFeed from "@/app/components/posts/PostFeed";
import getPostsById from "@/app/actions/getPostsById";

interface IParams {
    userId?: string
}


const UserPage = async ({ params }: { params: IParams }) => {
    const user = await getUserById(params);
    const currentUser = await getCurrentUser()

    const posts = await getPostsById(params)

    if (!user) {
        return (
            <div className="flex justify-center items-center h-full">
                <ClipLoader color="lightblue" size={80} />
            </div>
        )
    }


    return (
        <>
            <Header showBackArrow label={user.name} />
            <UserHero user={user} />
            <UserBio user={user} currentUser={currentUser} />
            <PostFeed posts={posts} currentUser={currentUser} />
        </>
    )
}

export default UserPage