'use client'

import { BsHouseFill, BsBellFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi"
import SidebarLogo from "./SidebarLogo";
import SidebarItem from './SidebarItem';
import SidebarTweetButton from "./SidebarTweetButton";
import { User } from "@prisma/client";
import { signOut } from 'next-auth/react'


interface SideBarProps {
    currentUser?: User | null
}

const SideBar: React.FC<SideBarProps> = ({ currentUser }) => {
    const userId = currentUser?.id;

    const items = [
        {
            label: 'Home',
            href: "/",
            icon: BsHouseFill
        },
        {
            label: 'Notifications',
            href: "/notifications",
            icon: BsBellFill,
            auth: true
        },
        {
            label: 'Profils',
            href: `/users/${userId}`,
            icon: FaUser,
            auth: true
        }
    ]
    return (
        <div className="col-span-1 h-full pr-4 md:pr-6">
            <div className="flex flex-col items-end">
                <div className="space-y-2 lg:w-[230px]">
                    <SidebarLogo />
                    {
                        items.map(item => (
                            <SidebarItem
                                key={item.href}
                                href={item.href}
                                label={item.label}
                                icon={item.icon}
                                currentUser={currentUser}
                                auth={item.auth}
                            />
                        ))
                    }
                    {
                        currentUser && (
                            <SidebarItem onClick={() => signOut()} icon={BiLogOut} label='logout' />
                        )
                    }
                    <SidebarTweetButton />
                </div>
            </div>
        </div>
    )
}

export default SideBar