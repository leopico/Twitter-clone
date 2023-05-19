'use client'

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useCallback } from "react"

interface AvatarProps {
    userId: any
    image?: string | null | undefined
    isLarge?: boolean
    hasBorder?: boolean
}

const Avatar: React.FC<AvatarProps> = ({ userId, image, isLarge, hasBorder }) => {
    const router = useRouter();

    const onClick = useCallback((e: any) => {
        e.stopPropagation();
        const url = `users/${userId}`;
        router.push(url)
    }, [router, userId])


    return (
        <div className={`
            ${isLarge ? 'h-32' : 'h-12'}
            ${isLarge ? 'w-32' : 'w-12'}
            ${hasBorder ? 'border-4' : 'border-black'}
            rounded-full hover:opacity-90 transition cursor-pointer relative
        `}>
            <Image
                fill
                style={{
                    objectFit: 'cover',
                    borderRadius: '100%'
                }}
                priority={true}
                alt="Avatar"
                onClick={onClick}
                src={image || '/images/placeholder.jpg'}
            />
        </div>
    )
}

export default Avatar