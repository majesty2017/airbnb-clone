'use client'
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";

import { useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { SubmitHandler, FieldValues, useForm } from "react-hook-form";
import axios from "axios";
import {Button, Heading, Input, Modal} from "../";
import { toast } from "react-hot-toast";

const RegisterModal = () => {
    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()
    const [isLoading, setIsLoading] = useState(false)
    const {
        register, 
        handleSubmit, 
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    const onSubmit : SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
        axios.post('/api/register', data)
        .then(() => {
            registerModal.onClose()
        })
        .catch((err) => toast.error('Something went wrong!'))
        .finally(() => {
            setIsLoading(false)
        })
    }
    
    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title="Welcome to Airbnb" subTitle="Create an account" center />
            <Input id="name" label="Name" disabled={isLoading} register={register} errors={errors} required />
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
                        Already have an account?
                    </div>
                    <div onClick={registerModal.onClose} className="text-neutral-800 cursor-pointer hover:underline">
                        Log in
                    </div>
                </div>
            </div>
        </div>
    )

  return (
    <Modal
        disabled={isLoading}
        isOpen={registerModal.isOpen}
        title="Register"
        actionLabel="Continue"
        onClose={registerModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
     />
  )
}

export default RegisterModal