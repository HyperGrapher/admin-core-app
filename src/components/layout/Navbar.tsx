/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client"
/* eslint-disable @typescript-eslint/no-unused-vars */
import { signOut, useSession } from "next-auth/react";
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { HiPlus, HiEnvelope } from "react-icons/hi2";
import {
    getTranslations,
    getFormatter,
    getNow,
    getTimeZone,
    getMessages,
    getLocale,
} from 'next-intl/server';
import { useLocale, useMessages } from 'next-intl';
import { Link, usePathname, useRouter } from '@/navigation';
import { api } from "@/trpc/react";
import { useState, useEffect } from "react";
import FlagTr from '@/images/flag-tr.svg'
import FlagEn from '@/images/flag-en.svg'
// import { useRouter, usePathname } from 'next/navigation'
// import { getServerSession, type NextAuthOptions, type DefaultSession } from "next-auth";

const Navbar = () => {


    const locale = useLocale();
    const router = useRouter();
    const path = usePathname();

    const { data: session } = useSession();

    return (
        <header className="w-full h-16 px-16 bg-white flex justify-between items-center border-b-2">
            <div className="relative flex place-items-center ">

                <Link href='/' prefetch={false} className="font-bold text-lg text-slate-600">
                    LOGO ({locale})
                </Link>

            </div>

            <div className="ml-auto mr-8 space-x-4">

            </div>

            <div className="flex items-center gap-4 text-xs opacity-0 delayed-fade-in">

                <Image
                    className="logo rounded-xl border bottom-4 border-gray-300"
                    width={45}
                    height={45}
                    src={session?.user?.image ?? '/default-avatar.jpg'}
                    alt="logo"
                />

                <div className="flex flex-col items-start gap-2">
                    <b className='text-slate-500'>{session?.user?.username}</b>

                    <button
                        className='font-bold bg-red-900 text-white/80 px-2 py-1 rounded-md'
                        onClick={() => signOut()}>Sign Out</button>

                </div>
            </div>

            <Button
                onClick={() => {
                    router.replace(path, { locale: locale === "tr" ? "en" : "tr" })
                }}
                size={'sm'}
                className='mt-1 ml-8'
                variant={'ghost'}
            >


                <Image src={locale === "tr" ? FlagTr : FlagEn} height={48} width={32} alt="tr-flag" />


                {/* <HiEnvelope className="mr-2 h-3 w-3" /> */}
                {/* {locale} */}
            </Button>
        </header>
    )
}

export default Navbar;