"use client"

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { Facebook, Loader, Mail, User, KeySquare as Key } from "lucide-react"
import React from 'react'
import { useForm } from "react-hook-form"
import * as z from "zod"
import { checkEmailExist } from './actions'
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from 'next/navigation';
import { useToast } from "@/components/ui/use-toast"
import { api } from '@/trpc/react';


const formSchema = z.object({
    email: z.string().email({ message: "Geçerli bir e-posta adresi girin", }),
    password: z.string({ required_error: "Parolanızı en 8 karakter olarak giriniz!" }).min(8, { message: "En az 8 karakter olmalı", }).max(32, { message: "En fazla 32 karakter olmalı", }),
    username: z.string({ required_error: "Kullanici adiniz en 4 karakter olmali" }).min(4, { message: "En az 4 karakter olmalı", }).max(32, { message: "En fazla 32 karakter olmalı", }),

})

// https://dribbble.com/Hypergraph/collections/1831553-Login-Screens

const SignupForm = () => {


    const router = useRouter()
    const { toast } = useToast();
    const { mutate: createUser, isLoading } = api.auth.createUser.useMutation();


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            email: "",
            username: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {

        await new Promise((resolve) => setTimeout(resolve, 500)); // fake api delay
        const { isEmailExist } = await checkEmailExist(values.email)

        if (isEmailExist) {
            toast({
                variant: "destructive",
                title: "Kayıt Hatasi!",
                description: "Bu email zaten kayıtlı.",
            })
            return form.setError('email', { message: 'Email zaten kayıtlı' })
        }

        try {

            createUser({
                email: values.email,
                password: values.password,
                password2: values.password,
                username: values.username,

            }, {
                async onSuccess(_data, variables) {

                    // kullanici olusturuldu, giriş yap.
                    const { email, password } = variables
                    const signinResult = await signIn('credentials', {
                        redirect: false,
                        email: email,
                        password: password,
                    })

                    if (signinResult?.ok) return router.replace(`/dashboard?reg=true`)


                },
                async onError(err) {
                    console.error(err.message)
                    toast({
                        variant: "destructive",
                        title: "Kayıt Hatası!",
                        description: err.message,
                    })
                },

            })

        } catch (error) {
            console.error(error)
        }


    }

    return (
        <div className={cn("grid gap-6 ")}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} >
                    <div className="grid gap-6">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className='relative bg-redx-900'>
                                    <FormLabel htmlFor='email' className="sr-only">Email</FormLabel>
                                    <FormControl >
                                        <div className='relative'>
                                            <Mail className='absolute left-2 top-0 bottom-0 my-auto text-slate-400' />
                                            <Input
                                                className='pl-10'
                                                id="email"
                                                type="email"
                                                autoComplete="email"
                                                autoCorrect="off"
                                                disabled={isLoading}
                                                placeholder="name@example.com" {...field} />
                                        </div>
                                    </FormControl>
                                    <FormMessage className='text-red-600/80 absolute top-11 left-2' />

                                </FormItem>


                            )}
                        />
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem className='relative bg-redx-900'>
                                    <FormLabel htmlFor='username' className="sr-only">Kullanici Adi</FormLabel>
                                    <FormControl >
                                        <div className='relative'>
                                            <User className='absolute left-2 top-0 bottom-0 my-auto text-slate-400' />
                                            <Input
                                                className='pl-10'
                                                id="username"
                                                type="text"
                                                autoCorrect="off"
                                                disabled={isLoading}
                                                placeholder="Kullanici adi" {...field} />
                                        </div>
                                    </FormControl>
                                    <FormMessage className='text-red-600/80 absolute top-11 left-2' />
                                </FormItem>


                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className='relative bg-redx-900'>
                                    <FormLabel htmlFor='password' className="sr-only">Şifre</FormLabel>
                                    <FormControl >
                                        <div className='relative'>
                                            <Key className='absolute left-2 top-0 bottom-0 my-auto text-slate-400' />
                                            <Input
                                                className='pl-10'
                                                id="password"
                                                type="password"
                                                autoCorrect="off"
                                                disabled={isLoading}
                                                placeholder="Parola" {...field} />
                                        </div>
                                    </FormControl>
                                    <FormMessage className='text-red-600/80 absolute top-11 left-2 ' />
                                </FormItem>
                            )}
                        />

                        <Button className='text-blue-100 mt-3' disabled={isLoading} type='submit'>
                            {isLoading && (
                                <Loader className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            E-posta İle Kayıt Ol
                        </Button>
                    </div>
                </form>
            </Form>



        </div>
    )
}

export default SignupForm