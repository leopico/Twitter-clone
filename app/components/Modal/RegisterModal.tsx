'use client'

import { useCallback, useState } from "react";
import Input from "../Input";
import Modal from "./Modal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import axios from "axios";
import toast from "react-hot-toast"

const RegisterModal = () => {
    const loginModal = useLoginModal()
    const registerModal = useRegisterModal()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback(async () => {
        setIsLoading(true)
        axios.post('/api/register', {
            email, password, username, name
        }).then(() => {
            toast.success('Success!');
            registerModal.onClose();
            loginModal.onOpen();
        }).catch((error) => {
            toast.error("Something went wrong!")
        }).finally(() => {
            setIsLoading(false)
        })
    }, [registerModal, email, password, username, name, loginModal])

    const onToggle = useCallback(() => {
        if (isLoading) return;
        registerModal.onClose();
        loginModal.onOpen()
    }, [registerModal, loginModal, isLoading])

    const bodyContent = (
        <form className="flex flex-col gap-4">
            <Input autocomplete="username" type="text" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} disabled={isLoading} />
            <Input type="text" value={name} placeholder="Name" onChange={(e) => setName(e.target.value)} disabled={isLoading} />
            <Input autocomplete="username" type="text" value={username} placeholder="Username" onChange={(e) => setUsername(e.target.value)} disabled={isLoading} />
            <Input autocomplete="current-password" type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} disabled={isLoading} />
        </form>
    )

    const footerContent = (
        <div className="text-neutral-400 text-center mt-4">
            <p>Already have an account? &nbsp;
                <span onClick={onToggle} className="text-white cursor-pointer hover:underline">Sign in</span>
            </p>
        </div>
    )


    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Create an account"
            actionLabel="Register"
            onClose={registerModal.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default RegisterModal