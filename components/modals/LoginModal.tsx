'use client'
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { SubmitHandler, FieldValues, useForm } from "react-hook-form";
import axios from "axios";
import {Button, Heading, Input, Modal} from "..";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginModal = () => {
    const router = useRouter()
    const loginModal = useLoginModal()
    const registerModal = useRegisterModal()
    const [isLoading, setIsLoading] = useState(false)
    const {
        register, 
        handleSubmit, 
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit : SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
        signIn('credentials', {
            ...data,
            redirect: false
        })
        .then((callback) => {
            setIsLoading(false)
            if (callback?.ok) {
                toast.success('You are logged in!')
                router.refresh()
                loginModal.onClose()
            }

            if (callback?.error) {
                toast.error(callback.error)
            }
        })
    }
    
    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title="Welcome back!" subTitle="Login to your account" center />
            <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required />
            <Input id="password" type="password" label="Password" disabled={isLoading} register={register} errors={errors} required />
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button outline label="Continue with Google" icon={FcGoogle} onClick={() => {}} />
            <Button outline label="Continue with Github" icon={AiFillGithub} onClick={() => {}} />
            <div className="text-neutral-500 text-center mt-4 font-light">
                <div className="flex flex-row justify-center gap-2">
                    <div>
                        Don't have an account?
                    </div>
                    <div onClick={loginModal.onClose} className="text-neutral-800 cursor-pointer hover:underline">
                        Sign up
                    </div>
                </div>
            </div>
        </div>
    )

  return (
    <Modal
        disabled={isLoading}
        isOpen={loginModal.isOpen}
        title="Login"
        actionLabel="Continue"
        onClose={loginModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
     />
  )
}

export default LoginModal