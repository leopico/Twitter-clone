import { User } from "@prisma/client"
import FollowBar from "./FollowBar"
import SideBar from "./SideBar"

interface LayoutProps {
    children: React.ReactNode
    currentUser?: User | null
    users?: User[] | null
}

const Layout: React.FC<LayoutProps> = ({ children, currentUser, users }) => {

    return (
        <div className="h-screen bg-black">
            <div className="container h-full mx-auto xl:px-30 max-w-6xl">
                <div className="grid grid-cols-4 h-full">
                    <SideBar currentUser={currentUser} />
                    <div className="col-span-3 lg:col-span-2 border-x-[1px] border-neutral-800">
                        {children}
                    </div>
                    <FollowBar users={users} />
                </div>
            </div>
        </div>
    )
}

export default Layout