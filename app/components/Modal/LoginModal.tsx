'use client'

import useLoginModal from "@/app/hooks/useLoginModal"
import { useCallback, useState } from "react";
import Input from "../Input";
import Modal from "./Modal";
import useRegisterModal from '@/app/hooks/useRegisterModal';
import { signIn } from "next-auth/react"
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const LoginModal = () => {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const router = useRouter()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback(async () => {
        setIsLoading(true)

        signIn('credentials', {
            email, password,
            redirect: false,
        }).then((callback) => {
            setIsLoading(false);
            if (callback?.ok) {
                toast.success('Logged in');
                router.refresh();
                loginModal.onClose();
            }

            if (callback?.error) {
                toast.error(callback.error);
            }
        })
    }, [loginModal, email, password, router])

    const onToggle = useCallback(() => {
        if (isLoading) return;
        loginModal.onClose();
        registerModal.onOpen();
    }, [loginModal, registerModal, isLoading])

    const bodyContent = (
        <form className="flex flex-col gap-4">
            <Input autocomplete="username" type="text" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} disabled={isLoading} />
            <Input autocomplete="current-password" type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} disabled={isLoading} />
        </form>
    )

    const footerContent = (
        <div className="text-neutral-400 text-center mt-4">
            <p>First time usign Twitter? &nbsp;
                <span onClick={onToggle} className="text-white cursor-pointer hover:underline">Sign up</span>
            </p>
        </div>
    )


    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title="Login"
            actionLabel="Sign in"
            onClose={loginModal.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default LoginModal