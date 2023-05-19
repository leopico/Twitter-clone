'use client'

import Avatar from "@/app/components/Avatar"
import { User } from "@prisma/client"
import Image from "next/image"

interface UserHeroProps {
    user?: User | null
}


const UserHero: React.FC<UserHeroProps> = ({ user }) => {
    return (
        <div>
            <div className="bg-neutral-700 h-44 relative">
                {
                    user?.coverImage && (
                        <Image
                            src={user?.coverImage}
                            fill
                            alt="Cover Image"
                            style={{
                                objectFit: 'cover'
                            }}
                        />
                    )
                }
                <div className="absolute -bottom-16 left-4">
                    <Avatar userId={user?.id} isLarge hasBorder image={user?.profileImage} />
                </div>
            </div>
        </div>
    )
}

export default UserHero