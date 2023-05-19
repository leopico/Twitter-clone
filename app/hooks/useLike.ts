import { useRouter } from "next/navigation"
import useLoginModal from "./useLoginModal"
import { useCallback, useMemo } from "react"
import { toast } from "react-hot-toast"
import axios from "axios"

interface IUseLike {
    posts?: any
    currentUser?: any
    postId?: string
}

const useLike = ({ posts, currentUser, postId }: IUseLike) => {
    const router = useRouter();
    const loginModal = useLoginModal();
    
    const hasLiked = useMemo(() => { 
        const list = posts?.likedIds || null
        return list?.includes(currentUser?.id)
    }, [posts?.likedIds, currentUser?.id]);

    const toggleLike = useCallback(async() => {
        if (!currentUser) {
            return loginModal.onOpen()
        }

        try {
            let request;

            if (hasLiked) {
                request = () => axios.delete(`/api/like/${postId}`)
            } else {
                request = () => axios.post(`/api/like/${postId}`)
            }

            await request();
            router.refresh();
            toast.success('Success')
        } catch (error) {
            toast.error('Something went wrong!')
        }

    },[currentUser, hasLiked, loginModal, postId,router])

    return {
        hasLiked, toggleLike
    }

}

export default useLike