/* eslint-disable react-hooks/exhaustive-deps */
"use client"

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
import React, { useEffect } from 'react'
import { useForm } from "react-hook-form"
import * as z from "zod"
import { checkEmail } from './actions'
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from 'next/navigation';
import { useToast } from "@/components/ui/use-toast"
import { api } from '@/trpc/react';


const formSchema = z.object({
    email: z.string().email({ message: "Geçerli bir e-posta adresi girin", }),
    password: z.string({ required_error: "Parolanızı en 8 karakter olarak giriniz!" }).min(8, { message: "En az 8 karakter olmalı", }).max(32, { message: "En fazla 32 karakter olmalı", }),
    username: z.string({ required_error: "Kullanici adiniz en 4 karakter olmali" }).min(4, { message: "En az 4 karakter olmalı", }).max(32, { message: "En fazla 32 karakter olmalı", }),

})


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
        const resp = await checkEmail(values.email)

        if (!resp?.success) {
            console.log(resp)

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
                async onSuccess(data, variables) {

                    const { email, password } = variables
                    const signinResult = await signIn('credentials', {
                        redirect: false,
                        email: email,
                        password: password,
                        callbackUrl: "/home/index"
                    })

                    if (signinResult?.ok) {

                        if (data?.id) return router.replace(`/home/index?reg=true`)
                    }

                },
                async onError(err) {
                    console.error(err.message)
                    toast({
                        variant: "destructive",
                        title: "Kayıt Hatası!",
                        description: err.message,
                    })

                    // await new Promise((resolve) => setTimeout(resolve, 2500));
                    // router.replace('/auth/signup')
                },

            })

        } catch (error) {
            console.error(error)
        }

        // router.push(`/auth/setup?type=email`);  // ? give a type to catch in setup, use in providers too

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
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-backgroundx px-2 text-muted-foreground">
                        Yada
                    </span>
                </div>
            </div>
            {/* <Button
                className='text-blue-600 border-blue-600 dark:border-blue-400 dark:text-blue-400' variant="outline" type="button" disabled={isLoading}>
                <Facebook className="mr-2 h-4 w-4" />
                {" "}
                Facebook
            </Button>
            <Button
                onClick={() => signIn('discord', { callbackUrl: '/auth/setup?type=discord' })}
                className='text-violet-600 border-violet-600' variant="outline" type="button" disabled={isLoading}>
                <Twitch className="mr-2 h-4 w-4" />
                {" "}
                Discord
            </Button> */}

        </div>
    )
}

export default SignupForm