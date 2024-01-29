"use client"
/* eslint-disable @typescript-eslint/no-unused-vars */

import { signOut, useSession } from "next-auth/react";
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { HiPlus, HiEnvelope } from "react-icons/hi2";

import { api } from "@/trpc/react";

// import { useRouter, usePathname } from 'next/navigation'
// import { getServerSession, type NextAuthOptions, type DefaultSession } from "next-auth";

const Navbar = () => {




    const { data: session } = useSession();

    return (
        <header className="w-full h-16 px-16 bg-white flex justify-between items-center border-b-2">
            <div className="relative flex place-items-center ">

                <Link href='/' prefetch={false} className="font-bold text-lg text-slate-600">
                    {/* <Image
                        className="logo"
                        width={150}
                        height={35}
                        src={'/uk-logo.png'}
                        alt="logo"
                    /> */}
                    LOGO
                </Link>

            </div>

            <div className="ml-auto mr-8 space-x-4">



                {/* <Button
                    onClick={sendTestEmail}
                    size={'sm'}
                    className='mt-1'
                    variant={'destructive'}
                >
                    <HiEnvelope className="mr-2 h-3 w-3" />
                    Test Email
                </Button> */}



            </div>

            <div className="flex items-center gap-4 text-xs">

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
        </header>
    )
}

export default Navbar;