import { User } from "@prisma/client"
import { useRouter } from "next/navigation"
import useLoginModal from "./useLoginModal"
import { useCallback, useMemo } from "react"
import { toast } from "react-hot-toast"
import axios from "axios"


interface IUseFollow {
    userId: string
    currentUser?: User | null
}


const useFollow = ({userId, currentUser}: IUseFollow) => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const hasFollowed = useMemo(() => {
        const list = currentUser?.followingIds || [];
        return list.includes(userId)
    }, [currentUser?.followingIds, userId])
    
    const toggleFollow = useCallback(async () => {

        if (!currentUser) {
            return loginModal.onOpen();
        }

        try {
            let request; 

            if (!hasFollowed) {
                request = () => axios.post(`/api/follow/${userId}`)
                
            } else {
                request = () => axios.delete(`/api/follow/${userId}`);
            }

            await request();
            router.refresh();
            toast.success('Success!');

        } catch (error) {
            toast.error('Something went wrong!')
        }

    }, [currentUser, hasFollowed, loginModal, userId, router]);

    return {
        hasFollowed, toggleFollow
    }

}

export default useFollow