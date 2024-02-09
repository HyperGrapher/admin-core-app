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
import { Loader, Mail, User, KeySquare as Key } from "lucide-react"
import React from 'react'
import { useForm } from "react-hook-form"
import * as z from "zod"
import { checkEmailExist } from './actions'
import { signIn } from "next-auth/react";
import { useRouter } from '@/navigation';
import { useToast } from "@/components/ui/use-toast"


const formSchema = z.object({
    email: z.string().email({ message: "Geçerli bir e-posta adresi girin", }),
    password: z.string({ required_error: "Parolanızı en 8 karakter olarak giriniz!" }).min(8, { message: "En az 8 karakter olmalı", }).max(32, { message: "En fazla 32 karakter olmalı", }),
})

const LoginForm = () => {


    const router = useRouter()
    const { toast } = useToast();

    const [isLoading, setIsLoading] = React.useState<boolean>(false)


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            email: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {

        setIsLoading(true)

        await new Promise((resolve) => setTimeout(resolve, 500)); // fake api delay
        const { isEmailExist } = await checkEmailExist(values.email)

        if (!isEmailExist) {
            setIsLoading(false)

            toast({
                variant: "destructive",
                title: "Giriş Hatası!",
                description: "Bu email ile kayitli kullanici yok.",
            })
            return form.setError('email', { message: 'Hatalı email' })
        }

        try {

            const signinResult = await signIn('credentials', {
                redirect: false,
                email: values.email,
                password: values.password,
            })

            if (signinResult?.ok) {
                return router.replace(`/dashboard/overview`)
            }

            setIsLoading(false)

            // hatalı email yada password
            toast({
                variant: "destructive",
                title: "Giriş Hatası!",
                description: "Bilgilerinizi kontrol edip tekrar deneyin",
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
                            Giriş Yap
                        </Button>
                    </div>
                </form>
            </Form>
            

        </div>
    )
}

export default LoginForm