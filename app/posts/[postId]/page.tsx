import getCurrentUser from "@/app/actions/getCurrentUser";
import Form from "@/app/components/Form";
import Header from "@/app/components/Header";
import PostItem from "@/app/components/posts/PostItem";
import { ClipLoader } from "react-spinners";


interface IParams {
    postId?: string
}


const Postpage = async ({ params }: { params: IParams }) => {
    const postId: any = params
    const currentUser = await getCurrentUser()

    return (
        <>
            <Header label="Tweet" showBackArrow />
            <Form postId={postId} isComment placeholder="Tweet your reply" currentUser={currentUser} />
        </>
    )
}

export default Postpage